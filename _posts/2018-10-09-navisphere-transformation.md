---
layout: article
title: "Navisphere Transformation"
authors:
 - nickgoble
modified: 2018-10-09
categories: technology
excerpt: "Take a look at how we transformed our primary customer-facing application."
tags: [Navisphere, Transformation]
image:
  feature:
  teaser:
  thumb:
disclaimer: true
---

One of the greatest challenges within software development is the constant evolution of technology.  Whether it be the new flashy javascript framework, or the old reliable .NET, C.H. Robinson has continued to evolve through the years.  The main customer-facing application, Navisphere 1.0, has seen some upgrades over the years.  Today, we are proud to talk about the next generation: Navisphere 2.0.

## What is Navisphere?

<figure>
	<img src="{{site.url}}{{site.baseurl}}/images/posts/2018/onlineOne.png" alt="Navisphere 1.0 Get A Quote" aria-label="Navisphere 1.0 Get A Quote">
	<figcaption>Navisphere 1.0 Get A Quote</figcaption>
</figure>

For those who don't know, C.H. Robinson is a [3PL](https://en.wikipedia.org/wiki/Third-party_logistics) company.  What this means is that we have multiple types of customers that we have to support, along with their complex logistics scenarios.  In order to give visibility into that data for a given customer or group of customers, we needed to build out a web-driven tool that could not only give customers the power to view/modify their data, but perform quickly over large data sets and complex supply chains.

## History

<figure>
	<img src="{{site.url}}{{site.baseurl}}/images/posts/2018/navisphere-online-roadmap.png" alt="Navisphere 2.0 Migration Overview" aria-label="Navisphere 2.0 Migration Overview">
	<figcaption>Navisphere 2.0 Migration Overview (image provided by Ashley Kramer)</figcaption>
</figure>

