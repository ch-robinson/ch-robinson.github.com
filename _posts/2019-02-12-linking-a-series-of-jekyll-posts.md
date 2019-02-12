---
layout: article
title: Linking a Series of Jekyll Posts
authors:
 - brianmitchell
modified: 2019-02-12
categories: how-to
excerpt: When we (the Engineering Blog committee here at C.H. Robinson) were working on the Mobile Apps Battery
         Management series, we were looking for a way to link a group of similar posts into a multi-post
         series. We wanted to show the post order, and be able to link between the parts, both
         holistically, and to the previous and next posts.
tags: [Jekyll]
disclaimer: true
---

When we (the Engineering Blog committee here at C.H. Robinson) were working on the
[Mobile Apps Battery Management]({{ site.url }}{{ site.baseurl }}/series#mobile-apps-battery-management) series, we were
looking for a way to link a group of similar posts into a multi-post series. We wanted to holistically show the post
order and link between the parts, as well as link to the previous and next posts if applicable.

This will cover the four main areas where we manage post series in our [Jekyll](https://jekyllrb.com/) blog.
> Jekyll is a simple, extendable, static site generator.

{% include toc.html %}

## Metadata :label:

We store the definition of each series as an object in a series [Data File](https://jekyllrb.com/docs/datafiles/).

```yaml
- id: mobile-apps-battery-management
  title: Mobile Apps Battery Management
  description:
    Our mobile team applies tools and practices to achieve the desired results of
    our mobile apps while conserving the user's battery. Our mission is to
    provide value to our end users while maintaining an undetectable impact to
    their battery and data usage.
```

To add a post to a series, we set the `series` variable to the ID of the series we want to use.

```yaml
---
series: mobile-apps-battery-management
---
```

## Series Overview :book:

In an aside to any post that is contained in a series, we include a message indicating that the post is part of a
series, and an ordered list (with links!) of other posts in the series.

<figure class="border">
  <img
    src="{{ site.url }}{{ site.baseurl }}/images/posts/2019/series-overview.png"
    alt="Series Overview screenshot"
    aria-label="Screenshot with a series title and an ordered list of post titles below"
    width="262"
  >
  <figcaption>Screenshot of the Series Overview</figcaption>
</figure>

```html
{% raw %}
<aside class="series">
  <h4>This post is part of the series <em>{{ site.data.series | where: 'id', page.series | map: 'title' }}</em></h4>
  <ol>
    {% assign series-posts = site.posts | reverse | where: 'series', page.series %}
    {% for post in series-posts %}
    <li>
      {% if post.url == page.url %}
      <strong>{{ post.title }}</strong>
      {% else %}
      <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
      {% endif %}
    </li>
    {% endfor %}
  </ol>
  {% if series-posts.size == 1 %}
  <p>More posts coming soon!</p>
  {% endif %}
</aside>
{% endraw %}
```

To describe the markup above:
- We find the series with the same ID as the series on the current page and map the title into the header
- Assign a variable, `series-posts`, to all posts that contain the same series value as the current page (in
reverse chronological order)
- Iterate through `series-posts`
  - If the post's URL matches the current page's URL, display the title in bold
  - Otherwise, link to each post
- If there is one post in a series, display a message that more posts are coming soon

## Series Pager :previous_track_button: :next_track_button:

At the bottom of a post that is part of a series, we link to the previous and next posts (as applicable)
in that series. 

<figure class="border">
  <img
    src="{{ site.url }}{{ site.baseurl }}/images/posts/2019/series-pager.png"
    alt="Series Pager screenshot"
    aria-label="Screenshot with a series title and a link to the next post"
    width="434"
  >
  <figcaption>Screenshot of the Series Pager</figcaption>
</figure>

```html
{% raw %}
<h4><em>{{ site.data.series | where: 'id', page.series | map: 'title' }}</em> Series</h4>
{% assign series-posts = site.posts | reverse | where: 'series', page.series %}
{% for post in series-posts %}
  {% if post.url == page.url %}
    {% assign prev_post_index = forloop.index | minus: 1 %}
    {% assign curr_post_index = forloop.index %}
    {% assign next_post_index = forloop.index | plus: 1 %}
  {% endif %}
{% endfor %}

<p>Post <strong>{{ curr_post_index }}</strong> of <strong>{{ series-posts.size }}</strong>.
  {% if series-posts.size == 1 %}More posts coming soon!{% endif %}</p>

{% for post in series-posts %}
  {% if prev_post_index == forloop.index %}
    <a class="btn" rel="prev" href="{{ site.baseurl }}{{ post.url }}">&larr; Prev Post</a>
  {% endif %}

  {% if next_post_index == forloop.index %}
    <a class="btn" rel="next" href="{{ site.baseurl }}{{ post.url }}">Next Post &rarr;</a>
  {% endif %}
{% endfor %}
{% endraw %}
```

To describe the markup above:
- We do the same first two steps from the Series Overview
- Iterate through `series-posts`
  - Find the index of the current page in the list
  - Store that index (`curr_post_index`), the one before (`prev_post_index`), and the one after
  (`next_post_index`) as variables
- If there is one post, display a message saying more posts coming soon
- Iterate through `series-posts` again
  - If the `prev_post_index` is the current index, display the previous post link 
  - If the `next_post_index` is the current index, display the next post link 

We're utilizing the fact that if there is no previous or next post, the previous or next indexes will be
out of bounds of the `for` loop, and thus will never equal the current index when iterating over the posts.

## Series Overview Page :bookmark_tabs:

To show a list of all series on the blog, we created a [Series Overview page]({{ site.url }}{{ site.baseurl }}/series)
which lists all series and the posts that make up each one.

<figure class="border">
  <img
    src="{{ site.url }}{{ site.baseurl }}/images/posts/2019/series-overview-page.png"
    alt="Series Overview page screenshot"
    aria-label="Screenshot with a list of series that link to a series title, desctiption, and list of posts"
    width="860"
  >
  <figcaption>Screenshot of the Series Overview Page</figcaption>
</figure>

```html
{% raw %}
<ul>
  {% for series in site.data.series %}
    {% assign series-posts = site.posts | reverse | where: 'series', series.id %}
    {% if series-posts.size > 0 %}
      <li><a href="#{{ series.id}}">{{ series.title}} ({{ series-posts.size }})</a></li>
    {% endif %}
    {% assign series-posts = nil %}
  {% endfor %}
</ul>

{% for series in site.data.series %}
  {% assign series-posts = site.posts | reverse | where: 'series', series.id %}
  {% if series-posts.size > 0 %}
    <h3 id="{{ series.id }}">{{ series.title }}</h3>
    <p>{{ series.description }}</p>
    <ul>
      {% for post in series-posts %}
      <li><time datetime="{{ post.date | date_to_xmlschema }}" itemprop="datePublished">{{ post.date | date: "%B %d, %Y" }}</time>:
        <a href="{{ site.url }}{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></li>
      {% endfor %}
    </ul>
  {% endif %}
  {% assign series-posts = nil %}
{% endfor %}
{% endraw %}
```

The markup above creates a list of series based on the series data file. A series will show up as long as there is at
least one post in that series, and shows a count of the number of posts in that series. Next, we create a heading
with the series ID as an ID of the element, which is link to from the list above. Below the heading we list the
posts in the series.

There you have it -- a data file, two Jekyll partials/includes, and a page to create a series of linked posts! :tada:

Feel free to check out the implementation that builds this site on our
[GitHub repository](https://github.com/ch-robinson/ch-robinson.github.com)!
