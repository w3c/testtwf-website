---
layout: default
title: A Reftest
---

# A Reftest

A _reftest_ is a test that compares the visual output of one file (the testcase) with the output of one or more other files (the references). Reftests can be scripted to run and report results automatically, for example, using Web Driver. A test can also be both a [self-describing test][1] and a reftest at the same time. This is preferable, since it allows for both machine comparison and manual verification–particularly useful if the test and the reference both render incorrectly in the same way!

Here is an example of a reftest that is also a self-describing test:

* [TEST][2]
     The test file applies a transform to an SVG element using `translate(50 50)`. When transformed properly, a red element on the page will be hidden from view.
* [REF][3]
     The reference file achieves the intended rendering by using an svg element with and `x=50` and `y=50` and no `transform`.

In some cases, a test cannot be a reftest. For example, there is no way to
create a reference for underlining, since the position and thickness of the
underline depends on the UA, the font, and/or the platform. However, once
it's established that underlining an inline element works, it's possible to
construct a reftest for underlining a block element, by constructing a
reference using underlines on a `<span>` that wraps all the content inside
the block.

## Components of a Reftest

A reftest has three parts:

* Test File
    * The test file must follow the [test format guidelines][4].

* Reference File
    * This is a different, usually simpler, file that results in the same rendering as the test. The reference file must not use the same features that are being tested. Sometimes more than one reference file is required.

* Reftest Comparison
    * One or more reference links that say which files are to be compared and whether they are to render identically or differently. This is defined in the test file. For example:

    <link rel="match" href="reference/background-color-ref.html" />
    

### The Reftest Test File

The test file uses the technology to be tested. This file must follow the
[test format guidelines][4].

In addition to matching a reftest reference, the test may also function as a
[self-describing test][1]. This is preferred because having the description
lets the tester check that the test and the reference are not _both_ being
rendered incorrectly and triggering a false pass, and because designing it
for an obvious fail makes it easier to find what went wrong when the reftest
does fail.

If the test must perform some processing before a comparison can be made to
the reference, add `class=reftest-wait` to the root element, and remove it
when the comparison can be made.

### The Reftest Reference File

The reference file uses a different method to produce the same rendering as
the test file. Multiple tests can (and often do) share the same reference
file.

References should be named after the earliest test that uses them in the
`test-topic` series they belong to, and must have either `-ref` or `-notref`
appended to the name. Variations on a reference can be denoted by appending
additional suffixes after `-ref` or `-notref`. If present, such a suffix must
either be entirely numeric (i.e. file-ref002.html, or be separated by a dash,
i.e. file-ref-a.html). Depending on the test suite, they may be placed in the
`reference` subdirectory of the main test directory or directly in the main
test directory. If they are placed in the `reference` subdirectory then the
`-ref` or `-notref` suffix may be omitted from their filename.

In some cases when creating the reference file, it is necessary to use
features that, although different from the tested features, may themselves
fail in such a manner as to cause the reference to render identically to a
failed test. When this is the case, in order to reduce the possibility of
false positive testing outcomes, multiple reference files should be used,
each using a different technique to render the reference. One possibility is
to create one or more references that must **not** match the test file, i.e.:
a file that renders in the same manner as a failed test.

In other cases, the specification under test may allow multiple possible
renderings. In this situation references must be supplied for each allowed
rendering.

For example, if two self-describing tests `list-style-type-003.xht` and
`list-style-type-004.xht` share the same reference, that reference could be
named `list-style-type-003-ref.xht`.

#### Simplified Reference Format

Like the format for the test file, the reftest reference format is also XHTML
or HTML5 in UTF-8 with bitmap images in PNG format. Unlike the format for the
test file, there is no metadata except for the [author credits][5] and
optional [reference links][6].

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


### The Reftest Comparison Links

In order to designate which files are to be compared to the test file, and
the nature of the comparison, the test file must have one or more links to

  * If multiple reference files must be matched, each reference file should,
in turn, link to the next reference.

  * If multiple renderings are conforming, each possible rendering should
have its own reference file linked from the test file.

  * In cases where it's likely for the test and the reference to misrender
identically, the test should also have one (or more) mismatch references.

## The Reftest Manifest

Note: The use of reftest manifest files in the test source is deprecated in
favor of reference links.

The reftest manifest is a plain text file that lists test-reference pairs for
comparison. The test build process produces reftest manifests as needed for
input into testing tools.

Each line starts with `==` to indicate equality or `!=` to indicate
inequality. This is followed by a space, the relative path to the test file,
another space, and the relative path to the reference.

If a test has multiple `==` references then at least one of those references
must match the test. If a test has multiple `!=` references, then none of
those references may match the test. The reference file may also have entries
in the manifest: in this case, the renderings of the references must match
each other as well in order to consider the test as passed.

White space followed by `#` indicates the start of a comment that runs until
the end of the line. A line starting with `#` is also a comment.

The reftest manifest should be named `reftest.list` and placed in the
`reference` subdirectory of the main test directory.

Here is an example of a reftest manifest.

    # reftest.list snippet
    == ../test-topic-000.xht test-topic-000-ref.xht
    == ../test-topic-001.xht test-topic-001-ref.xht
    == ../test-topic-002.xht test-topic-000-ref.xht # note same reference as
    test 000

[Mozilla's manifest format][8], which is more-or-less a superset of the W3C
format, allows annotations such as whether the test is expected to pass or
fail. These can be useful when setting up automated regression testing.

## Converting to Reftest

Many of the CSS2.1 tests are [self-describing tests][1] that _could_ be
reftests, but are not. (They were written before the reftest format was
adopted.) They are slowly being converted into reftests, and your help in
this effort is welcome. Some guidelines are offered below:

  * **If the test uses Ahem, make sure its font size is a multiple of 5px**,
otherwise it may render inconsistently (due to rounding errors introduced by
certain platforms' font APIs).

  * If multiple tests can share a reference, share the reference. (This
allows for some optimizations in the test runs.)

  * If multiple files have almost but not quite the same rendering, and could
almost but not quite render identically and thus share a reference, you may
tweak the tests to render identically **provided that** this does not affect
the tests' precision or correctness.


[1]: ./selftest.html
[2]: http://test.csswg.org/source/contributors/adobe/submitted/svg-transform/translate/svg-translate-001.html
[3]: http://test.csswg.org/source/contributors/adobe/submitted/svg-transform/translate/reference/svg-translate-ref.html
[4]: ./test-format-guidelines.html
[5]: ./test-format-guidelines.html#credits
[6]: ./test-format-guidelines.html#reference-links
[8]: http://mxr.mozilla.org/mozilla-central/source/layout/tools/reftest/README.txt


