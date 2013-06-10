---
layout: default
title: A RefTest
---

# A RefTest

A _reftest_ is a test that compares the visual output of one file (the
testcase) with the output of one or more other files (the references). Unlike
the standard [self-describing tests][1], reftests can be scripted to run and
report results automatically.

A test can be both a [self-describing tests][1] and a reftest at the same
time. This is preferable, since it allows for both machine comparison and
manual verification. It is particularly useful if the test and the reference
both render incorrectly in the same way!

Here is an example of a reftest that is also a self-describing test:

* [TEST][2]
     The test file uses a fuchsia top border and an orange background to
create a two-color square block that is then rotated 90deg using the
`transform` property.
* [REF][3]
     The reference file achieves the intended rendering by using a fuchsia
left border and an orange background and no `transform`.

In some cases, a test cannot be a reftest. For example, there is no way to
create a reference for underlining, since the position and thickness of the
underline depends on the UA, the font, and/or the platform. In such cases, a
[self-describing test][1] must be used. However, once it's established that
underlining an inline element works, it's possible to construct a reftest for
underlining a block element, by constructing a reference using underlines on
a `<span>` that wraps all the content inside the block.

## Components of a Reftest

A reftest has three parts:

* Test File
    The test file must follow the [CSS test format guidelines][4].

* Reference File
    This is a different, usually simpler, file that results in the same
rendering as the test. The reference file must not use the same features that
are being tested. Sometimes more than one reference file is required.

* Reftest Comparison
    One or more reference links that say which files are to be compared and
whether they are to render identically or differently.

### The Reftest Test File

The test file uses the technology to be tested. This file must follow the
[CSS test format guidelines][4].

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

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>CSS Reftest Reference</title>
        <link rel="author" title="NAME_OF_AUTHOR"
              href="mailto:EMAIL OR http://CONTACT_PAGE"/>
        <style type="text/css"><![CDATA[CSS FOR REFERENCE]]></style>
    </head>
    <body>
        CONTENT OF REFERENCE
    </body>
    </html>

#### Common References

There are several common references, such as those used for parsing and
selectors tests. Their names begin with `ref-` so they can be easily found in
the `reftest` directory. Email [public-css-testsuite@w3.org][7] if you would
like to add to the common references collection.

### The Reftest Comparison Links

In order to designate which files are to be compared to the test file, and
the nature of the comparison, the test file must have one or more links to
the reference files [as described in the test format][6].

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

Most of the CSS2.1 tests are [self-describing tests][1] that _could_ be
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

### 48 unreftestable tests

The following is a list of 48 CSS2.1 tests that appear to be unreftestable:

  1. [[RC6] c414-flt-000][14] **Reasons why**: if viewport is 640px or so,
then “Blue rectangle” text should flow around and below each teal blocks. A
reftest for this if/when resizing viewport - without javascript - is very
hard to do, I would imagine. I do not think this can be done. Also,
positioning floated-left and float-right boxes inside the same container
seems impossible to do.

  2. [[RC6] float-001][15] **Reasons why**: Text flowing around a floated box
is very difficult to reftest.

  3. [[RC6] float-002][16] **Reasons why**: Text flowing around a floated box
is very difficult to reftest.

  4. [[RC6] c5523-width-000][17] **Reasons why**: the baseline line in a line
box when/where there is a taller inline box than the set line height is not
predictable. “The inline-level boxes are aligned vertically according to
their 'vertical-align' property. (…) If such boxes are tall enough, there are
multiple solutions and **CSS 2.1 does not define the position of the line
box's baseline**” [CSS 2.1, section 10.8, Line height calculations][18].

  5. [[RC6] c565-list-pos-001][9] **Reasons why**: list marker position

  6. [[RC6] c5524-height-000][19] **Reasons why**: the baseline line in a
line box when/where there is a taller inline box than the set line height is
not predictable. “The inline-level boxes are aligned vertically according to
their 'vertical-align' property. (…) If such boxes are tall enough, there are
multiple solutions and **CSS 2.1 does not define the position of the line
box's baseline**” [CSS 2.1, section 10.8, Line height calculations][18].

  7. [[RC6] c566-list-stl-001][10] **Reasons why**: list image position

  8. [[RC6] c564-list-img-000][11] **Reasons why**: list image position

  9. [[RC6] c563-list-type-001][12] **Reasons why**: list image position

  10.  [[RC6] c5510-padn-000][13] **Reasons why**: [Fractional pixel issues
in c5510-padn-000][64]

  11. [[RC6] margin-collapse-164][20] **Reasons why**: As of March 1st 2012,
