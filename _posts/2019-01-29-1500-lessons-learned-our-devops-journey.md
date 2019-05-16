---
layout: article
title: "1500 Lessons Learned: Our DevOps Journey"
authors:
 - miketintes
categories: [culture]
excerpt:
  Scale fast, fail fast, automate everything, and hope
  you get lucky. DevOps lessons for the enterprise.
tags: [DevOps, Transformation]
disclaimer: true
---

We've had a DevOps team for 3 years now and I can tell you one thing: I still don't know what DevOps is. To some, DevOps is a team. To others it's a mentality. When querying DevOps on the internet you will get results of companies that will sell you DevOps. You can download their software and start it up and _boom!_ you have DevOps.

DevOps can also mean developers write some unit tests and after some negotiation with change management can release that code out to the cloud somewhere. Some DevOps teams are made of a variety of people in many different departments, others are just a single person with no budget cobbling together anything to provide value. When it comes down to it, there seems to be only one persistent theme to DevOps: deploy changes as fast as possible to provide value to end users. How that happens is up to each business, company, or organization to discover.

To C.H. Robinson, DevOps is a centralized team of 6 engineers trying to keep up with our 700+ IT coworkers. Our pipeline starts with [GitHub](https://github.com) and involves [Jenkins](https://jenkins.io/) (continuous integration), [Octopus Deploy](https://octopus.com/) (continuous deployment), [SonarQube](https://www.sonarqube.org/) (static code analysis), and [Artifactory](https://jfrog.com/artifactory/) (shared package and container image repository). We chose these tools largely because they all have APIs. This allows us to programmatically work against them to automate solutions (we'll talk more about this later). Our DevOps process is built around the ___deploy fast and provide value___ methodology above. We can do this because of rigorous unit and automated acceptance testing. We create audit records on each deployment to keep track of changes in lieu of a manual change review process.

It seems like a weird thing to talk about now, but when we were putting a DevOps team together we knew it was needed, but weren't exactly sure how it would turn out. It was a side project that our research team took on and was just a few people trying out ways to make our deployment process faster and more accurate. At the time our company was not into web technologies or microservice architecture. We used [WPF](https://docs.microsoft.com/en-us/visualstudio/designers/introduction-to-wpf?view=vs-2017) and in some cases [VB6](https://en.wikipedia.org/wiki/Visual_Basic). We knew that if we wanted to compete in a modern marketplace, we had to evolve. The harsh truth is that moving a corporation in a new direction is not easy or fast. DevOps, we would learn, could help us get there.

## Lesson 1 - Lower Your Barriers

As users, we want the newest features and we want them now. The same goes for our employees at C.H. Robinson. We in IT want to provide  solutions and answers for them, but due to this high volume of work teams follow the path of least resistance. After all, it is easier to add a button to an existing app instead of rewriting a whole app. We hoped that lowering the cost of entry to building and deploying new products would help teams adopt newer technologies. We did this by implementing a submission form for teams and creating templated solutions.

The basic UI takes in a domain (the area of focus that the product benefits), a product name (how we refer to it at any stage of the pipeline), and a product type (a product can be an API, UI, or any other single microsystem). Going back to why we chose our toolset from earlier in this post: the partial answer is because they have APIs. We can programmatically work against them to automate. We will touch on that more later. We take those three pieces of info and build out all the pieces necessary to deploy through our pipeline. We use base templates that anyone in C.H. Robinson IT can contribute to and create code repositories with solutions named by a systematic and consistent process. What once took days or weeks to deploy now takes a matter of minutes. Anyone, including my cat (she stepped on the keyboard, I had to click the submit button) can create a solution of production quality. No more "it is easier to just add it to the old product." We have no barriers, any developer knows how to use a given solution, because the framework is just like every other.

## Lesson 2 - Find Consistency

Through templating we bring consistency not just to the many different IT teams, but to the enterprise. We have around 30-35 teams, many services and so many different technologies that moving from one team to a different one would basically set a developer back to zero in specialized knowledge. The consistency that we demand from our developers is strict, but it means we solve problems at an enterprise level. Don't know a good way to unit test an obscure pattern? Someone else probably has. Need to deal with user authentication? We have a good way to do that. If no one has solved that problem before, then we know that as well. We can set out to solve the problem for the next person, which makes it more valuable to solve earlier. It aims to eliminate rediscovering the wheel and makes transferring from team to team reasonable. Developers know how to work in each others' codebase, because they are all similar technologies. Templating has been a great way to bring in new technology to our organization.

## Lesson 3 - Never Stand Still

Technology is moving faster than it ever has. Whether it's Elasticsearch, Redis, Kafka, Mongo, machine learning, React, Angular, Docker, etc. people love to try the newest shiniest thing. (By the way, I don't know when you are reading this, but are these technologies outdated?) For our team, this means our backlog is always growing. We are constantly reacting to new technology stacks and solutions. This year alone we have doubled the amount of different frameworks and languages we support. We will have close to 40 by year's end. We have grown from 10 products in our pipeline in January 2016 to over 1500 individual products in our pipeline (as of September 2018). Each of these products teach us something new about how our pipeline should function.

