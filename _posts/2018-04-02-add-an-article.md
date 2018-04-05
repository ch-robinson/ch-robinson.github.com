---
layout: article
title: "Jekyll Sample Post"
author: brianmitchell
modified: 2018-04-05
categories: howto
excerpt: "Here are some examples of markdown (via the kramdown converter) formatting for posts on a site build with Jekyll."
tags: [fun, webdev, emojis, jekyll]
image:
  feature:
  teaser: chr-logomark.svg
  thumb:
disclaimer: true
---

Here are some examples of markdown (via the kramdown converter) formatting for posts on a site build with Jekyll.

{% include toc.html %}
If you have a long post, you can include a table of contents that will link to every heading in the article.

## Markdown

Here are some easy examples of formatting you can do with markdown (and the kramdown converter).

### Basic Examples

- Here
- is
- a
  - list!

You can format text too! Here is some ~~strikethrough~~, _emphasis_, **bold** text, `code`,
> a wild blockquote!

Emoji shortcuts! :tada: :heart_eyes: :grin: (`:tada: :heart_eyes: :grin:`)

You can even [link to C.H. Robinson!](https://www.chrobinson.com)
```js
const words = ['Even', 'some', 'example', 'code!'];
const string = words.join(' '); // Even some example code!
```

Inline an image!

<figure>
	<img src="http://placehold.it/600x250.gif" alt="Placeholder image">
	<figcaption>Image caption goes here.</figcaption>
</figure>

| Want  | a     | Table? |
|:------|:-----:|-------:|
| cell1 | cell2 | cell3  |
| cell4 | cell5 | cell6  |
|----
| cell1 | cell2 | cell3  |
| cell4 | cell5 | cell6  |

### Footnotes

Sometimes it's nice to have extra information with a footnote[^moreinfo].

[^moreinfo]: Here's some extra information!

Here's the markup that just built that footnote
(note that you need to have an empty line between the text and the footnote definition):
```md
Sometimes it's nice to have extra information with a footnote[^moreinfo].

[^moreinfo]: Here's some extra information!
```

### Kramdown

To get extra fancy, check out the [kramdown docs](https://kramdown.gettalong.org/syntax.html){:title="Kramdown Docs"} for tons of extra features
build on top of markdown! (like the title text on that link)
`[kramdown docs](https://kramdown.gettalong.org/syntax.html){:title="Kramdown Docs"}`

## Now What?

Add your name to the authors list found at `_data/authors.yml` and include your unique name key in the [front matter](https://jekyllrb.com/docs/frontmatter/)
of your article (the YAML block at the top of the file, between the `---` and `---`).

Profile images are loaded through [gravatar](https://en.gravatar.com/), which gives you independent control over the
image, allowing you to configure it independently of this blog.

## Even More Examples

Checkout the [Sample Post Style Guide](https://mmistakes.github.io/skinny-bones-jekyll/articles/sample-post/) from the
Skinny Bones template itself! (Also see the
[raw file](https://raw.githubusercontent.com/mmistakes/skinny-bones-jekyll/gh-pages/_posts/articles/2011-03-10-sample-post.md)
to see the code that builds that post)
