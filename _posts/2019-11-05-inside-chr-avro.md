---
layout: article
title: "Inside Chr.Avro: Using Expression Trees to Generate Efficient Serializers"
authors:
  - steldan
categories: technology
excerpt: This September, we released Chr.Avro, an implementation of the Apache Avro serialization format for .NET. In this post, we're going to take a closer look at some of the engineering challenges that motivated its development and walk through some of our solutions.
tags: [Open Source]
disclaimer: true
series: dotnet-avro
---

This September, [we released Chr.Avro]({% post_url 2019-09-11-open-sourcing-chr-avro %}), an implementation of the [Apache Avro serialization format](https://avro.apache.org) for [.NET](https://dotnet.microsoft.com). In this post, we're going to take a closer look at some of the engineering challenges that motivated its development and walk through some of our solutions.

## Mapping Schemas to Types

Our fundamental motivation for Chr.Avro was to make it easy to work with Avro in .NET applications. We initially evaluated the [official Apache implementation](https://github.com/apache/avro/tree/master/lang/csharp) but found that it didn't support some features that we considered necessary. Namely, we wanted to be able to translate Avro-encoded values to plain .NET domain objects, creating serializers that "just worked" given a schema and a type.

Consider this [Avro schema](https://avro.apache.org/docs/current/spec.html):

```json
{
    "type": "record",
    "name": "chr.appliedresearch.Node",
    "fields": [{
        "type": ["null", "string"],
        "name": "label"
    }, {
        "type": {
            "type": "array",
            "items": "Node"
        },
        "name": "children"
    }]
}
```

The schema defines a `Node` record with two fields. The first field, `label`, is an optional text field. The second field, `children`, is an array of `Node`s. In C#, a matching class might look like this:

```csharp
using System.Collections.Generic;

public class Node
{
    public string Label { get; set; }

    public ICollection<Node> Children { get; set; }
}
```

The Apache library offers two ways to map between `Node` record values and `Node` class instances. The first option is `GenericRecord`, a class that enables access to untyped (`object`) record field values by name. This approach requires writing code to map `GenericRecord`s to domain objects:

```csharp
using Avro;
using Avro.Generic;
using System.Linq;

public static class NodeExtensions
{
    public static Node FromAvro(this GenericRecord record)
    {
        return new Node
        {
            Label = (string)record["label"],
            Children = ((GenericRecord[])record["children"])
                .Select(child => child.FromAvro())
                .ToList()
        };
    }

    public static GenericRecord ToAvro(this Node node, Schema schema)
    {
        var record = new GenericRecord(schema);
        record.Add("label", node.Label);
        record.Add("children", node.Children
            .Select(child => child.ToAvro(schema)))
            .ToArray());

        return record;
    }
}
```

We found `GenericRecord` to be unsuitable for a couple of reasons. First, the complexity of the mapping code increases with the complexity of the schema. For any large or complicated schema, writing mapping code is massively time-consuming and error-prone. Second, the use of the `GenericRecord` class reduces the level of compile-time safety—as shown above, mapping to a domain object entails a significant amount of runtime casting.

The Apache library also supports generating classes from a schema using a command-line tool:

```shell
$ avrogen -s node.avsc .
$ tree
.
├── chr
│   └── appliedresearch
│       └── Node.cs
└── node.avsc
```

A generated class looks like this (lightly edited for brevity):

```csharp
namespace chr.appliedresearch
{
    using System.Collections.Generic;
    using global::Avro;
    using global::Avro.Specific;
    
    public partial class Node : ISpecificRecord
    {
        private string _label;
        private IList<chr.appliedresearch.Node> _children;

        public string label
        {
            get { return this._label; }
            set { this._label = value; }
        }

        public IList<chr.appliedresearch.Node> children
        {
            get { return this._children; }
            set { this._children = value; }
        }

        public virtual object Get(int fieldPos)
        {
            switch (fieldPos)
            {
            case 0: return this.label;
            case 1: return this.children;
            default: throw new AvroRuntimeException("Bad index " + fieldPos + " in Get()");
            };
        }

        public virtual void Put(int fieldPos, object fieldValue)
        {
            switch (fieldPos)
            {
            case 0: this.label = (System.String)fieldValue; break;
            case 1: this.children = (IList<chr.appliedresearch.Node>)fieldValue; break;
            default: throw new AvroRuntimeException("Bad index " + fieldPos + " in Put()");
            };
        }
    }
}
```

In terms of type safety, generated classes are an improvement. We still found some aspects disqualifying, though. If we were to replace our shared domain classes with these generated `ISpecificRecord` classes, our shared libraries would include Avro-specific code and dependencies. On the other hand, if we kept our plain .NET classes, any application that needed to work with Avro would still need to generate and map from `ISpecificRecord` objects to domain objects.

## Better Mapping with Reflection

Neither of the Apache library options met the "just works" standard, so we started to investigate whether it would be possible to develop something that did. We figured that .NET's [reflection capabilities](https://docs.microsoft.com/en-us/dotnet/framework/reflection-and-codedom/reflection) could easily support the intuitive mapping functionality we were looking for.

To illustrate, here's a small Avro serializer implementation that uses type reflection to serialize Avro records from .NET classes:

```csharp
using Chr.Avro.Abstract;
using System;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;

void Serialize(Schema schema, object value, BinaryWriter writer)
{
    if (schema is StringSchema && value is string @string)
    {
        var bytes = Encoding.UTF8.GetBytes(@string);

        // write length followed by contents (pretend EncodeInteger is a thing):
        writer.Write(EncodeInteger(bytes.Length));
        writer.Write(bytes);
    }

    else if (schema is RecordSchema record)
    {
        // reflect on the type to get fields/properties:
        var members = value.GetType().GetMembers();

        foreach (var field in record.Fields)
        {
            // find a field/property that matches the record field name:
            var member = members.Single(m => m.Name == field.Name);

            // get the field/property value (more reflection types, y'all):
            var child = member switch
            {
                FieldInfo f => f.GetValue(value),
                PropertyInfo p => p.GetValue(value),
                _ => throw new NotImplementedException()
            };
            
            // write the field:
            Serialize(field.Type, child, writer);
        }
    }

    // other cases could go here

    else
    {
        throw new NotImplementedException("no cases matched :(");
    }
}
```

In this example, the serialization function uses reflection to derive information about the type being serialized. Unfortunately, reflection is expensive. [Benchmarks](https://mattwarren.org/2016/12/14/Why-is-Reflection-slow/) indicate that enumerating type members and getting their values by reflection (as shown above, naïvely) is much slower than getting values directly. If we did all of this work each time an object was serialized, it would severely limit serialization throughput.

## Generating Fast Serializers

Faced with the realities of reflection performance, we wondered whether it would be possible to create a solution that only did the reflection work one time. Further, we wanted to be able to generate serialization functions that tightly matched the type being serialized. Ideally, we would want a generated serialization function for the `Node` class to be roughly the same as this manually written function:

```csharp
using System.IO;
using System.Text;

void SerializeNode(Node value, BinaryWriter writer)
{
    if (value.Label == null)
    {
        // "null" has union index 0:
        writer.Write(EncodeInteger(0));
    }
    else
    {
        // "string" has union index 1:
        writer.Write(EncodeInteger(1));

        var bytes = Encoding.UTF8.GetBytes(value.Label);

        writer.Write(EncodeInteger(bytes.Length));
        writer.Write(bytes);
    }

    writer.Write(EncodeInteger(value.Children.Length));

    foreach (var child in value.Children)
    {
        SerializeNode(child, writer);
    }
}
```

We found exactly what we were looking for in .NET's [expression trees](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/expression-trees). Even though they sound obscure, most .NET developers have interacted with them. For instance, anyone who's used [Entity Framework](https://docs.microsoft.com/en-us/ef/core/) (or any related LINQ to SQL library) has probably written a query something like this:

```csharp
var adults = await context.People
    .Where(person => person.Age >= 18)
    .ToListAsync();
```

The age predicate looks like an [anonymous function](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/statements-expressions-operators/lambda-expressions), but the C# compiler emits code for a [`LambdaExpression`](https://docs.microsoft.com/en-us/dotnet/api/system.linq.expressions.lambdaexpression) tree that Entity Framework can translate into SQL. Similarly, tools like [Moq](https://github.com/Moq) rely on expression trees to provide mocking APIs:

```csharp
mock
    .Setup(number => number.IsOdd(It.Is<int>(i => i % 2 == 1)))
    .Returns(true);
```

You can experiment with this yourself by assigning a lambda expression to an [`Expression<TDelegate>`](https://docs.microsoft.com/en-us/dotnet/api/system.linq.expressions.expression-1) variable and playing around with the resulting expression tree:

```csharp
using System.Linq.Expressions;

Expression<Func<int, int>> cube = i => i * i * i;

Console.WriteLine(cube.ReturnType);
// System.Int32

Console.WriteLine(cube.Body);
// ((i * i) * i)

Console.WriteLine(cube.Body.NodeType);
// Multiply
```

It's possible to go the other way, too—an expression tree can be compiled into a delegate that behaves like an anonymous function. Armed with that, we can generate Avro serialization functions that are extremely efficient:

```csharp
using Chr.Avro.Abstract;
using System;
using System.IO;
using System.Linq.Expressions;

void Action<T, BinaryWriter> CreateRecordSerializer<T>(RecordSchema schema)
{
    var members = typeof(T).GetMembers();

    var value = Expression.Parameter(typeof(T));
    var writer = Expression.Parameter(typeof(BinaryWriter));

    return Expression.Lambda<Action<T, BinaryWriter>>(
        // the body will be the field serializers in order:
        Expression.Block(schema.Fields.Select(field =>
        {
            var member = members.Single(m => m.Name == field.Name);

            return Expression.Invoke(
                // assume CreateSerializer exists to generate field serializers:
                Expression.Constant(CreateSerializer(field.Type, member.MemberType)),
                Expression.PropertyOrField(value, member.Name),
                writer
            );
        })),
        $"generated {schema.Name} record serializer",
        new[] { value, writer }
    ).Compile();
}
```

We aren't the first to come up with a solution like this. [Microsoft's deprecated Avro library](https://azure.microsoft.com/en-us/blog/microsoft-avro-library/) was also built with expression trees, which increased our confidence that Chr.Avro was viable. [Our benchmarks](https://engineering.chrobinson.com/dotnet-avro/internals/benchmarks) show that Chr.Avro's record serialization is on par with both options from the Apache Avro library (and deserialization is significantly faster).

## Future Plans

As we built Chr.Avro, we were primarily concerned with ease of use and correctness. As a result, there are still plenty of low-hanging performance improvements. We also plan to add additional benchmarks. In particular, we want to test more complex scenarios and see how .NET libraries compare to the official Java serializer.

If this kind of thing interests you, check out [the GitHub repo](https://github.com/ch-robinson/dotnet-avro)! We've already received some fantastic contributions, and we're excited to see it continue to improve.