it is still not established officially if the test is valid or invalid,
correct or incorrect.

  12. [[RC6] floats-151][21] **Reasons why**: the test itself is difficult to
understand. The negative margin-left (-10em) is not applied actually anymore
(any wider) than the width of the PASS text node. It is possible to do a
reftest but maybe not one that will be accurate and precise in all browsers.

  13. [[RC6] c5525-fltwrap-000][22] **Reasons why**: Main number 1 reason is
that content of central column should flow around left column and then below
left column when it is past the bottom of left column. This is impossible to
simulate with a table or with DHTML layers. Secondary reasons: 1- fractional
pixels may be rendered differently with properties using different elements
(positioned DHTML layers, floated blocks, table cells) 2- the 8px margin
bottom of body element is difficult to simulate when using positioned DHTML
layers. [Links, screenshot and tentatives-reftests of c5525-fltwrap-000][23]

  14. [[nightly-unstable] font-weight-016][24] **Reasons why**: it's probably
impossible to create a reftest for this as it is impossible to know in
advance how font-weight characters will affect width. It varies from one
browser to another.

  15.  [[nightly-unstable] font-size-118][65] **Reasons why**: `font-size:
smaller` is impossible to convert to an absolute value. It was explained all
this in this [email archive][66].

  16. [[RC6] line-height-applies-to-010][67] **Reasons why**: list marker
position

  17. [[nightly-unstable] font-size-119][25] **Reasons why**: font-size
keywords can not be reliably converted into font-size pixels. So, there is no
way to know how tall the document box is; so presence of vertical scrollbar
and its relative position are undefined

  18. [[RC6] c24-first-lttr-000][26] **Reasons why**: browsers may apply
different line-height value to :first-letter pseudo-element depending on font
used. When using `DejaVu Serif` font, Firefox 11.0 and Chrome 18.0.1025.142
apply line-height: 1.17 while Opera 11.62 applies line-height: 1.18. When
using `Free Serif` font, all 3 browsers use the same computed line-height
value so that there is no need to specify it.

  19. [[nightly-unstable] inherit-004][27] **Reasons why**: "Empty inline
elements generate empty inline boxes, but these boxes still have margins,
padding, borders and a line height, and thus influence these calculations
just like elements with content." coming from [section 10.8][18]. So, an
inline box with `font-weight: bold` can influence height of line box.

  20. [[RC6] border-bottom-style-003][28] **Reasons why**: The following
border-styles are impossible to reftest: dotted, dashed, ridge, groove,
inset, outset, double. Only solid, none, hidden (and sometimes inherit) are
reftestable.

  21. [[RC6] border-bottom-width-036][29] **Reasons why**: Depending on how
tall 1cm is (how it is actually resolved: as 37px or 38px for border), the
height of green that we may see could be 75px or it could be 76px. Eg.: Opera
11.64 displays a filled green rectangle of 76px of height while other
browsers display a filled green rectangle of 75px.

  22. [[RC6] border-bottom-width-047][30] **Reasons why**: Depending on how
tall 1mm is (how it is actually resolved: as 3px or 4px for border), the
height of green that we may see could be 7px or it could be 8px. Eg.: Opera
11.64 displays a filled green rectangle of 86px of height while other
browsers display a filled green rectangle of 7px.

  23. [[RC6] border-bottom-width-014][31] **Reasons why**: 1pt is 1.33333px
(3pt == 4px); so, it could be possible for a browser to resolve such value as
2px (round up) or as 1px (round down); so, this situation is impossible to
predict, therefore impossible to reftest.

  24. [[RC6] border-bottom-width-092][32] **Reasons why**: border-width: thin
or border-width: medium or border-width: thick is impossible to reftest. It's
all up to the UA to decide on such border-width.

  25. [[nightly-unstable] line-height-122][33] **Reasons why**: How much
descent space (below baseline) is allocated depends entirely on the font
chosen, the font used. So, in this test, it is impossible to calculate and
predict the vertical height of the bright green line. With Ahem font, this
would be computable and predictable.

  26. [[nightly-unstable] line-height-123][34] **Reasons why**: How much
descent space (below baseline) is allocated depends entirely on the font
chosen, the font used. So, in this test, it is impossible to calculate and
predict the vertical height of the bright green line. With Ahem font, this
would be computable and predictable.

  27. [[nightly-unstable] line-height-124][35] **Reasons why**: How much
descent space (below baseline) is allocated depends entirely on the font
chosen, the font used. So, in this test, it is impossible to calculate and
predict the vertical height of the bright green line. With Ahem font, this
would be computable and predictable.

  28.   29. [[RC6] c414-flt-wrap-000][36] **Reasons why**: the test uses
