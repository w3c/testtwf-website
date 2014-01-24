---
layout: docs
type: [review]
title: Test Review Checklist
---

When reviewing a test, make sure the test follows the 
[format][format] and [style][style] guidelines.

In addition, the test should be checked for the following:

## All tests
<input type="checkbox"> 
The test passes when it's supposed to pass

<input type="checkbox"> 
The test fails when it's supposed to fail

<input type="checkbox"> 
The test is testing what it thinks it's testing

<input type="checkbox"> 
The spec backs up the expected behavior in the test. 

<input type="checkbox"> 
The test is automatable as either [reftest][reftest] or a 
[script test][scripttest] unless there's a very good reason why the 
test must be manual. 


## Reftests Only
<input type="checkbox">
 The test has a [self-describing][selftest] statement 

<input type="checkbox"> 
The self-describing statement is accurate, precise, simple, and 
self-explanatory. Your mother/husband/roommate/brother/bus driver 
should be able to say whether the test passed or failed within a few 
seconds, and not need to spend several minutes thinking or asking 
questions.

<input type="checkbox"> 
The reference file is accurate and will render pixel-perfect 
identically to the test on all platforms.

<input type="checkbox"> 
The reference file uses a different technique that won't fail in 
the same way as the test.

<input type="checkbox"> 
The title is descriptive but not too wordy.

<input type="checkbox"> 
The test is as cross-platform as reasonably possible, working 
across different devices, screen resolutions, paper sizes, etc. If 
there are limitations (e.g. the test will only work on 96dpi 
devices, or screens wider than 200 pixels) that these are documented 
in the instructions.


## In depth Checklist

<input type="checkbox"> 
A test should not use self-closing start tag ("/" (U+002F)) when using the HTML syntax

<input type="checkbox">
The test should not use the Unicode byte order mark (BOM U+FEFF)

<input type="checkbox">
The test must be placed in the relevant directory, based on the /TR latest version link if available

<input type="checkbox">
If the test needs code running on the server side, the server code must be written in python



[format]: ./test-format-guidelines.html
[style]: ./test-style-guidelines.html
[reftest]: ./reftests.html
[scripttest]: ./testharness-documentation.html
[selftest]: ./test-style-guidelines.html#self-describing
