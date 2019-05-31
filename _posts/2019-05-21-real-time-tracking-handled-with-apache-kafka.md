---
layout: article
title: Near-real-time Tracking Handled with Apache Kafka
authors:
 - strejen
 - twitros
 - hanspen
categories: [architecture]
tags: [Tracking, Apache Kafka, Technology]
disclaimer: true
---

Visibility is a crucial factor when it comes to making customers happy. For example, when you order a pizza from Domino's online, the entire process is visualized for you so you know what to expect. Amazon goes a step further by giving you a tracking code to monitor a package's stops along the way before it reaches your front door. C.H. Robinson customers should be able to track their product's location at all times. This requires us to handle a consistent flow of location updates from trucks, vessel, intermodal and air units around the world.

## The Challenge
Before diving into the technical details of C.H. Robinson's near-real-time tracking platform, let's talk about the reason why this is a challenge. C.H. Robinson is a non-asset holding third party logistics company, which means that we own minimal assets such as trucks, planes, and vessels. How can we, in near-real-time, track millions of vehicles that we don't even own? This is possible because in December 2015, [Congress mandated](https://www.fmcsa.dot.gov/hours-service/elds/electronic-logging-devices) that truck drivers have electronic logging devices (ELD) installed in their vehicles that allow near-real-time updates for things like GPS location, speed, direction, and even fuel-level. Ten years ago, near-real-time tracking of this volume was a pipe dream, but now vehicles are mandated to have ELDs installed, it quickly becomes a real possibility. 

## Overview of the Tracking-gateway
The tracking-gateway is a centralized application that handles the tracking data from many different ELD providers and makes the data available for other applications. The tracking-gateway is written in NodeJS, uses Apache Kafka for an event stream, and inserts to a MongoDB database. Every month, the tracking-gateway gets on average 105,000 start tracking requests, along with 10+ million GPS location updates.

## What Is Kafka?
C.H. Robinson uses Apache Kafka to build near-real-time data streams. According to [Kafka's website](https://kafka.apache.org), it is "scalable, fault-tolerant, and wicked fast." Kafka is an excellent tool for handling a high volume of data streamed to different applications. It is great at making that data readily available, allowing us to provide near near-real-time updates to our customers for greater visibility to their products. It also scales horizontally. By utilizing the power of Kafka, it has helped us shape C.H. Robinson's design of the tracking-gateway so that tracking data is ready for our customers as soon as possible.

## How Kafka Shaped Our Tracking-gateway Design
Because C.H. Robinson is a non-asset holding company, we connect with many different tracking providers to get tracking locations on a global scale. Because every company has its own methods for receiving tracking data, C.H. Robinson has built individual solutions for each one to map data from their schemas to a generalized schema for our internal system. From this generalized schema, data is written to a Kafka topic. On the other end of the Kafka topic, a daemon exists that functions like a Kafka sink. This daemon will consume off of the Kafka topic and write the data into a database for other applications to access. During the design phase, it was decided to stay away from using an actual Kafka sink connector as it allows more control of database authentication and system health monitoring. 

<figure>
	<img src="{{site.url}}{{site.baseurl}}/images/posts/2019/tracking-gateway-design.jpg" alt="Tracking Gateway Design" aria-label="Boxes and arrows showing how the tracking gateway is designed. Individual data gathering solitions, wite to topic, Kafka Topic, read from topic, Daemon, and Database">
  <figcaption>Layout of the Tracking-gateway</figcaption>
</figure>

## So Why Choose Kafka?
Adoption of Kafka is being utilized at C.H. Robinson more than ever. It gives the ability to handle a high volume of events coming through the stream. It also provides resilience for any time an application goes down. Kafka's designed so, that if a broker server goes down, it will still be able to function with its remaining servers. With Kafka, you can get more near-real-time events which can help provide data to customers as soon as possible. While near-real-time tracking is one example of utilizing Kafka to its full potential, other solutions can use Kafka's event stream capability.
