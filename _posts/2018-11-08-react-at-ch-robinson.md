---
layout: article
title: "React at C.H. Robinson"
authors:
 - bremeva
modified: 2018-11-08
categories: technology
excerpt: "Consolidating our front-end technology stack around a community favorite has enabled us to move more quickly, together."
tags: [React]
image:
  feature:
  teaser:
  thumb:
disclaimer: true
---

Consolidating our front-end technology stack around a community favorite has enabled us to move more quickly, together.

## History of Web Technology at C.H. Robinson

C.H. Robinson is proud to continuously evolve our technologies to meet new and challenging business demands. By adopting great tools, establishing sound processes, and empowering productive developers, we are able to create and scale world-class 3PL[^3pl] solutions.

Approximately four years ago, C.H. Robinson Engineering began to transition from ASP.NET into the world of open web technologies, spurred by Microsoft's support for AngularJS in new project templates. The web had matured into a well-established foundation for creating rich applications that could run on numerous devices, enabling us to distribute our solutions beyond desktop computers. This would allow us to reach new users and support their use cases more directly.

Our initial investment to pivot from ASP.NET to AngularJS was tremendous. We created over one hundred UI projects based on multiple versions of AngularJS 1.x, resulting in over half a million lines of AngularJS-flavored JavaScript code (not to mention the AngularJS-flavored HTML that went along with it). AngularJS provided a solution to many common tasks that development teams were faced with, from state management to AJAX[^ajax]. The batteries-included approach meant teams were productive out of the gate. However, as the framework evolved, individual products started experiencing real challenges in sharing common pieces of code. This led to divergence from standards and created friction points, making inner-sourcing code difficult and costly.

To complicate the matter, React had continued to mature and prove itself as a viable alternative. Trends throughout the JavaScript community showed React adoption eclipsing that of AngularJS, and teams at C.H. Robinson had begun rallying behind it. When Angular 2 was officially released in Fall 2016, some teams continued to explore adopting Angular, but it prompted new conversations around whether Angular should continue to be our UI technology of choice.

Support for AngularJS was certain to decline. Angular was experimental, showing some signs of stability and other signs of growing pains. Meanwhile, React was continuing to eat developer mindshare for breakfast.

<figure>
  <img
    src="{{site.url}}{{site.baseurl}}/images/posts/2018/react-ng-trends-usa.png"
    alt="US interest in React vs Angular"
    aria-label="Upward trendlines of Google Trend interest for React and Angular in the United States"
  />
  <figcaption>
    US interest in React overtook that of Angular in 2017, continues to grow.
  </figcaption>
</figure>

<figure>
  <img
    src="{{site.url}}{{site.baseurl}}/images/posts/2018/react-ng-trends-worldwide.png"
    alt="Worldwide interest in React vs Angular"
    aria-label="Upward trendlines of Google Trend interest for React and Angular Worldwide"
  />
  <figcaption>
    Worldwide interest in Angular plateaued in mid-2016.
  </figcaption>
</figure>

Throughout 2017, conversations spurred around whether we should stay the course with Angular or adopt React. Ultimately, we decided to focus our future UI development on React.

## Goals

