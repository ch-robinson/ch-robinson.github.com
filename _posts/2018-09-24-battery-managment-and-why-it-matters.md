---
layout: article
title: "Battery Management and Why it Matters"
authors:
 - bradjewell
modified: 2018-09-24
categories: Mobile
excerpt: "At C.H. Robinson, our mobile team applies tools and practices to achieve the desired results of our mobile apps while conserving the user's battery. Our mission is to provide value to our end users while maintaining an undetectable impact to their battery and data usage."
tags: [Android, iOS, Battery, Background Processing]
image:
  feature:
  teaser:
  thumb:
disclaimer: true
series: mobile-apps-battery-management
---

Your phone notifies you that it has 15% power remaining, and you don't have a charging cable at hand. Are you breaking out in a sweat? Is your mind racing to find ways to charge your phone, or find a friend that can give you some power? Are you listing off what you'd be willing to give up in place of your phone? If you answered yes to any of these questions, know that you are not alone. More importantly, know that, as a mobile engineer, you have a responsibility to ensure your app isn't a contributing cause for such a scenario.

According to reports from [Tech Times](https://www.techtimes.com/articles/6928/20140514/dead-smartphone-battery-causes-stress-in-92-percent-of-britons.htm) and [The Wall Street Journal](https://www.wsj.com/articles/your-phone-is-almost-out-of-battery-remain-calm-call-a-doctor-1525449283), studies show users reporting or exhibiting stress, when separated from their phone due to dead batteries. If your users' stress levels don't concern you, consider this, your app can't run on a phone without power.

A large part of the [NavisphereCarrier](https://play.google.com/store/apps/details?id=com.chrobinson.navispherecarrier) and [NavisphereDriver](https://play.google.com/store/apps/details?id=com.chrobinson.navispherecarrier.driver) apps involve background processing to automate check calls for our users. Automating check calls and arrivals/departures allows our carriers to focus on doing business and leave the logistic tracking to us.

Customers wanting freight moved are demanding more visibility from their logistics providers. The trend is moving toward real-time tracking, but carriers drive for hours, if not days, to complete a load. Manually updating the customer is not a viable option. A mobile app can solve this problem, but the app needs to be efficient and send as few updates as the customer requires.

<figure>
	<img src="{{site.url}}{{site.baseurl}}/images/posts/2018/BatMan-MarketingBlank.jpg" alt="iPhones displaying NavisphereCarrier">
</figure>

The challenge is, background processing uses battery power when the app isn't in the foreground. On older OS versions, this could allow irresponsible apps to drain the battery. Current OS versions implement strict safeguards to protect the user's battery by disabling power hungry background processes. Disabling the app saves the battery, but may impede the results of the app. In both cases the solution is simple, we must create solutions that ensure we use as little battery as possible. It's what we call *"defending the battery."*

At C.H. Robinson, our mobile team applies tools and practices to achieve the desired results of our mobile apps while conserving the user's battery. Our mission is to provide value to our end users while maintaining an undetectable impact to their battery and data usage. We have had success in addressing our apps with a process derived from Test Driven Development. We **Measure**, **Manage**, and **Limit** processes.

1. Measure
    * Find or create a way to measure the situation
    * Measure the current process for a baseline
2. Manage
    * Make the process work as desired by your requirements
    * Measure the new process and compare to baseline
3. Limit
    * Optimize the process removing unnecessary processing
    * Measure the new process to verify improvement

Before we dive into what we are measuring or how to limit processing, we need to understand what the operating systems are doing. In this article we are going to focus on *background processing*, that is, processing that runs when your app is not in the foreground. Session count and session length are two important metrics that can aid you in determining when to optimize. We will focus on background processing, because it has the potential to occur often. If your app will have long running sessions, you may need to optimize foreground processing.

Android and iOS both have mechanisms to protect their users, but they work in different ways. Understand you probably won't be able to implement background processing the same way on iOS as you might in Android. One of the main ways Apple has protected its users from poor battery experiences is by limiting what it lets developers do in the background. Background processing exists for iOS, but it is more heavily regulated.

Before any of you Android fans get to excited, Google's position on background processing has changed significantly in the past several years. The [Google APIs](https://source.android.com/setup/start/build-numbers) of past used to follow the "with great power comes great responsibility" mindset. Changes to Android imply this responsibility wasn't taken seriously. We will come back to the history of Google's changes, but first let's finish talking about iOS.

## iOS

I mentioned earlier that iOS *limits what it lets developers do in the background*. This doesn't mean iOS *limits your user experience*. It's a fine distinction, but it is important to understand. For example, if you had a requirement to retrieve the latest headlines every 4 hours, you might have a hard time implementing that directly on device. As a developer, you have been limited.

Now consider what your *user* really wants. Your user might want faster launch times when opening the app. They may want to be notified of headlines as they become available. If you have a niche news app that provides hyper local news, your users may want to be notified of events that happened near their current location. The original requirement may be hard to implement, but the user experience is very achievable.

To update your app's data, for faster launch times, perhaps [Background App Refresh](https://developer.apple.com/documentation/uikit/core_app/managing_your_app_s_life_cycle/preparing_your_app_to_run_in_the_background/updating_your_app_with_background_app_refresh) will fit your needs. Your app can update its data in the background, but the operating system gets to decide when is a good time to refresh the data.

If you want headlines delivered as they become available, [APNs](https://developer.apple.com/library/archive/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/APNSOverview.html#//apple_ref/doc/uid/TP40008194-CH8-SW1) or a derivative, [Silent Push Notifications](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/pushing_updates_to_your_app_silently) can provide timely updates to the user or run small tasks. Push notifications add development and maintenance overhead, but you get more precise access to *when* the user gets the update.

If your app is location centric, [Core Location](https://developer.apple.com/documentation/corelocation) and [Significant-Change Location Service](https://developer.apple.com/documentation/corelocation/getting_the_user_s_location/using_the_significant_change_location_service) may provide the experience your users want.

These are just some of the options available to iOS engineers. Each solution has its benefits and drawbacks. Understanding the options and focusing on the user will increase your overall success in background processing.

## Android

Now that we understand how iOS guides our decisions by focusing on the user we can look at Android. On the surface Android appears to provide many more options for background processing. Looking at our original requirement of retrieving a news feed every four hours, we can accommodate this with the [Alarm Manager](https://developer.android.com/reference/android/app/AlarmManager), and you might think you were done... until QA gets ahold of the build.

Alarm Manager is indeed a viable option, up until [API 19](https://developer.android.com/about/versions/android-4.4) and possibly through [API 26](https://developer.android.com/about/versions/oreo/android-8.0). Prior to API 19, Alarm Manager would run your defined process at the time or time interval you specified. It was an alarm clock for your code, AWESOME! The problem is, when one device has numerous apps all firing different alarms at different times, your device is constantly being woke up. In API 19 Google made a change that made the alarm manager time interval more of a suggestion than a steadfast specification. The OS would group alarms that would fire off near one another. Some alarms would run longer than specified and some would fire earlier.

In [API 21](https://developer.android.com/about/versions/android-5.0), Google introduced the Job Scheduler. Where the Alarm Manager is Clark Kent, Job Scheduler is Superman. With the Job Scheduler you can now specify more than just what time you want a process to start. You can provide valuable criteria specifying the requirements your process needs. Now you can even schedule a process to only run when the device is connected to power and is on an unmetered network connection.

[Doze mode](https://developer.android.com/training/monitoring-device-state/doze-standby) was introduced in [API 23](https://developer.android.com/about/versions/marshmallow/android-6.0). Doze mode is the feature that will give your QA department the most headaches. If they don't have the [right ADB commands](https://developer.android.com/training/monitoring-device-state/doze-standby#testing_doze_and_app_standby) or access to [Battery Historian](https://github.com/google/battery-historian) it will be very difficult for them to consistently test. Doze mode will limit the execution of processes, started by alarm manager or job scheduler, when it determines a device is inactive. This may be great for your app, but if your app needs to be able to perform processing while a device isn't being actively used, it may interfere with your app. Like Apple, Google has not limited the experience for your users, you still have options.

Similar to iOS, you can use [push notifications](https://firebase.google.com/docs/cloud-messaging/concept-options#notifications_and_data_messages) and [data messages](https://firebase.google.com/docs/cloud-messaging/concept-options#notifications_and_data_messages) to provide users with information or trigger processing at specific times. Messages sent with high priority will pass through doze mode. Using this method provides the most control and precision for delivery, but increases development overhead. One additional benefit to data messages is the compatibility support. Google Cloud Messaging/Firebase Cloud Messaging is supported all the way back to [API 14](https://developer.android.com/about/versions/android-4.0).

Android also provides [location services](https://developer.android.com/training/location/) such as geofencing that can trigger processes.

The history lesson may not be thrilling, but it is important to understand for most production applications. Unless you are able to target a narrow range of Google APIs, your background processing will behave differently on different versions of Android. How these changes impact your development is dependent on your use case. If you want to update your app's content before the user opens your app, having your process trigger after doze mode exits will update your content closer to when your user might access it. Now your user will have content that is seconds to minutes old rather than minutes to hours old. If your user wants to periodically share location updates regardless of if they are actively using their device, doze mode may interfere with their experience.

## So what do I do?

We have covered history and considered the term limitations, so you might be wondering what to do next. The first thing to consider is, do you really need to do processing when your app isn't in the foreground? If you don't need it and it won't directly benefit your user, drop it. If it will benefit your user, *think like a user* and modify your requirements to fit the user's needs. When you are defining your requirements, *plan with both platforms in mind*. The Android and iOS implementation of your app may behave differently. Most of the time, that is fine, but *make sure your project stakeholders understand the differences*.
