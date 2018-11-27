---
layout: article
title: First Steps into Open Source Software
authors:
 - bremeva
modified: 2018-11-27
categories: technology
excerpt: "Creating something brand new and novel? Take that first step toward MVP, and then iterate. Refactoring a crufty old service? Take that first step, strangling it over time by refactoring piece by piece. Want to start contributing to the open source software community? Take that first step..."
tags: [Open Source]
image:
  feature:
  teaser:
  thumb:
disclaimer: true
---

Creating something brand new and novel? Take that first step toward MVP, and then [iterate](https://www.martinfowler.com/bliki/FivePoundBag.html). Refactoring a crufty old service? Take that first step, [strangling it](https://paulhammant.com/2013/07/14/legacy-application-strangulation-case-studies/) over time by refactoring piece by piece. Want to start contributing to the open source software community? [Take that first step...](https://github.com/ch-robinson/vault-elastic-plugin)

## Open Source at C.H. Robinson

Like dozens of organizations, C.H. Robinson utilizes open source software throughout our solutions. We stand on the shoulders of giants, leveraging other people's contributions, which enables us to deliver real business value every day.

We love open source, and we are extremely fortunate to be able to use the work of others to build new applications, reduce coupling throughout our systems, and iterate at a higher velocity. We love it so much that we decided to give back.

In June of this year, we released the first version of a plugin for [Vault](https://www.vaultproject.io/) that will generate and revoke user credentials for [ElasticSearch](https://www.elastic.co/products/elasticsearch). You can find the project [here](https://github.com/ch-robinson/vault-elastic-plugin).

## Project Ideation

We write a *TON* of code at C.H. Robinson. However, we didn't want to contribute any arbitrary bit of code to the Open Source Software (OSS) community. Our project required the following characteristics:
* Clear use case &ndash; what sort of value does our code provide the community?
* Straightforward inclusion and low coupling for consumers &ndash; ease of integration is paramount in delivering valuable software
* General purpose, working across industries &ndash; this ensures we cast a wide enough net, empowering more developers without divulging intellectual property

In this incredibly rare instance, the two stars of internal and external requirements aligned.

## Project Requirements

We had an internal requirement to dynamically issue credentials for our ElasticSearch data stores using Vault as our credential producer. According to [Vault's documentation](https://www.vaultproject.io/docs/internals/plugins.html):

> Developing a plugin is simple. The only knowledge necessary to write a plugin is basic command-line skills and basic knowledge of the Go programming language.

Any developer, in any industry, at any company that happens to be using ElasticSearch and Vault could use such a plugin. This project was readily identified as a prime candidate for sharing with the OSS community.

## Project Build-out and Deployment

Given the clarity of requirements and limited scope of the project, a pair of developers got to coding and testing. This part of the story is not particularly interesting, so here are some gifs of cats typing at keyboards:

<figure>
  <img src="{{site.url}}{{site.baseurl}}/images/posts/2018/typing-cat.gif" alt="Developer cats working frantically" />
  <figcaption>Developer cats working frantically</figcaption>
</figure>

<figure>
  <img src="{{site.url}}{{site.baseurl}}/images/posts/2018/typing-cat-2.gif" alt="Developer cats still working frantically" />
  <figcaption>Developer cats still working frantically</figcaption>
</figure>

<figure>
  <img src="{{site.url}}{{site.baseurl}}/images/posts/2018/one-hour-later.jpg" alt="One hour later" />
  <figcaption>One hour later</figcaption>
</figure>

It worked!

## What Are the Next Steps?

Several C.H. Robinson engineers are participating in various open source projects, from the Rust compiler to IstanbulJS. We encourage engineers to pursue their passions and spend time on projects to which they would like to contribute.

We benefit tremendously from the work of others in the OSS community, and we are actively identifying new opportunities to give back. Whether it takes the form of brand new projects or features and fixes for existing ones, you can count on C.H. Robinson Engineering to raise our hands to volunteer to contribute.
