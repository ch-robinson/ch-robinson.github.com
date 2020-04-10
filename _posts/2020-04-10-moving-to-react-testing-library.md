---
layout: article
title: Moving to React Testing Library
authors:
 - brianmitchell
 - vangjef
categories: [technology]
excerpt: >
  At C.H. Robinson, we continuously strive to keep in line with industry and community best practices and patterns. React Testing Library has come to be the next generation standard for testing React applications. We made a change to our templates to use this and want to share why we think this is a better approach for testing.
tags: [React]
disclaimer: true
---

At C.H. Robinson, we continuously strive to keep in line with industry and community best practices and patterns. React Testing Library has come to be the next generation standard for testing [React](https://reactjs.org/) applications. We made a change to our templates to use this and want to share why we think this is a better approach for testing.

## Where We're Coming From

Since [introducing React](https://engineering.chrobinson.com/technology/react-at-ch-robinson/) into our technology matrix, we have provided configurations and examples for testing our applications with [Enzyme](https://enzymejs.github.io/enzyme/). Enzyme provides APIs around shallow and full rendering components and has utilities for getting a handle on class component state, custom methods, and React component lifecycle methods. This allows developers to test logic inside their components, but also have the flexibility to use different testing ideologies, such as exclusively interacting with components through the render tree.

## What is Happening?

In the past year, not only the React community, but also the official [React docs](https://reactjs.org/docs/testing.html#tools) and [Create React App](https://github.com/facebook/create-react-app/pull/7881) have moved to recommend and provide default configuration for [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) (RTL). We want to keep with the greater React community and have made changes to add it for all new React applications. Our current React template and associated tooling, which is an extension of [react-scripts](https://www.npmjs.com/package/react-scripts) (part of Create React App), is now utilizing RTL as the default testing library over Enzyme.

## React Testing Library

React Testing Library is a set of utilities that wrap around [react-dom](https://www.npmjs.com/package/react-dom) and react-dom/test-utils to render components to the DOM for testing. It was created by Kent C. Dodds, a React educator and open-source developer, who is notable for creating [Downshift](https://github.com/downshift-js/downshift), [cross-env](https://github.com/kentcdodds/cross-env), [all-contributors](https://github.com/all-contributors/all-contributors), [babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros), and [Testing Library](https://testing-library.com/) (of which React Testing Library is a part). He wrote a great [introduction post](https://kentcdodds.com/blog/introducing-the-react-testing-library) to RTL that we recommend you read if you aren't familiar.

### Testing the Latest React Features

React is continually evolving and releasing new features. Historically speaking, Enzyme has tended to lag in updating their utilities to handle these new features. RTL, conversely, is a much thinner wrapper around React's native testing utilities, so it doesn't need to be updated as new features are released. In practice, this means that as React releases features like Context, hooks, and Suspense, we can use these features right away and effectively test them faster, more reliably, and with more confidence.

### Paradigm Shift from Implementation to Usage

RTL renders components to the DOM, so to test them, you must interact with a rendered component through the DOM as a user would. You cannot "peek" inside the state or implementation of your component like you can with Enzyme. This brings benefits to our tests:

- Avoids testing implementation details
- Tests the integration of components with each other
- Tests are user driven
- Encourages more accessible components
- Keeps our tests resilient to changes in our components' implementations (the best test is one that still passes when nearly rewriting a component, provided it renders a similar tree)
RTL is a small wrapper around DOM Testing Library, which is a set of utilities to get DOM nodes based on query functions, such as:
- Text content
- Placeholder
- Alt text
- Title
- Display value
- Role
- Label (including aria-label)
- The `data-testid` attribute

Getting a handle on elements through these queries encourages well-labeled and accessible UIs through setting element attributes, which also makes tests easier to write. A good practice to approach testing is from the perspective of how a user would interact with our application. For example, seeing the label "Order Number" above a text input would inform that user that the input is for "Order Number." When testing this component, you could query by the label "Order Number" and enter text into the corresponding input, much like how a user searches for a label, then enters text in the input connected to that label. This is user driven testing. Setting other attributes on elements can make an application more accessible and easier to test with the provided queries.

A benefit of testing what a component renders means that using a class or functional (with hooks) component is an implementation detail. When compared to Enzyme's `shallow`, RTL makes testing function components with hooks easier. It may be nearly impossible to get coverage on your lines and branches of code with testing each component in isolation, depending on how you build your application and the interoperability of the components. We've found that this means we often don't have [a test per component](https://kentcdodds.com/blog/write-fewer-longer-tests), but more per section or page of an application, as long as we test the use cases of that tree of components. This might sound more like end-to-end testing, but network calls and browser state are still mocked, so they are integration tests and still closer to unit tests. This being said, there is still a place for unit tests. Moving helper logic to pure utility functions makes components cleaner and easier to understand, and the difficult logic can still be unit tested and cover every branch and use case.

## What about Shallow Rendering?

Short answer: you can't!* :smile:

RTL is built around the idea of treating your components as a black box and testing that component's API (consuming props and context and returning a render tree). All components render and work together when you run your application in a browser. Although shallow rendered components in tests are isolated, they could continue to pass even if your application would break.

Testing implementation details can lead to [false positives and false negatives](https://kentcdodds.com/blog/testing-implementation-details) and make your tests more prone to breaking when you change the component over time. Using RTL or Enzyme's `mount` renders the entire component tree. This can make your tests more resilient to implementation changes, and it tests the relationships between components in the same way they would when running the application. Enzyme's utilities, especially `shallow`, make it easy to slip into the mindset of testing implementation details rather than the component's API, while also overlooking the component's inherent coupling to its children.

\* If you need to "not render" the children of a component, you can always [`jest.mock`](https://jestjs.io/docs/en/jest-object#jestmockmodulename-factory-options) it and move on with life. This becomes painful to maintain, so don't go overboard.

## Summary

Moving to React Testing Library is a result of continued adoption of current best practices and standards. Using RTL encourages a new mindset to write our React applications in a more user-driven and accessible manner. It also helps us avoid testing implementation details, a practice that, with frequent updates to source, slows us down in the long run. Taking a step back to improve our process and efficiency helps us to continue fostering a culture of engineering focus and innovation.
