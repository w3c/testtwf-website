---
layout: default
title: Test Format
---
**Table of Contents** 

  - [Test Format](#test-format)
    - [Design Requirements](#design-requirements)
      - [Short](#short)
      - [Valid](#valid)
      - [Cross-platform](#cross-platform)
      - [Red Means Failure](#red-means-failure)
    - [Acceptable Test Formats](#acceptable-test-formats)
    - [Template for New Tests](#template-for-new-tests)
    - [Template Details](#template-details)
      - [Title element](#title-element)
      - [Credits](#credits)
      - [Reviewer](#reviewer)
      - [Specification Links](#specification-links)
      - [Reference Links](#reference-links)
      - [Requirement Flags](#requirement-flags)
      - [Test Assertions](#test-assertions)
      - [Style Element (embedded styles)](#style-element-embedded-styles)
      - [Script Element (embedded script)](#script-element-embedded-script)
      - [''body'' Content](#body-content)
    - [File name format](#file-name-format)
    - [Support files](#support-files)
    - [User style sheets](#user-style-sheets)
    - [HTTP headers](#http-headers)


# Test Format

This page describes the standard test format for [self-describing tests][1], [reftests][2], and [script tests][3]. The requirements are explained below; to make things easier we've also provided a template that you can copy.

If a test requires its page rendering to be verified, the recommended structure is a self-describing reftest. Many CSS tests use this structure as its functionality is often only verifiable through its rendering. If it's possible for a test to be a reftest, it must be a reftest. It is preferrable that reftests to also be self-describing or otherwise easy for humans to interpret, but this is not a requirement. For tests that do not require a page rendering verification, it is recommeded to write them as [script tests][3].

## Design Requirements

The following are requested of all tests submitted to the W3C for [reftests][1], [script tests][3], and [self-describing tests][2]:

### Short

Tests should be very short and certainly not require scrolling on even the most modest of screens, unless the test is specifically for scrolling or paginating behaviour. This enables them to be run more easily on various testing platforms.

### Valid

Unless specifically testing error-recovery features, the tests should all be valid. Inconsistencies in e.g. HTML parsing shouldn't be affecting CSS test suite pass rates.

### Cross-platform

Tests should be as cross-platform as reasonably possible, working across different devices, screen resolutions, paper sizes, etc. Exceptions should document their assumptions.

### Red Means Failure

Don't use the color red other than to indicate a failure. (Exception: testing for support of red) Since green-with-no-red is often used to indicate success, it's best to also avoid green unless using the presence of red to indicate failures.

## Acceptable Test Formats

The preferred submission format for CSSWG tests is either XHTML or HTML5, in UTF-8. HTML < 5 is also acceptable, but it will be processed by an HTML5 compatible parser. SVG is also acceptable where necessary.

Note that in general, the test source will be parsed and re-serialized, even in its source format. The re-serialization will cause minor changes to the test file, notably: attribute values will always be quoted, whitespace between attributes will be collapsed to a single space, duplicate attributes will be removed, optional closing tags will be inserted, and invalid markup will be normalized. If these changes should make the test inoperable, for example if the test is testing markup error recovery, add the [flag](#requirement-flags) 'asis' to prevent re-serialization. This flag will also prevent format conversions so it may be necessary to provide alternate versions of the test in other formats (XHTML, HTML, etc.)

Images must be in either PNG or SVG format. (PNG is preferred where raster images can be used.)

A set of scripts will generate the various formats (XHTML, HTML, XHTML for Printers) from this source version.

Tests must be _valid_, so please [validate your tests][4] before submission. For tests that use the HTML style header, the validator may report errors on the flags and assert metadata. These specific errors can be ignored - this is a known issue and work is in progress to correct the problem.

When using any characters beyond the ASCII set, in any encoding, the character encoding must be specified properly per the specification of the source format.

__If the test uses the Ahem font, make sure its computed font-size is a multiple of 5px__, otherwise baseline alignment may be rendered inconsistently (due to rounding errors introduced by certain platforms' font APIs). We suggest to use a minimum computed font-size of 20px.

Eg. Bad: 

```{font: 1in/1em Ahem;}  /* Computed font-size is 96px */```
```{font: 1in Ahem;}```
```{font: 1em/1em Ahem} /* with computed 1em font-size being 16px */ ```
```{font: 1em Ahem;} /* with computed 1em font-size being 16px */```

Eg. Good: 

```{font: 100px/1 Ahem;}```
```{font: 1.25em/1 Ahem;} /* with computed 1.25em font-size being 20px */```

__If the test uses the Ahem font, make sure the line-height on block elements is specified; avoid 'line-height: normal'__. Also, for absolute reliability, the difference between computed line-height and computed font-size should be dividable by 2.

Eg. Bad: 

```{font: 1.25em Ahem;} /* computed line-height value is 'normal' */```
```{font: 20px Ahem;} /* computed line-height value is 'normal' */```
```{font-size: 25px; line-height: 50px;} /* the difference between computed line-height and computed font-size is not dividable by 2. */```

Eg. Good: 

```{font-size: 25px; line-height: 51px;} /* the difference between computed line-height and computed font-size is dividable by 2. */```

## Template for New Tests

A template for new tests follows. Copy and paste the code below into a new file and replace the bracketed parts as described below.

```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
 <head>
  <title>CSS Test: [Title/Scope of Test]</title>
  <link rel="author" title="[Name of Author]" href="[mailto: or http: contact address]" />
  <link rel="help" href="http://www.w3.org/TR/[direct link to tested spec section]" />
  <meta name="flags" content="[requirement flags]" />
  <meta name="assert" content="Test checks that [explanation of what you're trying to test]." />
  <style type="text/css"><![CDATA[
   [CSS for test]
  ]]></style>
 </head>
 <body>
  <p>Test passes if [description of pass condition].</p>
  [Content of test]
 </body>
</html>
```
Alternatively, you can use this HTML5 template:

```
<!DOCTYPE html>
<title>CSS Test: [Title/Scope of Test]</title>
<link rel="author" title="[Name of Author]" href="[mailto: or http: contact address]">
<link rel="help" href="http://www.w3.org/TR/[direct link to tested section]">
<meta name="flags" content="[requirement flags]">
<meta name="assert" content="Test checks that [explanation of what you're trying to test].">
<style>
   [CSS for test]
</style>
<body>
  <p>Test passes if [description of pass condition].</p>
  [Content of test]
</body>
```


## Template Details

### Title element
```
<title>CSS Test: SCOPE OF TEST</title>
```
  The title appears in the generated index, so make sure it is concise, unique and descriptive. The role of the title is to identify what specific detail of a feature or combination of features is being tested, so that someone looking through an index can see quickly what's tested in which file. In most cases, this description should not require more than 5 or 6 words. There is no need to provide the chapter or section in the title.

Bad example:
```
<title>CSS Test: Border Conflict Resolution</title>
```
_Note: We have 100+ tests on “Border Conflict Resolution_

Good example:
```
<title>CSS Test: Border Conflict Resolution (width) - hidden/double</title>
```

For CSS specifications other than CSS 2.1, you can include the module name somewhere before the colon, like ''CSS Selectors Test:'' or ''CSS Test (Selectors):''. Do not include the module version number, since the test might get reused for the next version.

### Credits

```
<link rel="author" title="NAME_OF_AUTHOR" href="mailto:EMAIL OR http://CONTACT_PAGE" />
```

Credits provide a way to identify the person or organization that created the test and/or holds copyright in the test. This is useful for reviewing purposes and for asking questions about the individual test. A test can have multiple author credits if necessary.

Example 1:
```
<link rel="author" title="Boris Zbarsky" href="mailto:bzbarsky@mit.edu" />
```
Example 2:
```
<link rel="author" title="Bert Bos" href="http://www.w3.org/People/Bos/" />
```
Example 3:
```
<link rel="author" title="Microsoft" href="http://microsoft.com/" />
```


### Reviewer

```
<link rel="reviewer" title="NAME_OF_REVIEWER" href="mailto:EMAIL OR http://CONTACT_PAGE" /> <!-- YYYY-MM-DD -->
```
If a test has passed review, then the reviewer should note this by adding his or her name as a reviewer, along with the date of the review. A test can have multiple reviewers if necessary. A reviewer must be a person, not an organization.

Example 1:
```
<link rel="reviewer" title="Boris Zbarsky" href="mailto:bzbarsky@mit.edu" /> <!-- 2008-02-19 -->
```
Example 2:
```
<link rel="reviewer" title="Bert Bos" href="http://www.w3.org/People/Bos/" /> <!-- 2005-05-03 -->
```

If a test would pass review with some (non-metadata) changes and the reviewer chooses to make these changes, then the reviewer should add his or her name as a reviewer-author, along with the date of the review, when checking in those changes. This indicates that the reviewer-author approves of the original author's test when taken with these proposed changes, and that someone else (possibly the original author) must review the changes. The test is fully reviewed only when the latest reviewer did not also contribute changes to the test at the time of the review.

Example of a fully-reviewed test:
```
<link rel="author" title="Bert Bos" href="http://www.w3.org/People/Bos/" />
<link rel="reviewer author" title="Boris Zbarsky" href="mailto:bzbarsky@mit.edu" /> <!-- 2008-02-19 -->
<link rel="reviewer" title="Bert Bos" href="http://www.w3.org/People/Bos/" /> <!-- 2008-04-22 -->
```
This test was written by Bert Bos, then reviewed by Boris Zbarsky, who made some corrections before deeming it acceptable. Those corrections were then reviewed and accepted by Bert Bos.

### Specification Links

Specification Links

```
<link rel="help" href="RELEVANT_SPEC_SECTION" />
```
The specification link elements provide a way to align the test with information in the specification being tested.

* Links should link to relevant sections within the specification
* Use the anchors from the specification's Table of Contents
* A test can have multiple specification links
  * Always list the primary section that is being tested as the first item in the list of specification links
  * Order the list from the most used/specific to least used/specific
  * There is no need to list common incidental features like the color green if it is being used to validate the test unless the case is specifically testing the color green
* If the test is part of multiple test suites, link to the relevant sections of each spec.

Example 1:
```
<link rel="help" href="http://www.w3.org/TR/CSS21/text.html#alignment-prop" />
```
Example 2:
```
<link rel="help" href="http://www.w3.org/TR/CSS21/text.html#alignment-prop" />
<link rel="help" href="http://www.w3.org/TR/CSS21/visudet.html#q7" />
<link rel="help" href="http://www.w3.org/TR/CSS21/visudet.html#line-height" />
<link rel="help" href="http://www.w3.org/TR/CSS21/colors.html#background-properties" />
```


### Reference Links

```
<link rel="match" href="RELATIVE_PATH_TO_REFERENCE_FILE" />
<link rel="mismatch" href="RELATIVE_PATH_TO_REFERENCE_FILE" />
```
The reference link elements are used in [reftests][1] and provide the list of reference file(s) that the test should be compared to.

* ```match``` references must be files that render identically to the test, but use an alternate means to do so
* Multiple match references are used when the test can match any of the reference files
  * If a test requires multiple match references that all need to match (for example, to catch when a reference fails in the same way the test does), then chain the references together, i.e.: place reference links to the additional match references in the reference files. It is recommended that the chained reference files form a loop (e.g.: a → b → c → a) so that a test linking to any reference in the chain will find all the references.
* ```mismatch``` references are files that render differently than the test file. A test may have any number of mismatch references. The test is considered to fail if it renders the same as any of the mismatch references.
  * Note that reference files may themselves have mismatch references. In that case the reference file must not render the same as any of its mismatch references in order to be considered valid. If a reference is considered invalid (by the fact of not matching any of its match references, or matching any of its mismatch references), then a test that refers to the reference will be considered to have failed.
* Reference files may be dedicated reference files, images, or other tests

Example 1:
```
<link rel="match" href="green-box-ref.xht" />
```
Example 2:
```
<link rel="match" href="green-box-ref.xht" />
<link rel="match" href="blue-box-ref.xht" />
<link rel="mismatch" href="red-box-notref.xht" />
<link rel="mismatch" href="red-box-notref.xht" />
```


### Requirement Flags

### Test Assertions

### Style Element (embedded styles)

### Script Element (embedded script)

### ''body'' Content

## File name format

## Support files

## User style sheets

## HTTP headers

[1]: ./selftest.html
[2]: ./reftest.html
[3]: ./test-harness-documentation.html
[4]: http://validator.w3.org/