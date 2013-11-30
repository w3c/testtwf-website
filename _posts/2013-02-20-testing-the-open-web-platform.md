---
layout: post
type: post
author: Tobie Langel
title: Testing the Open Web Platform
x-post: http://www.w3.org/QA/2013/02/testing_the_open_web_platform.html
---

As the Web has grown from a documentation sharing platform targeted essentially
at desktop users to a fully applicative one available on all kinds of devices,
so have its testing requirements. The test suites published by a number of W3C
Working Groups in order to move their specifications along the Recommendation
track are no longer sufficient. The kinds of applications built by developers
require a level of conformance, quality of implementation, performance and
interoperability that can only be guaranteed by much more thorough testing. In
truth, the testing requirements are such that a concerted effort involving the
industry as a whole is necessary in order to meet them. Unfortunately, so far,
our infrastructure has been cruelly lacking, which has really impeded any such
effort.

But this is about to change.

W3C is launching an unprecedented effort to scale up its test offering. And the
good news is this effort is backed up by significant financial and human
contributions from the W3C Membership. For the next year, my employer, Facebook,
will be covering my salary and expenses while I focus, full time, on driving
this effort at W3C. Some W3C Members have already committed human resources,
others are poised to contribute tests or significant financial support.

Over the course of the next year, we’re going to take a number of steps to
improve our testing infrastructure and documentation, simplify our processes,
and increase test coverage.

First, we’re going to move all tests to a central repository on GitHub. This
will be an opt-in process for Working Groups, so don’t expect change overnight.
A number of Working Groups have already moved or are about to do. Other groups
may require additional time, especially if they have invested in infrastructure
built on top of Mercurial. There will be migration costs, but I’m positive that
the benefits of a common repository, tooling, and processes will outweigh them.

Second, we’ll be streamlining test contribution and review processes. Writing a
test, getting it reviewed and approved shouldn’t be more complicated than
forking the repository on GitHub and making a pull request. There will still be
a contribution license, but the process for agreeing to the license will be
simpler than it is now.

Third, we’re creating a dedicated resource center for all things testing. There,
you will find documentation, tutorials, test coverage, browser support, and other
valuable data points, as well as information on how to download and run the test
suites locally.

Fourth, we are overhauling the test framework to cater for the different use
cases we’ve collected, such as running subsets of test suites or being able to
install a local copy of the framework to test prototype devices or unreleased
browsers. We will also set up an instance of the test framework on a public
server so you can run tests on various devices over the Web. And we’ll publish
test results to give developers a clear picture of support for a feature (e.g.
IndexedDB) or even a subset of a feature (e.g. blob support in IndexedDB).

Where will the tests come from? We are investigating more direct solutions to
increase test contributions and speed up reviews. Browser vendors are key
contributors in this area and we’ve started discussing ways to simplify
upstreaming their tests and syncing to our test repository. That's not a trivial
undertaking, so it could take some time before any of this is in place. Once set
up, however, this could be a significant step forward.

Developers have also become an important source of test cases, thanks to great
efforts such as [Test the Web Forward](http://testthewebforward.org/). We’d
like to see this trend continue and to foster a strong developer community
around testing. I hope that the full slate of improvements we are making will
move us in that direction.

It is also conceivable that we outsource the development of tests for some parts
of the platform, for example to meet a particular timetable (such as HTML5
becoming a Recommendation in 2014). The changes described above will also help
us manage this scenario more effectively.

There’s plenty more we’d like to tackle in the future (integration testing and
performance benchmarking immediately come to mind), but I think the above focus
is a solid starting point. I invite people to follow our work on the
[wiki](http://www.w3.org/wiki/Testing/) and our
[mailing list](http://lists.w3.org/Archives/Public/public-test-infra/). If you
or your organization want to help us in any way, please
[contact me](mailto:tobie@w3.org) either directly or through the mailing list.

This journey 1% finished.
