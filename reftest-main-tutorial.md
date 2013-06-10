---
layout: default
title: A RefTest
---

# A RefTest

Sometimes JavaScript is not able to determine whether or not a test passes or
fails. For example:

* Does a right-to-left rendering of "**SAW**" within a `BDO` element really
display as "**WAS**"?

* Does a newline in a `pre` element separate paragraphs for the purposes of
the Unicode bidirectional algorithm?

* What is the ordinal value of an ordered list's `li` element if its value
attribute is not explicitly set?

* Does the `type` attribute of an ordered list's `li` element really change
the numbering system used to label that `li` element?

However, even if JavaScript isn't able to judge the test result, it is still
**possible** to automate the test **IF** you are able to replicate the
expected result exactly, using a different approach than the technology being
tested.

Then, if the two pages render identically within a reftest testing harness,
the test is marked as _"pass"_.

More complicated reftests are possible as well, such as when multiple pages
need all to match each other, or when a page can match any of a number or
alternatives, or when two pages should definitely NOT match. For more
[comprehensive description of reftests][1], please go [here][1]

Here, we will demonstrate a simple example. Let's take the first question
from the list above: Does a right-to-left rendering of "**SAW**" within a
`BDO` element really display as "**WAS**"?

Remember, you can get the needed templates for this kind of test [here][2]
and [here][3]. When you name the file, just add the section information ahead
of the "reftest" string in the filename. Increment the 001 number as needed,
depending on how many reftests you need to make to test this particular piece
of the technology.

## The Test File

The Test File contains a lot of metadata about the test. It also uses markup
to explain the test to a potential human reader, in case the reftest is being
run manually as a stand-alone file rather than through a automated screenshot
comparison against its reference file. Then, it creates an example of the
technology being tested.

	<!DOCTYPE html>
	<html>
	<head>
	    <meta charset="utf-8">
	    <title>BDO element</title>
	    <link rel="author" title="dzenana"
	          href="mailto:dzenana.trenutak@gmail.com">
	    <link rel="help"
	          href="http://www.w3.org/html/wg/drafts/html/CR/text-level-
	                semantics.html#the-bdo-element">
	    <meta name="assert"
	          content="BDO element's DIR content attribute renders corrently
	                   given value of "rtl".">
	    <link rel="match" href="TEMPLATE-REFTEST-001.html">
	</head>
	<body>
	    <h1>Description</h1>
	    <p>This test validates the dir attribute of the bdo element.</p>

	    <p>The spec states:</p>
	    <blockquote>"If the element's dir attribute is in the rtl state,
	then for the purposes of the bidirectional algorithm, the user agent
	must act as if there was a U+202D LEFT-TO-RIGHT OVERRIDE character at
	the start of the element, and a U+202C POP DIRECTIONAL FORMATTING at the
	end of the element."</blockquote>

	    <p>This reftest verifies that the dir attribute behaves correctly
	given an "rtl" value.</p>
	    <p>A reftest is necessary because the intended effect is purely
	visual.</p>
	    <p>This reftest passes if you see WAS displayed below.</p>

	    <bdo dir="rtl">SAW</bdo>

	</body>
	</html>

## The Reference File

The reference file (hopefully) looks EXACTLY like the Test File, except that
the code behind it is different.

* The `assert` metadata is taken out.

* The `match` (or `mismatch`) metadata is optional (and changed to refer back
to the test file).

* All the introductory text needs to be the same, so as not to throw off the
automated screenshot comparison.

* However, the markup that created the actual test data is different: this
time, the same effect needs to be created with very mundane, dependable
technology.

	<!DOCTYPE html>
	<html>
	<head>
	    <meta charset="utf-8">
	    <title>BDO element</title>
	    <link rel="author" title="dzenana"
	          href="mailto:dzenana.trenutak@gmail.com">
	    <link rel="help"
	          href="http://www.w3.org/html/wg/drafts/html/CR/text-level-
	                semantics.html#the-bdo-element">
	    <link rel="match" href="TEMPLATE-REFTEST-001.html" />
	</head>
	<body>
	    <h1>Description</h1>
	    <p>This test validates the dir attribute of the bdo element.</p>

	    <p>The spec states:</p>
	    <blockquote>"If the element's dir attribute is in the rtl state,
	then for the purposes of the bidirectional algorithm, the user agent
	must act as if there was a U+202D LEFT-TO-RIGHT OVERRIDE character at
	the start of the element, and a U+202C POP DIRECTIONAL FORMATTING at the
	end of the element."</blockquote>

	    <p>This reftest verifies that the dir attribute behaves correctly
	given an "rtl" value.</p>
	    <p>A reftest is necessary because the intended effect is purely
	visual.</p>
	    <p>This reftest passes if you see WAS displayed below.</p>

	    <p>WAS</p>  

	</body>
	</html>

Many times, you will want to use CSS within your Reftests to control exactly
how different elements display, to force them to display like one another.

Here, for example, the margins, padding, and font-size of the `<bdo>` and
`<p>` elements need to be identical.

[1]: ./reftest-doc.html
[2]: ./template-reftest-001.html
[3]: ./template-reftest-002.html
