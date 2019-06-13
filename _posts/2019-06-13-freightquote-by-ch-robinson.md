---
layout: article
title: "Building a Better User Experience: Freightquote by C.H. Robinson"
authors:
 - nickgoble
 - carlnei
modified: 2019-06-13
categories: [technology]
tags: [Freightquote, Logistics]
disclaimer: true
---

Here at C.H. Robinson, we continually challenge ourselves to better serve our wide array of customers, who may or may not be experts in the logistics marketplace. One of our newest applications, [Freightquote by C.H. Robinson](https://freightquote.com/book), is a self-service tool centered around a persona of someone who is unfamiliar with the logistics market.

## What We Needed

One of the most challenging tasks when building an application is determining how to tailor your application to a particular user experience. You can build one of the best applications out there, but if nobody has that particular need, your hard work goes unused. This can also happen if you try to build an application that attempts to handle too many needs, which runs the risk of not serving any of them well.

### Who Is Ashlee?

When we began the project, the first thing we did was create a target persona: Ashlee. Ashlee is a college graduate and small business owner. She wants to invest as much time as possible in growing/scaling her business and setting herself up for success in the future.  Her company manufactures socks, and she needs help getting them from the factory to the distributor. She wants this process to be easy and simple.

> "Going out and getting more business is more important to me than trying to lower my freight cost"
>
> -- <cite>Ashlee</cite>

## How We Built It
### Self-Service Model

Traditional customers doing business with C.H. Robinson have an account representative to manage their freight. These account representatives are at physical branches that are located around the world. For large customers, these representatives add a lot of value including:
- Customer-specific support
- Freight optimization
- Catalog creation
- Pricing customization

Just because Ashlee isn't a large customer doesn't mean she shouldn't receive the same benefits. One of the main goals for Freightquote by C.H. Robinson was to shift some of that value directly into the customer hands. What if we could provide typically complex information in a simple, easy-to-understand manner so customers could make their own decisions on how to move their freight? What if we could empower new customers to learn about which carriers are good choices for them, what a freight class is, or what mode is best for them without having to call somebody? These are some of the driving questions for past, present, and future features that are being developed.

Our goal for our target persona, Ashlee, is this self-service model. When she comes to our site, we provide tooltips, calculators, and automated processes to help her get through her logistics experience as quickly and easily as possible. Since she's able to complete the process without calling an account representative, she's empowered to complete this work on her own schedule and get back to scaling her business.

<figure>
	<img src="{{site.url}}{{site.baseurl}}/images/posts/2019/freight-class-tooltip.png" alt="What is a freight class?" aria-label="Explanation of what freight class is, how it's calculated, and some examples.">
	<figcaption>Example tooltip</figcaption>
</figure>

### Customer Growth

As our customers continue to grow their business, we want to grow with them. If Ashlee's sock business becomes promoted at major retailers, her logistics needs will scale to a point where she needs help. Maybe the self-service model doesn't make sense for her anymore, and she needs somebody committed to helping her manage her freight. At that point, we can easily transition Ashlee's account over to a representative who can customize her experience to her needs and help her optimize her freight.

### Tech

For those who have read [my blog post on Navisphere architecture](https://engineering.chrobinson.com/technology/navisphere-transformation/), this should look very familiar. Freightquote by C.H. Robinson is a new microsite using:
- React
- Redux
- Redux Saga
- Redux Form
- C#/.NET Servicestack

One of the cool things with this specific microsite is that it has been uplifted to new company-wide build and test scripts. This allows our developers to focus on delivering new functionality to our customers faster. The microsite pattern also allows us to transition customers between applications and platforms with the click of a button.

### Check Us Out!

If you find yourself in need of a self-service logistics tool, come [check us out](https://freightquote.com/book) and leave some feedback!
