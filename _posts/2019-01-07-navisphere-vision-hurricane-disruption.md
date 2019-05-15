---
layout: article
title: Navisphere Vision Has an Eye for Hurricane Disruption
authors:
 - wadehay
 - dietmim
 - lairamy
 - fenkben
modified: 2019-01-07
categories: [technology]
excerpt:
  What happens when a team is given the chance to proactively anticipate their
  users' needs, attack a problem head on, and collaborate across roles to design
  a solution? For Navisphere Vision, the result was a quick turnaround that gave
  our customers a new level of visibility into how hurricanes were impacting
  their supply chain.
tags: [Navisphere Vision, Data Science]
disclaimer: true
---

This summer, casual conversations started flowing around the upcoming hurricane season. As a supply chain visibility platform, Navisphere Vision gives customers a full picture view of their shipments across the globe, including the status of each shipment along with any factors that could impact on-time delivery. Navisphere Vision was launched last summer with Microsoft as the pilot customer (see press release, [here](https://www.chrobinson.com/en-US/newsroom/Press-Releases/2017/9-12-17_Navisphere-Vision-Introduction/)) and has since expanded its feature set and customer base.

Hurricanes and Typhoons are some of the most impactful weather events on the planet and are known to cause disruptions within a supply chain. We found that the proportion of Houston-bound shipments that were delivered late nearly **tripled** in the aftermath of [Hurricane Harvey in 2017](http://www.startribune.com/new-c-h-robinson-system-kept-distribution-moving-during-hurricanes-eclipse/446881763/), giving credence to the large impact natural disasters can have on a supply chain. With this experience in mind, casual conversations started flowing about the impending 2018 hurricane season. 

## Execution

What happens when a team is given the chance to proactively anticipate their users' needs, attack a problem head on, and collaborate across roles to design a solution? For [Navisphere Vision](https://www.chrobinson.com/en-us/navispherevision/), the result was a quick turnaround that gives our customers a new level of visibility at a critical time, and a re-energized team that takes pride in delivering value, teamwork, and their ability to create innovative solutions at the spur of the moment.

We began to ask ourselves what could we do to give our customers better and faster information around which shipments could be impacted by these powerful storms. Coming out of our annual [hackamania event]({{ site.url }}{{ site.baseurl }}/culture/hackamania-4/) we were equipped with a mindset to think outside of the box and leverage the unique skills of team members across roles. 

Initially, the data science team located and ingested a source of hurricane data including a storm's predicted location up to five days in the future. The data science team cleaned and displayed this data and communicated the results to the full team, giving everyone a clear understanding of the available data including its capabilities and limitations.

After defining what could (and could not!) be done with the available data, a few brainstorming sessions took place to see what we could do to provide the most value given the available data and timing of an imminent hurricane season. Each role provided their needed expertise:
-	Business Analysts provided the business need: how do we determine which shipments would be in the path of the storm in the next 24, 48, 72 hours.
-	Data Scientists brought an intimate familiarity with the data and recognized that the business need could be satisfied by breaking the forecast into a series of regions, each representing the storm's forecasted position over a different period of time.
-	Software Engineers determined how we could relate shipments to the hurricane path segmentation, and what could feasibly be completed within our timeline.
-	UX Designers outlined how users would want to interact with the hurricane paths on the map and what they would expect to see.

From these sessions, we had a plan and a strong case, which allowed for a quick and easy approval from our stakeholders. Development started, and news of Hurricane Florence broke not soon after. We knew that we needed to get our new feature in the hands of customers so they could leverage it when the storm hit, and we were up for the challenge. After long hours of coding, all hands on deck testing, and a late, late night release, we had done it. We took an idea and saw it through from idea to production, through true collaboration, trust and dedication.

## Result

<figure>
	<img src="{{site.url}}{{site.baseurl}}/images/posts/2019/TropicalStormFlorence.jpg" alt="Navisphere Vision hurricane paths for Hurricane Florence."
	aria-label="Navisphere Vision's map view of Hurricane Florence and its projected path.">
	<figcaption>Hurricane path for Hurricane Florence in Navisphere Vision's map view.</figcaption>
</figure>

<figure>
	<img src="{{site.url}}{{site.baseurl}}/images/posts/2019/HurricaneMichaelPath.png" alt="Navisphere Vision hurricane paths for Hurricane Michael."
	aria-label="Navisphere Vision's map view of Hurricane Michael and its projected path.">
	<figcaption>Hurricane path for Hurricane Michael in Navisphere Vision's map view.</figcaption>
</figure>


This feature has been met with an abundance of positive feedback. One of our customers said, "By being able to see the projected tropical storm path, our customer and operations teams are able to proactively collaborate in assessing the impact and putting together a quality mitigation plan."

Following a successful launch, this feature has identified hundreds of shipments that were likely to be impacted by hurricanes before the hurricanes made landfall, giving our customers the visibility to proactively re-route or reschedule these shipments. Furthermore, given the success and positive feedback surrounding this feature, we've continued to refine it based on a continuously updated understanding of our customer's needs and our data's capabilities. We identified a need and collaborated as a team to build a solution that provided our customer value at a time when they needed it the most.