C.H. Robinson has a long history of web presence for our customer visibility of logistics data.  First, we had eCenter as the primary interface, written in [Classic ASP](https://en.wikipedia.org/wiki/Active_Server_Pages).  Then in 2005, development started on Navisphere Online 1.0, a [Web Forms](https://www.asp.net/web-forms) [VB.NET](https://en.wikipedia.org/wiki/Visual_Basic_.NET) based application.  This application has seen some upgrades over the years including: switching to [C#](https://en.wikipedia.org/wiki/C_Sharp_(programming_language)), introducing [unit testing](https://en.wikipedia.org/wiki/Unit_testing), and updating the minimum supported browser to IE8.  As most software developers know, any application that's 12 years old is going to have some growing pains.

## Enter Navisphere 2.0

In 2015, development began on a new iteration of Navisphere.  The inital objective of the project was to:
>Create an incredible customer experience by providing an intuitive, self-service website that customers and suppliers love to use. Empower customers to see and interact with their supply chain and leverage competitive reporting solutions.

<figure>
	<img src="{{site.url}}{{site.baseurl}}/images/posts/2018/onlineTwo.png" alt="Navisphere 2.0 Get A Quote" aria-label="Navisphere 2.0 Get A Quote">
	<figcaption>Navisphere 2.0 Get A Quote</figcaption>
</figure>

Reinventing the logistics customer experience required an uplift of the user experience, and the technologies used to build the platform.

#### Design

When the Navisphere 2.0 project started, it was composed of an [AngularJS](https://angularjs.org/) UI with a [.NET Web API](https://www.asp.net/web-api) backend.  As we started building a rather large UI and API, we realized that when the time came to once again upgrade the application in the future, we would be in the same situation as before. This led us to breaking our application up into [microservices](https://en.wikipedia.org/wiki/Microservices) and [microsites](https://en.wikipedia.org/wiki/Microsite).  

These microsites use a variety of frameworks (with a couple custom shared libraries between them for common functionality):
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Redux Saga](https://github.com/redux-saga/redux-saga)
- [Redux Form](https://redux-form.com/)
- [Jest](https://jestjs.io/)
- [Enzyme](https://github.com/airbnb/enzyme)
- [Webpack](https://webpack.js.org/)

The key takeaway from this design pattern is that we now are able to upgrade certain sections of our application in place, instead of having to upgrade everything all at once.  This means less down time, faster speed to market, and better maneuverability within the logistics market.  We also have the ability to have new sites come into our platform, and all they have to write is the body of their application.  Currently within Navisphere 2.0, we have seven microsites ranging from customer documents to orders, with multiple [inner-sourcing](https://en.wikipedia.org/wiki/Inner_source) engagements in flight.

Each microsite is then paired with a gateway API, following the [Backends for Frontends](https://docs.microsoft.com/en-us/azure/architecture/patterns/backends-for-frontends) design pattern.  These gateway APIs handle creating a view-model for our UIs along with concerns such as authentication.

<figure>
	<img src="{{site.url}}{{site.baseurl}}/images/posts/2018/navisphere-online-design.png" alt="Navisphere 2.0 Design Overview" aria-label="Navisphere 2.0 Design Overview">
	<figcaption>Navisphere 2.0 Design Overview (blue depicts internal to C.H. Robinson network, only some repositories shown)</figcaption>
</figure>

Underlying APIs allow us to aggregate data in one place and serve it to multiple UIs.  This also allows us to apply business logic at various layers depending on the situation.

#### Performance

We are able to scale our application more easily by splitting up our application into multiple pieces.  Currently, Navisphere 1.0 is deployed to three servers.  Navisphere 1.0 was built making cross database calls, which leads to fragility when other teams want to update their schemas, along with more intensive database management.

In the design above, each Navisphere 2.0 UI/API is deployed to three servers, and each API is single responsibility.  We have transitioned from cross database calls to calling APIs that are owned by the appropriate internal support team.  Not only does this pattern create a single source of truth for application data, it makes a very noticable difference in application performance.  C.H. Robinson as a whole has invested in making data available in different formats that each have an appropriate use case, such as [Elasticsearch](https://www.elastic.co/) when trying to search large data sets.  By taking advantage of these upgrades, Navisphere 2.0's speed has grown from a crawl to lightning fast.

#### Deployments

Due to the amount of manual testing required for Navisphere 1.0, it's deployed once per month on a regular cadence.  This was something we wanted to avoid with Navisphere 2.0.  Thanks to our DevOps automation pipeline, we are able to deploy at any time.  This requires us to do a large amount of automated testing, including [unit tests](https://en.wikipedia.org/wiki/Unit_testing) and [integration tests](https://en.wikipedia.org/wiki/Integration_testing).  These help ensure that the code we are deploying shouldn't cause a disruption in service, or break existing functionality.  This means that the end customer has the most up-to-date experience whenever they visit our site, and we can resolve production issues in minutes rather than weeks.

#### Future State

New technologies are constantly coming out, and we are continuously iterating over the state of the platform.  On the horizon we have:
- [.NET Core](https://docs.microsoft.com/en-us/dotnet/core)  (See reasons [here](https://docs.microsoft.com/en-us/dotnet/standard/choosing-core-framework-server))
- [Kafka](https://kafka.apache.org/) for source system data streams 
- [Storybook](https://storybook.js.org/) for building/testing react components
- [GraphQL](https://graphql.org/) for querying APIs

#### Application Migration

Ideally, when migrating a customer base from one application to another, you would wait until all the core features that the customer needs are ready in the new system.  In reality, that feature list can be long with an older application, and you're constantly chasing your tail trying to keep up with the new features being built in the old system.  To resolve this, we've built interoperability between Navisphere 1.0 and Navisphere 2.0.  We have the ability to build out new pages into an appropriate microsite, and seamlessly link to them from Navisphere 1.0.

Since Navisphere 2.0 is now broken into microsites/microservices, it's easier for the platform to have more developers working towards the same customer migration goal.  Coupled with C.H. Robinson's inner-sourcing mentality, you get a powerful group of individuals pumping out features while simultaneously moving the platform in a modern direction.

#### Customer/Network Feedback

>I was at a customer implementation training them how to use 2.0 and the freight manager said 2.0 was the simplest system they have used, would save them time, and wished that competitors had a similar system.

>Even our newest sales reps are closing deals by showing customers Navisphere 2.0!

>I love your new site!!  Very easy to use.  My favorite feature is tracking a load.  Real fast and you get everything in one page.  Anything that makes our life easier is great.  Keep up the good work & thanks for all you do.

>Holy hotel bills Batman! I can't believe it! I can now search by MY REFERENCE NUMBER!! You've made this site much faster and efficient for me!  INCREDIBLE! C.H. Robinson ROCKS! THANK YOU, THANK YOU, THANK YOU!
