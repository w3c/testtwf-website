---
layout: default
title: Reftest Documentation
---
# Reftest Documentation

**Table of Contents** 

- [Definition](#definition)
- [When to Write Reftests](#when-to-write)
- [How to Run Reftests](#how-to-run)
- [Components of a Reftest](#components)
  - [The Reftest Test File](#testfile)
  - [The Reftest Reference File](#reffile)
  - [The Reftest Comparison](#comparison)
- [Limitations](#limitations)
- [Example Reftests](#examples)
  - [HTML Example](#html)
  - [CSS Example](#css)
  - [SVG Example](#svg)

<span id="definition" class="toc"></span>
## Definition

A reftest is a test that compares the visual output of one file 
(the test case) with the output of one or more other files (the 
references). Reftests can be scripted to run and report results 
automatically, for example, using WebDriver. 

<span id="when-to-write" class="toc"></span>
## When to Write Reftests

Writing automated tests using [testharness.js][testharness] is great 
for covering many test cases that can be executed programmatically
and do not need to examine the page rendering. However, there are 
many cases when the page rendering is the only way to determine if a 
test passes. Reftests are usually best suited for CSS tests as many 
of its features are visual. HTML tests may also need to verify the 
rendering for things that cannot be asserted using JavaScript.

Here are some scenarios where you'd want to use a reftest for HTML:

* Does a right-to-left rendering of **SAW** within a `BDO` element 
  really display as **WAS**? (see example test for this case [
  below](#html))
* Does a newline in a `pre` element separate paragraphs for the 
  purposes of the Unicode bidirectional algorithm?
* What is the ordinal value of an ordered list's `li` element if its 
  value attribute is not explicitly set?
* Does the `type` attribute of an ordered list's `li` element really 
  change the numbering system used to label that `li` element?

<span id="how-to-run" class="toc"></span>
## How to Run Reftests

Reftests can be run manually simply by opening the test and the
reference file side by side and verifying that they render the same. 
The ability to do this helpful when debugging test failures, but 
running entire suites of tests manually is not optimal as takes too 
much time and is prone to human error.

Reftests are automatable using an external script or harness that 
can compare screenshots of the test and reference pages' 
renderings. All of the major browser vendors have support for 
automated reftests in their test infrastructure. In addition to 
being fast and efficient, running reftests in an automated harness 
also gives the most reliable results. Test failures with small 
mismatches of just a few pixels are sometimes not detectable by the 
human eye, whereas automated image comparison is precise.

<span id="components" class="toc"></span>
## Components of a Reftest

A reftest has three parts:

<span id="testfile" class="toc"></span>
### 1. The Reftest Test File ###

  The test file uses the technology to be tested. This file should follow the [format][format] and [style][style] guidelines.

  It is preferable that a reftest is [self-describing][selfdesc], 
  since it allows for both machine comparison and manual 
  verification.  Having the expected rendering described on the page 
  lets the tester check that the test and the reference are not 
  _both_ being rendered incorrectly and triggering a false pass. 
  Designing it for an obvious fail makes it easier to find what went 
  wrong when the reftest does fail.

  If the test must perform some processing before a comparison can 
  be made to the reference, add `class=reftest-wait` to the root 
  element, and remove it when the comparison can be made. The 
  external harness can then look for class="reftest-wait" (or a class
  attribute containing reftest-wait) on the root element before 
  taking a screenshot.  If reftest-wait is present, the screenshot 
  can be delayed until the attribute is removed.

<span id="reffile" class="toc"></span>
### 2. The Reftest Reference File ###
  
  This is a different, usually simpler file that results in the 
  same rendering as the test. The reference file must not use 
  the same features that are being tested, but uses a different 
  method to produce the same rendering as a test file. Sometimes 
  more than one reference file is required. Multiple tests can (and 
  often do) share the same reference file.

  File naming is important when creating reference files. References 
  should be named after the earliest test that uses them in the 
  `test-topic` series they belong to, and must have either 
  `-ref` or `-notref` appended to the name. Variations on a 
  reference can be denoted by appending additional suffixes after 
  `-ref` or `-notref`.  If present, such a suffix must either be 
  entirely numeric (i.e. `file-ref002.html`, or be separated by a 
  dash, i.e. `file-ref-a.html`). Depending on the test suite, they 
  may be placed in the `reference` subdirectory of the main test 
  directory or directly in the main test directory. If they are 
  placed in the `reference` subdirectory then the `-ref` or `-
  notref` suffix may be omitted from their filename.

  In some cases when creating the reference file, it is necessary to 
  use features that, although different from the tested features, 
  may themselves fail in such a manner as to cause the reference to 
  render identically to a failed test. When this is the case, in 
  order to reduce the possibility of false positive testing 
  outcomes, multiple reference files should be used, each using a 
  different technique to render the reference. One possibility is to 
  create one or more references that must **not** match the test 
  file, i.e.: a file that renders in the same manner as a failed 
  test.

  Reference files may be shared among many tests and this is very
  common, particularly in the CSS test suites. When writing a suite 
  of tests in a similar areas, it's recommended to enumerate the 
  filenames and name the reference file to match the first test in 
  the enumerated order that uses it.

  For example, if two reftests 
  `list-style-type-003.xht` and `list-style-type-004.xht` share 
  the same reference, that reference could be named 
  `list-style-type-003-ref.xht`.

<span id="comparison" class="toc"></span>
### 3. The Reftest Comparison ###

In order to designate which files are to be compared to the test 
file, and the nature of the comparison, the test file must have one
or more links to the reference files. The link metadata should also 
designate whether the files are to render identically or differently.

* If multiple reference files must be matched, each reference file 
  should, in turn, link to the next reference.

* If multiple renderings are conforming, each possible rendering 
  should have its own reference file linked from the test file.

* In cases where it's likely for the test and the reference to 
  misrender identically, the test should also have one (or more) 
  mismatch references.

Basic example:

``` html 
  <link rel="match" href="reference/background-color-ref.html" />
```

Reference link metadata as described in detail 
[here][reference-links].

<span id="limitations" class="toc"></span>
## Limitations

In some cases, a test cannot be a reftest. For example, there is no 
way to create a reference for underlining, since the position and 
thickness of the underline depends on the UA, the font, and/or the 
platform. However, once it's established that underlining an inline 
element works, it's possible to construct a reftest for underlining 
a block element, by constructing a reference using underlines on a 
```<span>``` that wraps all the content inside the block.

<span id="examples" class="toc"></span>
## Example Reftests

These examples are all [self-describing][self-desc] tests as they 
each have a simple statement on the page describing how it should 
render to pass the tests.

<span id="html" class="toc"></span>
### HTML example 

### Test File 

This is a test for the first example above in 
[When to Write Reftests](#when-to-write). It is testing that a right-
to-left rendering of **SAW** within a ```<bdo>``` element displays 
as **WAS**.

Here, the author has chosen to use markup to display the exact 
testable assertion the spec in addition to the expected result. 
Because this will get rendered on the page, it must therefore also 
be included in the reference file.

([view page rendering][html-reftest-example])

```html
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
          content="BDO element's DIR content attribute renders corrently given value of \"rtl\".">
  <link rel="match" href="TEMPLATE-REFTEST-001.html">
  </head>
  <body>
      <h1>Description</h1>
      <p>This test validates the dir attribute of the bdo element.
        </p>
        <p>The spec states:</p>
        <blockquote>"If the element's dir attribute is in the rtl 
            state, then for the purposes of the bidirectional 
            algorithm, the user agent must act as if there was a 
            U+202D LEFT-TO-RIGHT OVERRIDE character at the start of 
            the element, and a U+202C POP DIRECTIONAL FORMATTING at 
            the end of the element."</blockquote>
        <p>This reftest verifies that the dir attribute behaves 
            correctly given an "rtl" value.</p>
      <p>A reftest is necessary because the intended effect is 
            purely visual.</p>
      <p>This reftest passes if you see WAS displayed below.</p>
        <bdo dir="rtl">SAW</bdo>
</body>
</html>
```

### Reference File 

The reference file should look exactly like the test file, 
except that the code behind it is different.

* The `assert` metadata is taken out.
* The ```title``` is generic, as this file can and may be shared 
  among multiple tests
* The `match` (or `mismatch`) metadata not necessary
* The markup that created the actual test data is 
  different: here, the same effect is created with 
  very mundane, dependable technology.

([view page rendering][html-reffile-example])

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>HTML Reference File</title>
    <link rel="author" title="dzenana"
          href="mailto:dzenana.trenutak@gmail.com">
 </head>
<body>
    <h1>Description</h1>
    <p>This test validates the dir attribute of the bdo element.</p>
    <p>The spec states:</p>
    <blockquote>
    "If the element's dir attribute is in the rtl state,
     then for the purposes of the bidirectional algorithm, the user 
     agent must act as if there was a U+202D LEFT-TO-RIGHT OVERRIDE 
     character at the start of the element, and a U+202C POP 
     DIRECTIONAL FORMATTING at the end of the element."
     </blockquote>
     <p>This reftest verifies that the dir attribute behaves 
        correctly given an "rtl" value.</p>
     <p>A reftest is necessary because the intended effect is purely
     visual.</p>
     <p>This reftest passes if you see WAS displayed below.</p>
     <p>WAS</p>     
</body>
</html>
```

Many times, you will want to use CSS within your reftests to control 
exactly how different elements display, to force them to display 
like one another.

Here, for example, the margins, padding, and font-size of the 
```<bdo>``` and ```<p>``` elements need to be identical.


<span id="css" class="toc"></span>
### CSS Example 

### Test File 

This is an example testing the CSS property ```border-bottom``` 
applied to ```display: block```.

([view page rendering][css-reftest-example])

```html
<!DOCTYPE html>
<html>
<head>
  <title>CSS Test: Border-bottom applied to element with  display
         block</title>
  <link rel="author" 
        title="Microsoft" href="http://www.microsoft.com/" />
  <link rel="reviewer" 
        title="Gérard Talbot" href="http://www.gtalbot.org/BrowserBugsSection/css21testsuite/" /> <!-- 2012-05-18 -->
  <link rel="help" 
        href="http://www.w3.org/TR/CSS21/box.html#propdef-border-bottom" />
  <link rel="help" 
        href="http://www.w3.org/TR/CSS21/box.html#border-shorthand-properties" />
  <link rel="match" href="border-bottom-applies-to-001-ref.xht" />
  <meta name="flags" content="" />
  <meta name="assert" 
        content="The 'border-bottom' property applies to elements 
        with a display of block." />
  <style type="text/css">
    span
    {
      border-bottom: solid green 3px;
      display: block;
      width: 1in;
    }
  </style>
</head>
<body>
  <p>Test passes if there is a short horizontal green line.</p>
  <div>
    <span></span>
  </div>
</body>
</html>
```

### Reference File 

The reference file constructs the same rendering using a ```<div>``` 
and ```background-color: green```.

([view page rendering][css-reffile-example])

```html
<!DOCTYPE html>
<html>
<head>
  <title>CSS Reftest Reference</title>
  <link rel="author" title="Gérard Talbot" href="http://www.gtalbot.org/BrowserBugsSection/css21testsuite/" />
  <style type="text/css">
    div
    {
      background-color: green;
      height: 3px;
      width: 96px;
    }
  </style>
</head>
<body>
  <p>Test passes if there is a short horizontal green line.</p>
  <div></div>
</body>
</html>
```

<span id="svg" class="toc"></span>

### SVG Example 

### Test File 

This example tests applying a transform to an SVG element using `
translate(50 50)`. It uses a common [technique][indicating-failure] 
of using red to indicate failure. When transformed properly, a red 
element on the page will be hidden from view.

([view page rendering][svg-reftest-example])

```html
<!DOCTYPE html>
<html>
<head>
    <title>SVG Transforms Test: SVG presentation attribute and translate with translation-value arguments without unit</title>
    <link rel="author" title="Rebecca Hauck" href="mailto:rhauck@adobe.com">
    <link rel="help" href="http://www.w3.org/TR/css3-transforms/#svg-transform">
    <link rel="help" href="http://www.w3.org/TR/css3-transforms/#two-d-transform-functions">
    <link rel="help" href="http://www.w3.org/TR/css3-transforms/#translate-function">
    <link rel="help" href="http://www.w3.org/TR/css3-transforms/#svg-transform-value">
    <link rel="match" href="reference/svg-translate-ref.html">
    <meta name="flags" content="svg">
    <meta name="assert" content="The translate transform function 
    must support unit less arguments for translation-value. The rect 
    in the test should be moved 50 pixels in the X direction and 50 
    pixels in the Y direction">
    <style type="text/css">
    svg {
        width: 300px;
        height: 300px;
    }
    </style>
</head>
<body>
    <p>The test passes if there is a green square and no red.</p>
    <svg>
        <rect x="51" y="51" width="98" height="98" fill="red"/>
        <rect width="100" height="100" fill="green" transform="
         translate(50 50)"/>
    </svg>
</body>
</html>
```     
### Reference File 

The reference file achieves the intended rendering by using an 
svg element with and ```x=50``` and ```y=50``` and no 
```transform```.

([view page rendering][svg-reffile-example])

```html
<!DOCTYPE html>
<html>
<head>
    <title>SVG Reftest Reference</title>
       <link rel="author" title="Rebecca Hauck" href="
       mailto:rhauck@adobe.com">
    <style type="text/css">
    svg {
        width: 300px;
        height: 300px;
    }
    </style>
</head>
<body>
    <p>The test passes if there is a green square and no red.</p>
    <svg>
        <rect x="50" y="50" width="100" height="100" fill="green"/>
    </svg>
</body>
</html>
```

[testharness]: ./testharness-documentation.html
[format]: ./test-format-guidelines.html
[style]: ./test-style-guidelines.html
[selfdesc]: ./test-style-guidelines.html#self-describing
[reference-links]: ./test-templates.html#reference-links
[html-reftest-example]: ./html-reftest-example.html
[html-reffile-example]: ./html-reffile-example.html
[css-reftest-example]: http://test.csswg.org/source/approved/css2.1/src/borders/border-bottom-applies-to-009.xht
[css-reffile-example]: http://test.csswg.org/source/approved/css2.1/src/borders/border-bottom-applies-to-001-ref.xht
[svg-reftest-example]: http://test.csswg.org/source/contributors/adobe/submitted/svg-transform/translate/svg-translate-001.html
[svg-reffile-example]: http://test.csswg.org/source/contributors/adobe/submitted/svg-transform/translate/reference/svg-translate-ref.html
[indicating-failure]: http://127.0.0.1:4000/docs/test-style-guidelines.html#failure


