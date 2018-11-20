---
layout: article
title: "Our Favorite Coworker"
authors:
 - miketintes
 - brianmitchell
modified: 2018-07-25
categories: culture
excerpt: "How does a hubot instance automate tasks and promote workplace culture? Meet Charlie."
tags: [Hubot, Charlie]
image:
  feature:
  teaser:
  thumb:
disclaimer: true
---

How does a hubot instance automate tasks and promote workplace culture? Meet Charlie.

## History

Charlie came out of no where for us. His creation was a small chance of coincidence of having been in the right place at the right time. In 2016, eight engineers went to GitHub Universe. We had been using GitHub for about year and GitHub Universe seemed like a great way to gauge how we were doing as a company.

The day before the conference, GitHub offered a training day. During one of the afternoon sessions we had the option of git or something called [hubot](https://hubot.github.com/). The class on git was popular and did not have space for the whole group. We sent the larger half of our group to the git talk while two of us headed upstairs to attend the talk on this hubot thing. Going into the talk we were thinking "Great, this will be like a silly IRC bot. How useful can it be?" Wow, were we wrong! The presenters talked about hubot's current implementation and how they use their "little" bot to do tons of tasks, from pulling graphs of their systems to actually deploying GitHub itself. We had a few ideas of our own by the end of the class. By the end of the conference, we had a *lot*.

Back in the office, we started by setting him up locally on our computers and made scripts that we thought would be useful. It took until our 2017 hackathon that we were able to pull together a small team and implement the bot for the organization. We called our hubot instance "Charlie" after our company founder, Charles Henry Robinson.

<figure>
	<img src="{{site.url}}{{site.baseurl}}/images/posts/2018/charlie-star.svg" alt="Charlie Icon" aria-label="Robot head with a mustache, wearing a brown cowboy hat with a gold star on the front, and a bandana around the neck">
	<figcaption>This is Charlie, feel free to say hello! :wave: (image by Alex Brown)</figcaption>
</figure>

We've had Charlie around for nearly a year now. In that time we've learned a lot about spinning up what was essentially a side project and rolling it out organization wide.

## Uses

### Automate Tasks
Charlie helps us automate repetitive tasks with ease and allows people to self-serve. We have scripts that:
- Check the build status of a Jenkins job
- Manage permissions for GitHub
- List open pull requests by a team or for a team to review
- Submit requests for products in our DevOps pipeline
- Check the health of an API and its dependencies
- Get the health status of our authentication nodes
- Return a random user from a specified team when you need to find someone to do a task

### Cultivate Culture
Company culture is important. It helps when hiring new talent. It can drive us as individuals to do our best.
Charlie isn't all work, we try to give him personality and make him fun as well. Some examples include:
- Giving shoutouts to people on Slack
- Flipping and un-flipping tables (╯°□°）╯︵ ┻━┻ ┬─┬ノ( º _ ºノ)
- Telling jokes
- Seeing lunch options
- Translate text
- Store and list common abbreviations
- See which is hotter, Mars or Minneapolis

### Meta Scripts
We also have meta scripts that help us improve Charlie and give him character. We have scripts that help with:
- Creating an issue in our Charlie repository with an idea or feedback on Charlie itself
- Thanking Charlie
- Greeting Charlie

<figure>
	<img src="{{site.url}}{{site.baseurl}}/images/posts/2018/charlie-conversation.png" alt="conversation with Charlie" aria-label="An example conversation with Charlie: asking for an acronym and getting the holidays for the current year">
	<figcaption>A conversation with Charlie</figcaption>
</figure>

## Lessons Learned

### Logging

When first rolling out Charlie, we had no visibility to how people were talking to him. This made it difficult to gather usage, debug, and plan new features. We use hubot's [`listenerMiddleware`](https://hubot.github.com/docs/scripting/#listener-middleware) to log every command that flows into Charlie. We store the triggering request: the username of the issuing user and the message text. With this, we can provide analytics on the use of Charlie and reach out to the most active users and ask for feedback or contributions.

### Future

We have barely scratched the surface towards our vision of Charlie.

Some of our goals for the future include:
- Continuing to separate each script into its own repository/module (instead of everything living in a single repository). This will increase the modularity of scripts, and is inline with the architecture of hubot 3.
- Upgrade to hubot 3
- Deploy with Docker
- Automated testing (unit and end-to-end)
- Polling each script for availability

These ideas will decrease the barrier to entry for new contributors and deliver a more stable Charlie.

## Contributing

We love when new people want to get involved to contribute to Charlie. To internally advertise for Charlie and to spread the awareness, we give contributors T-Shirts (they say "@charlie help") and stickers with our Charlie logo. We have hubot and Charlie (without a star) stickers that anyone can collect.

<figure>
	<img src="{{site.url}}{{site.baseurl}}/images/posts/2018/charlie-mechanics.jpg" alt="Charlie mechanics" aria-label="Mike and Brian wearing t-shirts with the text &quot;@charlie help&quot; on the front">
	<figcaption>Mike and Brian, Charlie mechanics</figcaption>
</figure>