fractional values (14.98em, 0.01em) which can not be converted consistently
into a reftest.

  30. [[RC6] c5522-brdr-002][37] **Reasons why**: the topmost cell will be as
wide as the 2 other cell width combined with one cell in a nested table. It
may be possible to reftest this test… but it's not obvious.

  31. [[RC6] floats-103][38] **Reasons why**: It's possible to reftest this
test but so far I have not been able to with a table. Maybe it would be
possible with a nested table to overcome difficulties.

  32. [[RC6] inlines-007][39] **Reasons why**: It's impossible to predict the
vertical position of baseline line since it varies depending on local font in
use.

  33. [[RC6] inlines-014][40] **Reasons why**: It's impossible to predict the
amount of descent space below the baseline for local font in use. The test
requires to specify line-height affecting the cell box.

  34. [[RC6] inlines-015][41] **Reasons why**: It's impossible to predict the
amount of descent space below the baseline for local font in use. The test
requires to specify line-height affecting the cell box.

  35. [[RC6] c5525-fltcont-000][42] **Reasons why**: It seems impossible to
emulate or replace 'text-align: justify' by another feature. Even
without/despute 'text-align: justify', the test still would seem difficult to
reftest.

  36. [[RC6] margin-left-applies-to-008][43] **Reasons why**: Content area of
an inline non-replaced element is based on the font type and font-size but
the CSS2.1 specification does not specify how. So, the height of the 2
borders (blue and orange) is impossible to predict. Such difficulty applies
as well to [[RC6] margin-right-applies-to-008][44] . With Ahem font, this
would be computable and predictable.

  37. [[RC6] padding-left-applies-to-008][45] **Reasons why**: Content area
of an inline non-replaced element is based on the font type and font-size but
the CSS2.1 specification does not specify how. So, the height of the 2
borders (blue and orange) is impossible to predict. Such difficulty applies
as well to [[RC6] padding-right-applies-to-008][46] . With Ahem font, this
would be computable and predictable.

  38. [[RC6] padding-applies-to-008][47] **Reasons why**: Content area of an
inline non-replaced element is based on the font type and font-size but the
CSS2.1 specification does not specify how. So, the height of the orange
borders is impossible to predict. Such difficulty applies as well to [[RC6]
margin-applies-to-008][48] . With Ahem font, this would be computable and
predictable.

  39. [[RC6] abspos-003][68], [[RC6] abspos-004][69] and [[RC6] abspos-006]
[70] **Reasons why**: An absolute positioned element with `bottom: 0` is not
reftestable with a different method to produce the same rendering as the test
file.

  40. [[RC6] border-bottom-width-applies-to-014][49] **Reasons why**: The
bottom edge of the empty cell should be “sitting” on the baseline. Now,
depending on local font used, it is not predictable what would be the
vertical baseline-alignment for such local font: this can vary.

  41. [[RC6] dynamic-top-change-005][71] **Reasons why**: the duo
declarations font-size: medium; line-height: 0; create a situation where the
vertical position of the line box's baseline is not predictable and does vary
in browsers. "The inline-level boxes are aligned vertically according to
their `vertical-align` property. (…) If such boxes are tall enough, there are
multiple solutions and CSS 2.1 does not define the position of the line box's
baseline" [CSS 2.1, section 10.8, Line height calculations][18] Such
difficulty applies as well to [[RC6] dynamic-top-change-005a][72] and
[[RC6] dynamic-top-change-005b][73].

  42. [[RC6] bottom-applies-to-008][74] **Reasons why**: I have not found a
way to create a reftest for this test. Maybe there is a way but so far I have
not found one. The same problem applies as well to
[[RC6] position-applies-to-008][75].

  43. [[RC6] position-relative-002][50] **Reasons why**: I have not found a
way to create a reliable and trustworthy reftest for this test… despite a lot
of time spent on this. Even after setting `line-height` to 1.25, the
offsetTop of `b` and of `a` are unexplicably 55px and 80px in Chrome 21 while
it is 54px and 79px in other browsers (Firefox 15.01 and Opera 12.02) and
when I think it should be 54px and 79px and not 55px and 80px. And I do not
know why or if this is some kind of a bug. [Addendum: the offsetTop value of
`b` varies depending on the local font in use.]

  44. [[RC6] block-formatting-contexts-013][51] **Reasons why**: Height of
