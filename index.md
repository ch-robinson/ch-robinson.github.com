---
layout: home
permalink: /
image:
  feature: chr-homepage.jpg
---

<div class="tiles">

<div class="tile is-4">
  <h2 class="post-title"><a href="https://developer.chrobinson.com/">API Portal</a></h2>
  <p class="post-excerpt">Welcome to the API Portal.  The API Portal documents the rich API that customers can use to interact with the Navisphere Platform.</p>
</div><!-- /.tile -->

<div class="tile is-4">
  <h2 class="post-title"><a href="https://www.chrobinson.com/en-us/about-us/technology/">CH Robinson Technology</a></h2>
  <p class="post-excerpt">The rapid advancement of technology is transforming the way in which we live and do business. Supply chains are no exception. As your supply chain grows in both size and complexity, you need the best transportation management technology to gain a competitive advantage and exceed your customer expectations. That’s why we are invested in delivering and implementing flexible, efficient, and integrated technology solutions that connect all aspects of your supply chain.</p>
</div><!-- /.tile -->

<div class="tile is-4">
  <h2 class="post-title"><a href="https://ch-robinson.github.com/">GitHub</a></h2>
  <p class="post-excerpt">Visit us on GitHub.</p>
</div><!-- /.tile -->

<div class="tile is-4">
{% unless site.posts == empty %}
{% for post in site.posts limit:1 %}
    <h2 class="post-title"><a href="{{ site.url }}{{ site.baseurl }}{{ post.url }}" title="Blog - {{ post.title | escape_once }}"></a></h2>
            <p>
                <a href="{{ site.url }}{{ site.baseurl }}{{ post.url }}" title="{{ post.title | escape_once }}"><img width="970" src="{{ site.urlimg }}{{ post.image.homepage }}" alt="{{ page.title | escape_once }}"></a>
            </p>
            <p class="post-excerpt">
                {% if post.meta_description %}{{ post.meta_description | strip_html | escape }}{% else post.excerpt %}{{ post.excerpt | strip_html | escape }}{% endif %}
                <a href="{{ site.url }}{{ site.baseurl }}{{ post.url }}" title="Read {{ post.title | escape_once }}"><strong>{{ site.data.language.read_more }}</strong></a>
            </p>
{% endfor %}
{% endunless %}
</div><!-- /.tile -->

</div><!-- /.tiles -->
