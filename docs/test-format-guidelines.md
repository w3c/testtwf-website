---
layout: default
title: Test Format Guidelines
---
**Table of Contents** 

  - [Test Format Guidelines](#test-format)
    - [Design Requirements](#design-requirements)
      - [Short](#short)
      - [Valid](#valid)
      - [Cross-platform](#cross-platform)
      - [Red Means Failure](#red-means-failure)
    - [Acceptable Test Formats](#acceptable-test-formats)
    - [File name format](#file-name-format)
    - [Support files](#support-files)
    - [User style sheets](#user-style-sheets)
    - [HTTP headers](#http-headers)


# Test Format Guidelines

This page describes the standard test format for [reftests][reftests] and [script tests][testharness-documentation]. The design requirements
are explained and to make things easier we've also provided several [templates][test-templates] you can copy.

If a test requires its page rendering to be verified, the
recommended structure is a self-describing reftest. Many CSS tests
use this structure as its functionality is often only verifiable
through its rendering. If it's possible for a test to be a reftest,
it must be a reftest. It is preferrable that reftests to also be 
self-describing or otherwise easy for humans to interpret, but this
is not a requirement. For tests that do not require a page rendering
verification, it is recommended to write them as [script tests][testharness-documentation].

<a name="design-requirements">
## Design Requirements

The following are requested of all tests submitted to the W3C.

<a name="short">
### Short

Tests should be very short and certainly not require scrolling on 
even the most modest of screens, unless the test is specifically for
scrolling or paginating behaviour. This enables them to be run more
easily on various testing platforms.

<a name="valid">
### Valid

Unless specifically testing error-recovery features, the tests 
should all be [valid][validator]. Inconsistencies in e.g. HTML parsing shouldn't 
be affecting CSS test suite pass rates.

<a name="cross-platform">
### Cross-platform

Tests should be as cross-platform as reasonably possible, working 
across different devices, screen resolutions, paper sizes, etc. 
Exceptions should document their assumptions.

<a name="red-means-failure">
### Red Means Failure

*_Reftests Only_*

Don't use the color red other than to indicate a failure. (
Exception: testing for support of red) Since green-with-no-red is 
often used to indicate success, it's best to also avoid green unless 
using the presence of red to indicate failures.

<a name="acceptable-test-formats">
## Acceptable Test Formats

The preferred submission format for tests is either XHTML or 
HTML5, in UTF-8. HTML < 5 is also acceptable, but it will be 
processed by an HTML5 compatible parser. SVG is also acceptable 
where necessary.

Note that in general, the test source will be parsed and re-
serialized, even in its source format. The re-serialization will 
cause minor changes to the test file, notably: attribute values will 
always be quoted, whitespace between attributes will be collapsed to 
a single space, duplicate attributes will be removed, optional 
closing tags will be inserted, and invalid markup will be normalized.
If these changes should make the test inoperable, for example if the 
test is testing markup error recovery, add the 
[flag][requirement-flags] 'asis' to prevent re-serialization. This 
flag will also prevent format conversions so it may be necessary to 
provide alternate versions of the test in other formats (XHTML, 
HTML, etc.)

Images must be in either PNG or SVG format. (PNG is preferred where 
raster images can be used.)

Some test suites will be run through a build process that may 
generate the various formats (XHTML, HTML, XHTML for Printers) 
from this source version.

Tests must be _valid_, so please [validate your tests][validator] 
before submission. For tests that use the HTML style header, the 
validator may report errors on the flags and assert metadata. These 
specific errors can be ignored - this is a known issue and work is 
in progress to correct the problem.

When using any characters beyond the ASCII set, in any encoding, the 
character encoding must be specified properly per the specification 
of the source format.

<a name="file-name-format">
## File name format

The file name format is ```test-topic-###.ext``` where ```test-
topic``` somewhat describes the test and ### is a zero-filled number 
used to keep the file names unique.

The file name is no longer restricted to 31 characters, but please 
try to keep them short.

The file name should not use the underscore ("_") character; please 
use the hyphen ("-") character instead.

**test-topic**

A short identifier that describes the test. The test-topic should 
avoid conjunctions, articles, and prepositions. It is a file name, 
not an English phrase: it should be as concise as possible.

Examples:
```
    margin-collapsing-###.ext
    border-solid-###.ext
    float-clear-###.ext
```

**###**

This is a zero-filled number used to keep the file names unique when 
files have the same test-topic name.

Note: The number format is limited to 999 cases. If you go over this 
number it is recommended that you reevaluate your test-topic name.

For example, in the case of margin-collapsing there are multiple 
cases so each case could have the same test-topic but different 
numbers:

```
    margin-collapsing-001.xht
    margin-collapsing-002.xht
    margin-collapsing-003.xht
```

There may also be a letter affixed after the number, which can be 
used to indicate variants of a test.

For example, ```float-wrap-001l.xht``` and ```float-wrap-001r.xht``` 
might be left and right variants of a float test.

If tests using both the unsuffixed number and the suffixed number 
exist, the suffixed tests must be subsets of the unsuffixed test.

For example, if ```bidi-004``` and ```bidi-004a``` both exist, 
```bidi-004a``` must be a subset of ```bidi-004```.

If the unsuffixed test is strictly the union of the suffixed tests, i
.e. covers all aspects of the suffixed tests (such that a user agent 
passing the unsuffixed test will, by design, pass all the suffixed 
tests), then the unsuffixed test should be marked with the combo flag
.

If ```bidi-004a``` and ```bidi-004b``` cover all aspects of ```bidi-
004``` (except their interaction), then bidi-004 should be given the 
combo flag.

**ext**

The file extension or format of the file, usually ```.xht``` for 
test files.

<a name="support-files">
## Support files

A number of standard images are provided in the support directory. 
These include:

* 1x1 color swatches
* 15x15 color swatches
* 15x15 bordered color swatches
* assorted rulers and red/green grids
* a cat
* a 4-part picture

Additional generic files can be added as necessary, and should have  
a descriptive file name. Just like other file name, support files' 
file name should not use the underscore ("_") character; use the 
hyphen ("-") character instead. Test-specific files should be named 
after the test (or test-topic if they are shared across several 
tests within a series). If possible tests should not rely on 
transparency in images, as they are converted to JPEG (which does 
not support transparency) for the xhtml1print version.

<a name="user-style-sheets">
## User style sheets

Some test may require special user style sheets to be applied in 
order for the case to be verified.

In order for proper indications and prerequisite to be displayed 
every user style sheet should contain the following rules.

``` css
#user-stylesheet-indication
{
   /* Used by the harness to display and indication there is a user 
   style sheet applied */
    display: block!important;
}
```

The rule ```#user-stylesheet-indication``` is to be used by any 
harness running the test suite.

A harness should identify test that need a user style sheet by 
looking at their flags meta tag. It then should display appropriate 
messages indicating if a style sheet is applied or if a style sheet 
should not be applied.

Harness style sheet rules:

``` css
#userstyle
{
    color: green;
    display: none;
}
#nouserstyle
{
    color: red;
    display: none;
}
```

Harness userstyle flag found:

``` html
<p id="user-stylesheet-indication" class="userstyle">A user style 
sheet is applied.</p>
```

Harness userstyle flag NOT found:

``` html
<p id="user-stylesheet-indication" class="nouserstyle">A user style 
sheet is applied.</p>
```

Within the test case it is recommended that the case itself indicate 
the necessary user style sheet that is required.

Examples: (code for the cascade.css file)

``` css
#cascade /* ID name should match user style sheet file name */
{
    /* Used by the test to hide the prerequisite */
    display: none;
}
```

The rule ```#cascade``` in the example above is used by the test 
page to hid the prerequisite text. The rule name should match the 
user style sheet CSS file name in order to keep this orderly.

Examples: (code for the cascade-### XHTML files)

``` html
<p id="cascade">
    PREREQUISITE: The <a href="support/cascade.css">
    "cascade.css"</a> file is enabled as the user agent's user style 
    sheet.
</p>
```

The id value should match the user style sheet CSS file name and the 
user style sheet rule that is used to hide this text when the style 
sheet is properly applied.

Please flag test that require user style sheets with the userstyle 
flag so people running the tests know that a user style sheet is 
required.

<a name="http-headers">
## HTTP headers

Some tests may require special HTTP headers. These should be 
configured in a .htaccess file located in the same directory as the 
relevant file. An example configuration is shown below. Note that 
multiple file extensions are supported in the configuration so that 
exported formats are all handled correctly. The build scripts will 
concatenate all .htaccess files in the test sources' parent 
directories and support directories.

``` html
<Files ~ "^lang-selector-005\.(xht|xhtml|xml|html|htm)$">
   AddLanguage fr .xht .xhtml .xml .html .htm
</Files>
```

Please flag tests that require HTTP interaction with the http flag 
so people running the tests locally know their results will not be 
valid.


[1]: ./selftest.html
[reftests]: ./reftests.html
[test-templates]: ./test-templates.html
[requirement-flags]: ./test-templates.html#requirement-flags
[testharness-documentation]: ./testharness-documentation.html
[validator]: http://validator.w3.org
