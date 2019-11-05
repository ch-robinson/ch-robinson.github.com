---
layout: article
title: Open Sourcing C.H. Robinson's Avro Library
authors:
  - steldan
categories: technology
excerpt: At C.H. Robinson, we love open source, and we're continuing to give back by releasing a foundational component of our event-driven messaging platform.
tags: [Open Source]
disclaimer: true
series: dotnet-avro
---

At C.H. Robinson, we love open source, and we're continuing to give back by releasing a foundational component of our event-driven messaging platform, [Chr.Avro](https://github.com/ch-robinson/dotnet-avro)! We use this library throughout the organization to transmit data between applications.

## Why Avro?

When applications exchange data, they need to agree on a serialization format—the sending application has to write the data so that it can be read by receiving applications. For example, here's a message serialized using the [JSON](https://www.json.org/) format:

<figure>
  <img src="{{site.url}}{{site.baseurl}}/images/posts/2019/bourne-json.png"
   alt="{&#13;&nbsp;&nbsp;&quot;name&quot;:&nbsp;&quot;David Webb&quot;,&#13;&nbsp;&nbsp;&quot;birthdate&quot;:&nbsp;&quot;1970-09-13&quot;,&#13;&nbsp;&nbsp;&quot;operation&quot;:&nbsp;&quot;TREADSTONE&quot;&#13;}"
   aria-label="A JSON-encoded object containing a name field (&quot;David Webb&quot;), a birthdate field (&quot;1970-09-13&quot;), and an operation field (&quot;TREADSTONE&quot;)" />
</figure>

Text-based serialization formats like JSON are popular because they're fairly human-readable. Most English-speaking people would be able to understand that message even though it's written in a format designed for machines.

However, text-based formats aren't always ideal. One major downside is that they include a lot of structural information. This is what the JSON data looks like represented in bytes:

<figure>
  <img src="{{site.url}}{{site.baseurl}}/images/posts/2019/bourne-json-binary.png"
   alt="7b&#13;&nbsp;&nbsp;22&nbsp;6e&nbsp;61&nbsp;6d&nbsp;65&nbsp;22&nbsp;3a&nbsp;22&nbsp;44&nbsp;61&nbsp;76&nbsp;69&nbsp;64&nbsp;20&nbsp;57&nbsp;65&nbsp;62&nbsp;62&nbsp;22&nbsp;2c&#13;&nbsp;&nbsp;22&nbsp;62&nbsp;69&nbsp;72&nbsp;74&nbsp;68&nbsp;64&nbsp;61&nbsp;74&nbsp;65&nbsp;22&nbsp;3a&nbsp;22&nbsp;31&nbsp;39&nbsp;37&nbsp;30&nbsp;2d&nbsp;30&nbsp;39&nbsp;2d&nbsp;31&nbsp;33&nbsp;22&nbsp;2c&#13;&nbsp;&nbsp;22&nbsp;6f&nbsp;70&nbsp;65&nbsp;72&nbsp;61&nbsp;74&nbsp;69&nbsp;6f&nbsp;6e&nbsp;22&nbsp;3a&nbsp;22&nbsp;54&nbsp;52&nbsp;45&nbsp;41&nbsp;44&nbsp;53&nbsp;54&nbsp;4f&nbsp;4e&nbsp;45&nbsp;22&#13;7d"
   aria-label="A binary representation of the JSON object" />
</figure>

The critical information (shaded blue) contributes less than half of the total data, about 41%. What if there was a way to eliminate the rest of it?

Avro's answer to that question is the schema, a document that describes the shape of a message. An Avro schema for the message above might look something like this:

<figure>
  <img src="{{site.url}}{{site.baseurl}}/images/posts/2019/bourne-schema.png"
   alt="{&#13;&nbsp;&nbsp;&quot;name&quot;:&nbsp;&quot;cia.sad.Operative&quot;,&#13;&nbsp;&nbsp;&quot;type&quot;:&nbsp;&quot;record&quot;,&#13;&nbsp;&nbsp;&quot;fields&quot;:&nbsp;[&#13;&nbsp;&nbsp;&nbsp;&nbsp;{&#13;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&nbsp;&quot;name&quot;,&#13;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;type&quot;:&nbsp;&quot;string&quot;&#13;&nbsp;&nbsp;&nbsp;&nbsp;},&#13;&nbsp;&nbsp;&nbsp;&nbsp;{&#13;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&nbsp;&quot;birthdate&quot;,&#13;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;type&quot;:&nbsp;{&#13;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;type&quot;:&nbsp;&quot;int&quot;,&#13;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;logicalType&quot;:&nbsp;&quot;date&quot;&#13;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&#13;&nbsp;&nbsp;&nbsp;&nbsp;},&#13;&nbsp;&nbsp;&nbsp;&nbsp;{&#13;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&nbsp;&quot;operation&quot;,&#13;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;type&quot;:&nbsp;{&#13;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;name&quot;:&nbsp;&quot;cia.sad.Operation&quot;,&#13;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;type&quot;:&nbsp;&quot;enum&quot;,&#13;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;symbols&quot;:&nbsp;[&quot;SILVERLAKE&quot;,&nbsp;&quot;TREADSTONE&quot;,&nbsp;&quot;BLACKBRIAR&quot;]&#13;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&#13;&nbsp;&nbsp;&nbsp;&nbsp;}&#13;&nbsp;&nbsp;]&#13;}&#13;"
   aria-label="An Avro schema named &quot;cia.sad.Operative&quot; that matches the structure of the JSON object" />
</figure>

If the sending and receiving applications all know the schema in advance, the same data can be transmitted in a significantly smaller form:

<figure>
  <img src="{{site.url}}{{site.baseurl}}/images/posts/2019/bourne-avro-binary.png"
   alt="14&nbsp;44&nbsp;61&nbsp;76&nbsp;69&nbsp;64&nbsp;20&nbsp;57&nbsp;65&nbsp;62&nbsp;62&#13;fe&nbsp;03&#13;02"
   aria-label="A binary Avro encoding of the data contained in the JSON object" />
</figure>

This Avro message is about 81% smaller than the JSON message. At Robinson's scale, that level of reduction in size can save gigabytes of storage and network traffic every day. More importantly, Avro helps us ensure that every message flowing through our systems is encoded correctly.

Avro isn't the only binary serialization format out there. Other formats, like [Protocol Buffers](https://developers.google.com/protocol-buffers/) and [Thrift](https://thrift.apache.org/), also rely on schemas to enforce message shape and reduce size. We chose Avro for a few reasons:

* Tools in the [Kafka](https://kafka.apache.org/) ecosystem tend to have first-class support for Avro, in no small part because it's closely tied to [Hadoop](https://hadoop.apache.org/) and endorsed by providers like Confluent.

* As Confluent notes in [their blog post on the subject](https://www.confluent.io/blog/avro-kafka-data/), Avro makes it easier to evolve schemas over time. Guaranteeing that new versions of a schema will continue to be compatible with old versions keeps us responsive to changing business needs without sacrificing safety.

* Avro doesn't demand code generation. Code generation tools are available for most popular programming languages, but using them isn't a hard requirement.

## Building Chr.Avro

As we started to experiment with Avro, we were unable to find any practical ways to map Avro schemas to our .NET data models. The [Apache Avro library for .NET](https://github.com/apache/avro/tree/master/lang/csharp) only supported mapping Avro records to generated classes or an untyped generic class, and an Avro library [released by Microsoft in 2014](https://azure.microsoft.com/en-us/blog/microsoft-avro-library/) had since been deprecated.

We chose to develop our own Avro library, and now we're ready to open it up to the community at large. In addition to its core serialization and mapping functionality, Chr.Avro includes some features that make it easier to work with Avro:

* An Avro **schema builder**: Chr.Avro inspects .NET types and generates compatible Avro schemas, a time-saver for teams that already have complex .NET models.

* Rudimentary **code generation**: Given record and enum schemas, Chr.Avro can generate matching C# types.

* **[Confluent Kafka client](https://github.com/confluentinc/confluent-kafka-dotnet) integration**: Chr.Avro integrates with Confluent's client libraries, reducing the amount of effort required to build Avro-enabled consumers and producers.

## Next Steps

C.H. Robinson has already benefited from this project, but we're not done yet. We have more features in the pipeline that will continue to make it easier to use Avro in .NET applications. Check out the project [on GitHub](https://github.com/ch-robinson/dotnet-avro) or learn more [on its website](https://engineering.chrobinson.com/dotnet-avro/).

We're hopeful that developing Chr.Avro as an open source project will enable us to refine it at a higher velocity, and we're extremely excited to share it with the community!
