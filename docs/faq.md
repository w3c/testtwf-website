---
layout: docs
title: FAQ
---

FAQ
===

*   **What is goal of Test the Web Forward?**
    
    To improve interoperability of the Open Web Platform through testing.
    
*   **But isn't Test the Web Forward a series of events?**
    
    Originally, yes. Test the Web Forward started as a series of events led
    by Adobe to promote testing of the Open Web Platform. Mid-2013, Adobe donated
    the brand to W3C to serve as an umbrella brand for the whole Open Web
    Platform testing effort. So while Test the Web Forward events will continue
    to exist, they're now part of a larger project led by W3C which includes this
    documentation, the main test repository, tools, W3C staff, etc.
    
*   **Why are the CSS test suites in a separate repository?**
    
*   **Which browser vendor is running these tests?**
    
*   **Where are the stable tests?**


Test Development
----------------

*   **Can I submit new tests even if a test suite is marked as complete?**
    
*   **How to update a pull request with a new revision?**
    
*   **How can I fix a test?**

*   **What's a Reftest?**

*   **Why shouldn't I write manual tests?**

*   **Can I use Qunit to write tests?****

*   **What is the GitHub workflow?**

*   **Why can't I run `testharness.js` tests using the `file:` protocol?**
    
    In order to be able to run in multiple environments and communicate the test
    results to a framework running the tests, `testharness.js` decided on the
    following convention: every test file must link to a JavaScript file
    located at `/resources/testharnessreport.js`.

Test Review
-----------

*   **Who reviews and merges tests?**

*   **Do I need to satisfy all comments before the tests can be merged?**

*   **What is Critic?**

*   **What is Shepherd?**



