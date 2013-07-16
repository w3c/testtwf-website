---
layout: default
title: Self Describing Tests
---

# Self Describing Tests

A self-describing test is a test page that describes what the page 
should look like when the test has passed. A human examining the 
test page can then determine from the description whether the test 
has passed or failed.

The following are some examples of self-describing tests, using 
common techniques to identify passes:

* [Identical Renderings][1]
* [Green Background][2]
* [No Red 1][3]
* [No Red 2][4]
* [Described Alignment][5]
* [Overlapping][6]
* [Imprecise Description 1][7]
* [Imprecise Description 2][8]

Self-describing tests have some advantages:

* They can be run easily on any layout engine.
* They can test areas of the spec that are not precise enough to be 
  comparable to a reference rendering. (For example, underlining 
  cannot be compared to a reference because the position and 
  thickness of the underline is UA-dependent.)
* Failures can (should) be easily determined by a human viewing the 
  test without needing special tools.

They also have some disadvantages:

* Unless they are made into [reftests][9], they cannot be automated: 
  a human must determine whether the test has passed or failed.
* In some cases it is difficult or impossible to design the test for
  a glaringly obvious pass or fail. (In these cases, if it's 
  possible to create a reference, a non-self describing [reftest][9] 
  may be more appropriate.)

Self-describing tests must follow the [test format guidelines][10].

Additional information on writing self-describing tests is available 
on the [W3C site][11].

[1]: http://www.w3.org/Style/CSS/Test/CSS2.1/20100127/html4/escapes-000.htm
[2]: http://www.w3.org/Style/CSS/Test/CSS2.1/20100127/html4/escapes-002.htm
[3]: http://www.w3.org/Style/CSS/Test/CSS2.1/20100127/html4/abspos-containing-block-003.htm
[4]: http://www.w3.org/Style/CSS/Test/CSS2.1/20100127/html4/border-conflict-w-079.htm
[5]: http://www.w3.org/Style/CSS/Test/CSS2.1/20100127/html4/margin-collapse-clear-007.htm
[6]: http://www.w3.org/Style/CSS/Test/CSS2.1/20100127/html4/table-anonymous-objects-021.htm
[7]: http://www.w3.org/Style/CSS/Test/CSS2.1/20100127/html4/border-style-inset-001.htm
[8]: http://www.w3.org/Style/CSS/Test/CSS2.1/20100127/html4/text-decoration-001.htm
[9]: ./reftests.html
[10]: ./test-format-guidelines.html
[11]: http://www.w3.org/Style/CSS/Test/guidelines.html