horizontal scrollbar mechanism and width of vertical scrollbar mechanism is
impossible to predict: these are user-settable preferences and browser
default are not the same for each browser and under different operating
system.

  45. [[RC6] height-014][52] **Reasons why**: `height: 1pt` is impossible to
convert into a reftest as 1pt can be resolved as 1px (this is what Opera
12.02, Chrome 22.0.1229.79 and Konqueror 4.9.2 do) or as 2px (this is how
Firefox 15.0.1 handles 1pt). Same kind of problem with [[RC6] height-047][53]
(`height: 1mm`) and other similar tests ([[RC6] height-036][76] and 1cm).

  46. [[RC6] min-height-113][54] **Reasons why**: Many tests with scrollbar
(s) are unreftestable because the height of horizontal scrollbar and the
width of vertical scrollbar are entirely user-settable in operating systems,
(at least Windows and Linux KDE), therefore unpredictable. Some browsers
(like Konqueror 4.9.2) also have semi-transparent areas around the scrollbar
thumb and scrollbar arrows: so, an overlapping green square with scrollbar(s)
may still display red from the overlapped red square and this is impossible
to prevent/work around.

  47. [[RC6] replaced-intrinsic-ratio-001][55] **Reasons why**: We would
first need to create an image made of a green triangle inside a filled lime
rectangle. Then it's not clear if oblique shapes (bitmap) would not be
different from svg drawing. Unknown, unclear at this moment.

  48. [[RC6] replaced-min-max-001][56] **Reasons why**: Stretched images will
create bigger and fuzzier black dots: this is impossible to reftest
appropriately.

