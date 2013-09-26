---
layout: docs
type: [bugs]
title: How to Report a Bug
sources:
  -
    author: fantasai
    title: How to File a Good Bug Report
    url: http://fantasai.inkedblade.net/style/talks/filing-good-bugs/

---
If a test fails, congratulations, you have just found a bug. It may be a
browser bug (aka an implementation bug), a bug in the specification, or an
issue with the test suite itself.

## What is a Useful Bug Report

Useful bug reports are ones that get bugs fixed. A useful bug report is...

1. Reproducible - If an engineer can't see it or conclusively prove that it
exists, the engineer will probably stamp it "WORKSFORME" or "INVALID", and
move on to the next bug.
2. Specific - The quicker the engineer can trace down the issue to a specific
problem, the more likely it'll be fixed expediently.

So the goals of a bug report are to:

* Pinpoint the bug
* Explain it to the developer

Your job is to figure out exactly what the problem is.

## Bug Reporting General Guidelines

* Avoid duplicates: Search before you file!

* Always test the latest available build.

* One bug per report.

* State useful facts, not opinions or complaints.

* Flag security/privacy vulnerabilities as non-public.

## How to Write a Good Bug Report

A good bug report should include the following information:

### Summary

The goal of summary is to make the report searchable and uniquely
identifiable.

A bad example: `Drag Crash`

A good Example: `Drag-selecting any page crashes Mac builds in NSGetFactory`

### Overview/Description

The overview or description of a bug report is to explain the bug to the
developer, including:

* Abstracted summary of behavior (e.g. interpretation of test failures)

* Justifications of why this is a bug

* Any relevant spec links

* Interpretation of the spec

* Information on other implementations 

### Steps to Reproduce

The goal of reproducible steps is to teach developer to recreate the bug on
his own system. It may be as simple as `Load the attached testcase in Browser
XYZ`. A more complex case may involve multiple steps, such as:

_Step 1: Load the attached testcase in Browser XYZ_

_Step 2: Scroll to the bottom of the page_

_Step 3: Click the link_

_Step 4: Press tab to navigate links_

### Test Results

The test results, including _Expected Result_ and _Actual Result_, will show
the developer what's wrong. _Expected Result_ describes what should have
happened, and _Actual Result_ describes what actually happened.

### Reduced Test Case

The goal of test case is to pinpoint the bug. A _Reduced Test Case_ rips out
everything in the page that is not required to reproduce the bug. Also try
variations on the test case to find related situations that also trigger the
bug.

### Environment Setup and Configuration

Please also include the environment setup and configuration information, such
as OS, system build and platform etc.

### Any additional Information

Include any additional information such as URL, crash data, regression range
etc.

Attach all relevant files

## Where to Report a Browser Bug

You need to go to vendor's bug reporting website to report a bug of browser.

* [Mozilla's Bugzilla][1]
* [WebKit Bugzilla][2]
* [Chrome Bugs][3]
* [Opera Bug Report Wizard][4]
* [IE Bugs][5]

* Other browsers - please check vendor's website for bug reporting
information

## Where to Report a Bug of W3C Specification

If the bug is related to W3C specification, you need to go to [W3C Bugzilla][6]
to report this bug.

## Where to Report a Bug of a Test Itself

You need to follow Github's normal workflow and use "issues" to report a bug of a test itself.

[1]: https://bugzilla.mozilla.org/
[2]: https://bugs.webkit.org/
[3]: http://crbug.com
[4]: https://bugs.opera.com/wizard/
[5]: http://connect.microsoft.com/IE
[6]: https://www.w3.org/Bugs/Public/
