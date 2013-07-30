---
layout: default
title: Reftest Documentation
---

# Reftest Documentation

A _reftest_ is a test that compares the visual output of one file 
(the test case) with the output of one or more other files (the 
references). Reftests can be scripted to run and report results 
automatically, for example, using WebDriver. 

## Components of a Reftest

A reftest has three parts:

### 1. The Reftest Test File ###

  The test file uses the technology to be tested. This file must
  follow the [test format guidelines][format-guidelines] and should 
  be designed considerating the 
  [test style guidelines][style-guidelines].

  It is preferable that a reftest is [self-describing][selfdesc], since it allows 
  for both machine comparison and manual verification.  Having the 
  expected rendering described on the page lets the tester 
  check that the test and the reference are not _both_ being 
  rendered incorrectly and triggering a false pass. Designing it for 
  an obvious fail makes it easier to find what went 
  wrong when the reftest does fail.

  If the test must perform some processing before a comparison can 
  be made to the reference, add `class=reftest-wait` to the root 
  element, and remove it when the comparison can be made.

### 2. The Reftest Reference File ###
  
  This is a different, usually simpler, file that results in the 
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

  In other cases, the specification under test may allow multiple 
  possible renderings. In this situation references must be supplied 
  for each allowed rendering.

  For example, if two reftests 
  `list-style-type-003.xht` and `list-style-type-004.xht` share 
  the same reference, that reference could be named 
  `list-style-type-003-ref.xht`.

3. **Reftest Comparison**
In order to designate which files are to be compared to the test 
file, and the nature of the comparison, the test file must have one
or more links to the reference files as described in the 
[test format][format-guidelines].

  * If multiple reference files must be matched, each reference file 
    should, in turn, link to the next reference.

  * If multiple renderings are conforming, each possible rendering 
    should have its own reference file linked from the test file.

  * In cases where it's likely for the test and the reference to 
    misrender identically, the test should also have one (or more) 
    mismatch references.

   One or more reference links that say which files are to be 
   compared and whether they are to render identically or differently
   . This is defined in the test file. For example:

``` html 
  <link rel="match" href="reference/background-color-ref.html" />
```

#### Simplified Reference Format

Like the format for the test file, the reftest reference format is 
also XHTML or HTML5 in UTF-8 with bitmap images in PNG format. 
Unlike the format for the test file, there is no metadata except for 
the [author credits][credits] and optional [reference links][
reference-links].

``` html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>CSS Reftest Reference</title>
    <link rel="author" title="NAME_OF_AUTHOR"
          href="mailto:EMAIL OR http://CONTACT_PAGE"/> 
    <style type="text/css">CSS FOR REFERENCE</style>
</head>
<body>
    CONTENT OF REFERENCE
</body>
</html>
```

## The Reftest Manifest

Note: The use of reftest manifest files in the test source  is 
      deprecated in favor of reference links.

The reftest manifest is a plain text file that lists test-reference 
pairs for comparison. The test build process produces reftest 
manifests as needed for input into testing tools.

Each line starts with `==` to indicate equality or `!=` to 
indicate inequality. This is followed by a space, the relative path 
to the test file, another space, and the relative path to the 
reference.

If a test has multiple `==` references then at least one of 
those references must match the test. If a test has multiple 
`!=` references, then none of those references may match the 
test. The reference file may also have entries in the manifest: in 
this case, the renderings of the references must match each other as 
well in order to consider the test as passed.

White space followed by `#` indicates the start of a comment that 
runs until the end of the line. A line starting with `#` is also 
a comment.

The reftest manifest should be named `reftest.list` and placed in the
`reference` subdirectory of the main test directory.

Here is an example of a reftest manifest.

    # reftest.list snippet
    == ../test-topic-000.xht test-topic-000-ref.xht
    == ../test-topic-001.xht test-topic-001-ref.xht
    == ../test-topic-002.xht test-topic-000-ref.xht # note same 
        reference as test 000

[Mozilla's manifest format][moz-manifest], which is more-or-less a 
superset of the W3C format, allows annotations such as whether the 
test is expected to pass or fail. These can be useful when setting 
up automated regression testing.


# Example Reftest

This is an example of a reftest that is a self-describing test:

### [TEST CASE][exampletest]

The test file applies a transform to an SVG element using `
translate(50 50)`. When transformed properly, a red element on 
the page will be hidden from view.

```html
<!DOCTYPE html>
<html>
<head>
    <title>CSS Transforms Test: SVG presentation attribute and translate with translation-value arguments without unit</title>
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
### [REFERENCE][exampleref]

The reference file achieves the intended rendering by using an 
svg element with and `x=50` and `y=50` and no `transform`.

```html
<!DOCTYPE html>
<html>
<head>
    <title>CSS Reftest Reference</title>
       <link rel="author" title="Rebecca Hauck" href="
       mailto:rhauck@adobe.com">
    <meta name="flags" content="svg">
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

In some cases, a test cannot be a reftest. For example, there is no 
way to create a reference for underlining, since the position and 
thickness of the underline depends on the UA, the font, and/or the 
platform. However, once it's established that underlining an inline 
element works, it's possible to construct a reftest for underlining 
a block element, by constructing a reference using underlines on a 
`<span>` that wraps all the content inside the block.

[selfdesc]: ./test-style-guidelines.html#self-describing
[exampletest]: http://test.csswg.org/source/contributors/adobe/submitted/svg-transform/translate/svg-translate-001.html
[exampleref]: http://test.csswg.org/source/contributors/adobe/submitted/svg-transform/translate/reference/svg-translate-ref.html
[format-guidelines]: ./test-format-guidelines.html
[style-guidelines]: ./test-style-guidelines.html
[credits]: ./test-templates.html#credits
[reference-links]: ./test-format-guidelines.html#reference-links
[moz-manifest]: http://mxr.mozilla.org/mozilla-central/source/layout/tools/reftest/README.txt
