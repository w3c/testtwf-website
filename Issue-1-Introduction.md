---
layout: post
title: Introduction to Testing in W3C
---

# Introduction to Testing in W3C

There are a number of factors driving the need for a broad testing effort of the Open Web Platform. First of all, HTML WG is completing the HTML5 Candidate Recommendation, which needs to prove interoperability in order to advance to Recommendation. Thus it requires the development of a large test suite.

Secondly, the web platform has dramatically increased its complexity as it has shifted from a document exchange platform to a rich application environment that enables a wide variety of web applications. It also requires a concerted testing effort in order to achieve interoperability across different implementations of web platform.

Thirdly, as the scope and ecosystem of the web platform has expanded, so does the number and diversity of its stakeholders (mobile, automotive, TV, developers, etc.), which have increasingly pressing demands to push testing further into areas which bring them more value.

Therefore there is a need to organize the testing effort to understand, prioritize, and find resources to meet those different requirements.

W3C has organized Test The Web Platform program to serve the need of increasing testing effort on a broad spectrum of W3C specifications.

W3C’s testing philosophy includes Automatic Testing, Manual Testing and Referencing Testing.

Automatic Testing is always the preferred way for the majority of test assertions of W3C specifications. W3C’s Test Framework includes the combination of a Test Runner that can run testharness.js tests and a repository of test suites, and produces test reports.
Under certain circumstances, Manual Testing is inevitable for many reasons, for example:

* Sometimes, user agent technology protects its users by specifically preventing something from being automated - for example, printing, resizing windows
* Sometimes, you are testing offline behavior, so you may need to be temporarily disconnected from the testharness, etc.
A Manual Test Runner can help running manual tests and collect the test results.

Referencing Testing, a.k.a. Reftest, compares the visual output of one file with the output of one or more other files (the references). Reftests usually needs manual testing. However, Reftests maybe be fully automated in WebDriver-capable, or similar proprietary technology, browsers. Even if reftests is automated in a WebDriver-capable browser, the task cannot be done by simply visiting an URL. The test runner has to be installed locally to run ref tests using WebDriver. Note that WebDriver could also enable automated testing of certain accessibility specifications such as [WAI-ARIA], by providing access to the accessibility tree. 