We chose React for multiple reasons:
* **Community -** The React ecosystem had flourished in the first three years after its release. React was almost synonymous with innovation, from `redux` to `react-native`. Myriad indicators of React's popularity were evident in:
  * **GitHub -** [React](https://github.com/facebook/react) has fewer issues and more stars than both [AngularJS](https://github.com/angular/angular.js) and [Angular](https://github.com/angular/angular)
  * **Monthly downloads -** Cite [npm trends](https://www.npmtrends.com/@angular/core-vs-angular-vs-react)
  * **Independent surveys -** The community responded directly, and React was the clear favorite, year after year:
    * > [...it turns out the uncontested leader is instead React](http://2016.stateofjs.com/2016/frontend/)
    * > [React is still the dominant player here, ...Angular's diminishing popularity](https://stateofjs.com/2017/front-end/results)
* **Agility -** Maintaining long-term agility requires selecting the right tool for a job, and React solves one problem very well. Related problems that React does not solve natively can be solved by other tools with very low integration cost.
* **Paradigm -** React encourages functional, stateless, immutable programming. Time has shown this approach to yield more robust products with fewer bugs, reduce complexity, enable parallelism, separate concerns, improve testability, and much more. React also builds on JavaScript and DOM standards, resulting in a very low number of isms; i.e., there are no `ng-*` attributes and prefixes in our code.
* **Minimalism -** The top-level API of React is tiny, and its core abstractions have remained incredibly stable for years. This is a testament to how well a library solves a particular class of problems. This also enables us to compose our UIs of smaller pieces, making it easier to update those pieces out of band (or transition them to a different solution altogether) without necessitating sweeping refactors of entire codebases.
* **Licensing -** Facebook released React 16 and other companion libraries under the MIT license, removing another potential barrier.

## Adoption Strategy

Given the amount of product we had developed in AngularJS and Angular, transitioning the entire organization (approximately 600 engineers) to a new technology was a daunting task. We readily identified the need to provide support to our development teams to make it easy to get up and running with React as quickly and painlessly as possible.

We started with the following initiatives:

### 1. Schedule Training

A handful of teams had projects slated to start in the near term and would be ready to build in a new technology. We didn't want teams to drop everything and rewrite core, stable functionality; rather, we wanted to target React going forward. We scheduled a series of workshops, each lasting three days, to prepare these teams to build their new products in React.

The training curriculum consisted of:

* An introduction to React, including its history and motivation
* State management
* Component styling
* Advanced component composition patterns
* Redux basic and advanced patterns, including overviews of several middlewares
* Routing
* Testing
* Migration strategies, refactoring approaches and their associated tradeoffs

Based on positive feedback from these workshops, we scheduled another series of workshops, rolling this training out to the bulk of our teams throughout North America and Europe.

### 2. Uplift Our Project Templates

We wanted our project templates to be a modern reflection of community-adopted best practices. Our ultimate goal is to have a team create and deploy a new product to production in 15 minutes with full automation. That required identifying any additional changes to our toolchain that would sensibly accompany this transition. We:
* Adopted Jest as our preferred testing framework
* Targeted latest Webpack
* Included modern babel transforms
* Added support for teams who wanted to work in TypeScript

We put in sensible defaults and included working examples of common tasks, such as:
* Making API calls to real services
* Local and shared state management
* Routing
* Unit testing each part of a project
* End-to-end tests

### 3. Create New Support Channels

We needed to establish a feedback loop within the developer community and provide mechanisms for them to assist themselves and one another:

* We created new teams in GitHub, recruiting volunteers to help review PRs
* We set up new slack channels for **#react** to focus on React and **#ui-dev** for more general questions and discussions
* We formed a new team responsible for engaging with teams to curate a library of shared componentry and evangelizing adoption of common patterns

## Where Are We Now?

Nine months later, we have seen significant strides toward org-wide adoption of React, and the consensus from development teams has been extremely positive. React's simplicity eased testing, facilitated interoperability, and, ultimately, increased team velocity.

Nearly as many products are now built in React (123 products) as had been previously built in both AngularJS and Angular combined (128 products).

Development teams are creating dozens of shared libraries for UI components, logging, authentication, etc., and integrating them much more easily.

We reduced average project lines of code by approximately 15%. This continues to improve as more teams build out shared componentry.

## What's Next?

We are undertaking many ambitious and exciting initiatives, moving our core user interfaces from .NET to React. While we are moving in a great direction, we still have plenty of work left to do. We need your help! [We invite you to join us in creating world-class solutions with modern technology!](https://www.chrobinson.com/en-us/careers/)

***

[^3pl]: [3rd Party Logistics](https://en.wikipedia.org/wiki/Third-party_logistics)

[^ajax]: [Asynchronous JavaScript and XML](https://en.wikipedia.org/wiki/Ajax_(programming))
