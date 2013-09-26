---
layout: docs
type: [reference]
title: FAQ
---

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

    The CSS Working Group has its own test infrastructure that pre-dated the move to GitHub. 
    It is tightly integrated with Mercurial, the W3C's former official (and now backup)
    revision control system. As such, the CSS WG's infrastructure requires some significant 
    updates to integrate seamlessly with Github without losing historical review and revision
    data captured by the old system. This work is currently scheduled to be completed by the 
    end of the 2013 calendar year (maybe sooner), at which time the CSS test repo will
    be merged into the main web-platform-tests repo.
        
*   **Who runs these tests?**
    
*   **Where are the stable tests?**


Test Development
----------------

*   **Can I submit new tests even if a test suite is marked as complete?**
    
*   **How to update a pull request with a new revision?**
    
*   **If a spec changes, how do impacted tests get updated and who is responsible for making the changes?**

*   **How can I fix a test?**

*   **What's a Reftest?**

    A reftest is the format the W3C prefers for tests that need a page's rendering to be verified.
    While it is preferable and most efficient to write tests in JavaScript using testharness.js, many
    features simply aren't verifiable without examining how they render on the page. Reftests are 
    particularly common in the CSS test suites as most of the CSS features are visual in nature. Reftests
    consist of 2 files: 1 file containing the test case and the feature being tested + one file that will 
    render identically to the test file but without using the tested feature. Reftests are typically run in
    an automated harness and all of the major browser vendors have support for automated reftests in 
    their test infrastructure. These harnesses load the two files natively on any platform, generate 
    screenshots, and perform an image comparison to verify the match. Thus, there is no need to maintain
    large libraries of platform-specific expected results and no need to write platform-specific code 
    in the tests. Full reftest documentation can be found [here][reftests] and reftest templates can be found
    [here][templates].
    
    
*   **How can I run reftests in an automated way?**
    Running automated reftests requires an external script or harness that has the ability to load each
    file in the browser, capture screenshots of the page, perform the image comparison, and report the 
    results. Several of the open source browsers have support for this in their test infrastructure, so
    if you obtain their source, you'll be able to run your tests in those browsers.

*   **Why shouldn't I write manual tests?**

*   **Can I use Qunit to write tests?**

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

    [Shepherd][shepherd] is the test suite management system used by the CSS Working Group to manage and track all 
    of the tests for the family of CSS specifications. It currently manages over 13,000 tests and their supporting
    assets. It is integrated with Mercurial, the W3C's official revision control system prior to its adoption of 
    GitHub in mid-2013. It has a rich set of features including per-spec, per-section test data, test review info 
    and status, and advanced search capabilities, allowing for test data to be filtered by spec, section, author,
    review, and many more granular options. It also has an API for extracting test data for use in reports and
    other systems. It is currently being updated to be integrated with GitHub and the work is scheduled to be done 
    by the end of the 2013 calendar year, possibly sooner.
    
    
    
[shepherd]: http://test.csswg.org/shepherd/
[reftests]: ./reftests.html
[templates]: ./test-templates.html