## Lesson 4 - Automate Everything

To say we have some work left to do is an understatement. Our IT shop is made up of incredibly intelligent people with a ton of good ideas. When it comes down to it, we can't put every idea in place. This is why automation is so important. "Automate everything!" was our DevOps team rally cry that first year. Automation allows our developers to do their work more efficiently by removing the middleman, manual work our DevOps team would have to do. With every automated task we add, we take a small piece of our work away, freeing us to focus on more important tasks. We build tiny cogs that over time can assemble into bigger systems. Automation from a developer's standpoint is incredibly important as well. Our pipeline pushes for high coverage of both unit tests and automated acceptance tests.

## Lesson 5 - Fail Fast

This is one of those trendy sayings that started popping up in the technology world a few years ago. Our developers deploy to production around 70 times a day. Their code is changing and evolving constantly with new features and bug fixes. 70 prod deployments a day is a great number to be able to show to executives, but from a low level it's not as valuable as other metrics. One metric that we really like to see is how many times the pipeline stopped bad code from deploying. Every solution that we push through the pipeline has automated acceptance tests that we run on deployment in all environments to make sure what we are deploying is good and not reintroducing bugs. Whenever an issue comes up, one of the first things a team should do is write a test around the bug, and then fix the bug. This way, tests will fail if a bug ever gets re-introduced. By working with a fail fast mentality, mistakes that get fixed stay fixed.

## Lesson 6 - Small Iterations

It may raise a red flag to say we do an average of 70 deployments a day. Surely we aren't adding 70 brand new state-of-the-art features and we don't have so many defects in the system that need to be fixed. Of course not, we work on microservice architecture. We love small changes. Before we had a DevOps pipeline we didn't have small changes. We would make big system-breaking changes and then release them all at once. This is a really good process if you want to have to wake up at 2 am to figure out how the code you wrote 3 months ago was supposed to work. It doesn't contribute to a good work/life balance. By moving to small change sets and working to do non-breaking changes we can more easily find issues when they arise.

## Lesson 7 - Get Lucky

One of our past architects would always say, "It's better to be lucky than to be good." I find that more and more true as time goes on and we learn new things about whatever this "DevOps" thing is. The truth is, when we started we took some guesses as to what problems to tackle. We saw trends in the industry and could steer towards those things, but when it comes down to it no one can guarantee a winning solution. For us, templating, our toolset, and automation is a successful combination. After the dust settled and we looked back on the things we have accomplished, I can wholeheartedly say it took hard work - and even more luck.

Now I know I promised you 1500 lessons, but you will just have to make due with these 7; the rest you can discover. With the right group of people and the right ideas, you will find what works for your situation.

<figure>
	<img src="{{site.url}}{{site.baseurl}}/images/posts/2019/devops-team.jpg" alt="CHR DevOps" aria-label="">
	<figcaption>(left to right) Nick Nelson, Seth Gupton, Isaac Springer, Chad Oftedahl, Chris Hedberg, Mike Tintes, Travis Schoenberg</figcaption>
</figure>
