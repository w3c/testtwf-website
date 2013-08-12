---
layout: default
title: FAQ
---

FAQ
===

*   **Why can't I run `testharness.js` tests using the `file:` protocol?**
    
    In order to be able to run in multiple environments and communicate the test
    results to a framework running the tests, `testharness.js` decided on the
    following convention: every test file must link to a JavaScript file
    located at `/resources/testharnessreport.js`.
    
*   **Why are the CSS test suites in a separate repository?**
    
*   **Which browser vendor is running these tests?**
    
*   **What is the goal of github/web-platform-tests?**
    
*   **Where are the stable tests?**


Test Development
----------------

*   **Can I submit new tests even if a test suite is marked as complete?**
    
*   **How to update a pull request with a new revision?**
    
*   **How can I fix a test?**

*   **What's a Reftest?**

*   **Why shouldn't I write manual tests?**

*   **Can I use Qunit to write tests?****


Test Review
-----------

*   **Who reviews and merges tests?**

*   **Do I need to satisfy all comments before the tests can be merged?**