[1]: ./selftest.html
[2]: ./rotate-90deg-001.xht
[3]: ./rotate-90deg-001-ref.xht
[4]: http://wiki.csswg.org/test/format
[5]: http://wiki.csswg.org/test/format#credits (test:format)
[6]: http://wiki.csswg.org/test/format#reference-links (test:format)
[7]: mailto:public-css-testsuite@w3.org
[8]: http://mxr.mozilla.org/mozilla-
central/source/layout/tools/reftest/README.txt
[9]: http://test.csswg.org/suites/css2.1/20110323/html4/c565-list-pos-
001.htm
[10]: http://test.csswg.org/suites/css2.1/20110323/html4/c566-list-stl-
001.htm
[11]: http://test.csswg.org/suites/css2.1/20110323/html4/c564-list-img-
000.htm
[12]: http://test.csswg.org/suites/css2.1/20110323/html4/c563-list-type-
001.htm
[13]: http://test.csswg.org/suites/css2.1/20110323/html4/c5510-padn-000.htm
[14]: http://test.csswg.org/suites/css2.1/20110323/html4/c414-flt-000.htm
[15]: http://test.csswg.org/suites/css2.1/20110323/html4/float-001.htm
[16]: http://test.csswg.org/suites/css2.1/20110323/html4/float-002.htm
[17]: http://test.csswg.org/suites/css2.1/20110323/html4/c5523-width-000.htm
[18]: http://www.w3.org/TR/CSS21/visudet.html#line-height
[19]: http://test.csswg.org/suites/css2.1/nightly-unstable/html4/c5524-
height-000.htm
[20]: http://test.csswg.org/suites/css2.1/20110323/html4/margin-collapse-
164.htm
[21]: http://test.csswg.org/suites/css2.1/20110323/html4/floats-151.htm
[22]: http://test.csswg.org/suites/css2.1/20110323/html4/c5525-fltwrap-
000.htm
[23]: http://www.gtalbot.org/BrowserBugsSection/css21testsuite/reftests/
c5525-fltwrap-000-is-unreftestable.html
[24]: http://test.csswg.org/suites/css2.1/nightly-unstable/html4/font-weight-
016.htm
[25]: http://test.csswg.org/suites/css2.1/nightly-unstable/html4/font-
size-119.htm
[26]: http://test.csswg.org/suites/css2.1/20110323/html4/c24-first-lttr-
000.htm
[27]: http://test.csswg.org/suites/css2.1/nightly-unstable/html4/inherit-
004.htm
[28]: http://test.csswg.org/suites/css2.1/20110323/html4/border-bottom-style-
003.htm
[29]: http://test.csswg.org/suites/css2.1/20110323/html4/border-bottom-width-
036.htm
[30]: http://test.csswg.org/suites/css2.1/20110323/html4/border-bottom-width-
047.htm
[31]: http://test.csswg.org/suites/css2.1/20110323/html4/border-bottom-
width-014.htm
[32]: http://test.csswg.org/suites/css2.1/20110323/html4/border-bottom-
width-092.htm
[33]: http://test.csswg.org/suites/css2.1/nightly-unstable/html4/line-height-
122.htm
[34]: http://test.csswg.org/suites/css2.1/nightly-unstable/html4/line-height-
123.htm
[35]: http://test.csswg.org/suites/css2.1/nightly-unstable/html4/line-height-
124.htm
[36]: http://test.csswg.org/suites/css2.1/20110323/html4/c414-flt-wrap-
000.htm
[37]: http://test.csswg.org/suites/css2.1/20110323/html4/c5522-brdr-002.htm
[38]: http://test.csswg.org/suites/css2.1/20110323/html4/floats-103.htm
[39]: http://test.csswg.org/suites/css2.1/20110323/html4/inlines-007.htm
[40]: http://test.csswg.org/suites/css2.1/20110323/html4/inlines-014.htm
[41]: http://test.csswg.org/suites/css2.1/20110323/html4/inlines-015.htm
[42]: http://test.csswg.org/suites/css2.1/20110323/html4/c5525-fltcont-
000.htm
[43]: http://test.csswg.org/suites/css2.1/20110323/html4/margin-left-applies-
to-008.htm
[44]: http://test.csswg.org/suites/css2.1/20110323/html4/margin-right-
applies-to-008.htm
[45]: http://test.csswg.org/suites/css2.1/20110323/html4/padding-left-
applies-to-008.htm
[46]: http://test.csswg.org/suites/css2.1/20110323/html4/padding-right-
applies-to-008.htm
[47]: http://test.csswg.org/suites/css2.1/20110323/html4/padding-applies-to-
008.htm
[48]: http://test.csswg.org/suites/css2.1/20110323/html4/margin-applies-to-
008.htm
[49]: http://test.csswg.org/suites/css2.1/20110323/html4/border-bottom-width-
applies-to-014.htm
[50]: http://test.csswg.org/suites/css2.1/20110323/html4/position-relative-
002.htm
[51]: http://test.csswg.org/suites/css2.1/20110323/html4/block-formatting-
contexts-013.htm
[52]: http://test.csswg.org/suites/css2.1/20110323/html4/height-014.htm
[53]: http://test.csswg.org/suites/css2.1/20110323/html4/height-047.htm
[54]: http://test.csswg.org/suites/css2.1/20110323/html4/min-height-113.htm
[55]: http://test.csswg.org/suites/css2.1/20110323/html4/replaced-intrinsic-
ratio-001.htm
[56]: http://test.csswg.org/suites/css2.1/20110323/html4/replaced-min-max-
001.htm
[57]: http://test.csswg.org/suites/css2.1/20110323/html4/background-position-
002.htm
[58]: http://test.csswg.org/suites/css2.1/20110323/html4/inline-formatting-
context-023.htm
[59]: http://test.csswg.org/suites/css2.1/20110323/html4/floats-101.htm
[60]: http://test.csswg.org/suites/css2.1/20110323/html4/containing-block-
009.htm
[61]: http://test.csswg.org/suites/css2.1/20110323/html4/floats-146.htm
[62]: http://test.csswg.org/suites/css2.1/nightly-unstable/html4/line-height-
125.htm
[63]: http://test.csswg.org/suites/css2.1/20110323/html4/floats-143.htm
[64]: http://lists.w3.org/Archives/Public/public-css-
testsuite/2012Jan/0010.html
[65]: http://test.csswg.org/suites/css2.1/nightly-unstable/html4/font-size-
118.htm
[66]: http://lists.w3.org/Archives/Public/public-css-
testsuite/2012Feb/0011.html
[67]: http://test.csswg.org/suites/css2.1/20110323/html4/line-height-applies-
to-010.htm
[68]: http://test.csswg.org/suites/css2.1/20110323/html4/abspos-003.htm
[69]: http://test.csswg.org/suites/css2.1/20110323/html4/abspos-004.htm
[70]: http://test.csswg.org/suites/css2.1/20110323/html4/abspos-006.htm
[71]: http://test.csswg.org/suites/css2.1/20110323/html4/dynamic-top-change-
005.htm
[72]: http://test.csswg.org/suites/css2.1/20110323/html4/dynamic-top-change-
005a.htm
[73]: http://test.csswg.org/suites/css2.1/20110323/html4/dynamic-top-change-
005b.htm
[74]: http://test.csswg.org/suites/css2.1/20110323/html4/bottom-applies-to-
008.htm
[75]: http://test.csswg.org/suites/css2.1/20110323/html4/position-applies-to-
008.htm
[76]: http://test.csswg.org/suites/css2.1/20110323/html4/height-036.htm
