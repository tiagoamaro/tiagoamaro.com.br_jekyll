---
title: Google Tag Manager Organization Tips
layout: post
---

Everybody loves data. Analyzing data allows you to understand what's going around with your application/business, it being performance (Skylight, NewRelic), user experience (Hotjar) or marketing purposes (Google Analytics, Google Tag Manager).

> TL;DR [here's a quick link to the organization tips, so you can jump the introduction :)](#tips)

As developers know, marketing teams usually make an insane number of requests to add several tracking pixels on applications. I once worked in a company which had more than 60 tracking pixels being reported by my ad-blocker, and all of these tracking pixels were hardcoded on several templates. This inherited codebase was a classic case of "big ball of mud".

At the time, I decided to negotiate with the marketing team how we were going to avoid opening so many tickets related to marketing needs. It was time to extract the chaos to a separate application where they could control all their experiments without going through our (long) deployment cycle. I've decided to introduce Google Tag Manager (GTM).

Extracting tracking pixels to GTM was a wonderful move. Implementing a rich `dataLayer` allowed us to remove all hardcoded pixels, upgrade Google Analytics to universal analytics and remove unused trackers.

> If you don't know what the `dataLayer` is, check out [Google's official tutorial](https://developers.google.com/tag-manager/devguide) and [Simo Ahava's post about it](https://www.simoahava.com/analytics/data-layer/). If you have further questions around GTM, check Simo's posts. He's an expert on the analytics field and writes technical and non-technical posts about Google Analytics and GTM.

Since I've helped the marketing team with the migration, I also participated on GTM organization and coding, where custom tags, event triggering and `dataLayer` integration was needed. Here's the list of some tips gathered while implementing the GTM on the "big app":

## Tips

### Write defensive code on GTM

- Always expect the worst out of your objects and events. Elements, classes or objects from your `dataLayer` can always disappear out of nowhere

### Write vanilla ES5 JS

- Write the most compatible JS as possible. At the time of this writing, avoid ES6 features like arrow functions and `let` variable declarations
- Do not assume jQuery, underscore, or any other helper library you use at your website will be available for you at the time your GTM script is ready

### Don't add events on all pages

- Try to avoid using "All Pages" event on tags. You do not need all tracking pixels being loaded on the entire app
- Minimize the number of tags triggered per page. Loading GTM is heavy enough

### Create folders to organize tags and triggers

- Use GTM's workspace folders to categorize your tracking pixels. Example: everything related to the website `dataLayer` variables, will be organized inside the `dataLayer` folder

### Create a naming convention for triggers

- Give them action names like "Click on Offer"
- Use name modifiers if you have same actions on different elements, like "Click on Offer - Header"

### Create a naming convention for tags

- Name them after its meaning, detailing its goal. Examples: "Criteo Main JS", "Track Offer Click"
- Use name modifiers if you have the same goal but on a different element. Example: "Track Offer Click - Header"

### Do not enable all variables on GTM, unless you're going to use it

- Do not enable all GTM's "Built-in variables". This will increase GTM's loading time and its total size. Example: you can handle many click events with the "Click Element" variable, avoiding "Click Classes", "Click ID" and the "Click Target" variables

### Separate staging from production

- Use trigger exceptions to avoid fake data leaking to your analytics. Example: a trigger named after "On Staging Environment" which verifies if the current URL contains `staging` term

### Indent your code (please!)

- Select the code you want to indent on GTM's code editor and press `shift + tab` to auto-indent

### Bonus: debugging

- Use GTM [preview utility](https://support.google.com/tagmanager/answer/6107056). It's incredibly helpful, showing you all page loading events, triggered vs non-triggered tags and data being sent over the `dataLayer` in each event
    - Do not underestimate `console.log`, as it can be very useful on preview mode. Just remember to delete it before deploying a workspace
- Use an ad-blocker to measure performance overhead. Tracking pixels comes with a cost, but knowing which one is the culprit for slowing down your website is essential for future decisions
