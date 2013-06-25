---
layout: default
title: Self-Describing Tests
---

# Self-Describing Tests

A self-describing test is a test page that describes what the page should
look like when the test has passed. A human examining the test page can then
determine from the description whether the test has passed or failed.

## Examples

The following are some examples of self-describing tests, using common
techniques to identify passes:

* [Identical Renderings][1]

* [Green Background][2]

* [No Red 1][3]

* [No Red 2][4]

* [Described Alignment][5]

* [Overlapping][6]

* [Imprecise Description 1][7]

* [Imprecise Description 1][8]

## Advantages

Self-describing tests have some advantages:

  * They can be run easily on any layout engine.

  * They can test areas of the specifications that are not precise enough to
be comparable to a reference rendering. (For example, underlining cannot be
compared to a reference because the position and thickness of the underline
is UA-dependent.)

  * Failures can (should) be easily determined by a human viewing the test
without needing special tools.

## Disadvantages

They also have some disadvantages:

* They cannot be automated: a human must determine whether the test has
passed or failed.

* In some cases it is difficult or impossible to design the test for a
glaringly obvious pass or fail. (In these cases, if it's possible to create a
reference, the [reftest][9] format may be more appropriate.)

Self-describing tests must follow the [CSS test format guidelines][10].

Additional information on writing self-describing tests is available on the
[W3C site][11].

[1]: ./escapes-000.html
[2]: ./escapes-002.html
[3]: ./abspos-containing-block-003.html
[4]: ./border-conflict-w-079.html
[5]: ./margin-collapse-clear-007.html
[6]: ./table-anonymous-objects-021.html
[7]: ./border-style-inset-001.html
[8]: ./text-decoration-001.html
[9]: ./reftest-doc.html
[10]: http://wiki.csswg.org/test/format
[11]: http://www.w3.org/Style/CSS/Test/guidelines.html
