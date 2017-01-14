---
layout: default
title: A Manual Test
---

# A Manual Test

You **never** want to write a manual test. Manual tests are painful, slow,
vulnerable to human error, and **very very** expensive to have in a test
suite.

However, sometimes you have to write a manual test anyway.

## When?

* Sometimes, user agent technology protects its users by specifically
preventing something from being automated - for example, printing, resizing
windows.

* Sometimes, you can't quite tell how a visual test will render and you need
a human's judgement.

* Sometimes, you are testing offline behavior, so you may need to be
temporarily disconnected from the testharness.

* etc.

## How?

Even though a human is needed to run the test and possibly also to decide the
test result, the result can at least be gathered into the usual `testharness`
mechanism for reporting.

We can do this by using the _asynchronous test_ capabilities given to us by
the `testharness.js` JavaScript files.

### Example 1

For example, let's say we want to test the `onresize` IDL event handler on
the `body` element. Sadly for the testsuite, we can only count on a human
to be able to resize the window. However, once the human does that (and
signals to the testharness that the event has indeed happened), the
testharness can determine the success of the test.

Remember, you can get a [template][1] for this kind of test [here][1].
This time, when you name the file, keep "MANUAL" at the end of the filename.

	<!DOCTYPE html>
	<html>
	<head>
	    <meta charset="utf-8">
	    <title>Body Element</title>
	    <link rel="author" title="dzenana"
	          href="mailto:dzenana.trenutak@gmail.com">
	    <link rel="help"
	          href="http://www.w3.org/html/wg/drafts/html/CR/single-
	                page.html#the-body-element">
	    <script src="/resources/testharness.js"></script>
	    <script src="/resources/testharnessreport.js"></script>
	</head>
	<body>
	    <h1>Validation of body's IDL onresize event handler attribute</h1>

	    <p>This needs to be a manual test as user agents explicitly prohibit
	scripts from resizing windows.  The human user is the only one
	universally allowed to resize a window.</p>
	    <p>Please do the following:</p>
	    <ol>
	        <li>resize this page</li>
	        <li>press the button immediately below this text</li>
	    </ol>

	    <form>
	        <input type="button" id="btnResize" value="click me"/>
	    </form>

	    <div id="log"></div>

	    <script>
	        "use strict";

	        var myReaction = [], testResize = {};

	        // need to be able to wait for user to push button
	        setup({ explicit_timeout: true });

	        // register IDL attribute event handler
	        document.body.onresize = 
	            function () { myReaction.push("resize-IDL"); };

	        // register async test 
	        testResize = async_test("Check body's onresize IDL event
	                                 handler");

	        // run async test after button is clicked
	        document.getElementById("btnResize").onclick = 
	            testResize.step_func(function (event) {
	                assert_in_array("resize-IDL", myReaction,
	                                "onresize IDL event handler failed: ");
	                testResize.done();
	            });
	    </script>
	</body>
	</html>

### Example 2

In another example, we need a human to verify that no sequencing information
is applied to list elements that are children of an unordered list. We cannot
automate this test with a reftest as we are not exactly sure how a failure
might render nor how to replicate an expected success with a different
approach.

Note: in this test, it is the human who decides if the test passes or fails.

Also note: this test is an abridged version of an actual test which asked the
human user a series of yes/no questions regarding the rendering. That is why
a table skeleton remains around this single test -- in the original,
additional table rows presented additional tests. It is possible to string
multiple manual tests within one file in this way, making it slightly faster
to gather the necessary results.

	<!DOCTYPE html>
	<html>
	<head>
	    <meta charset="utf-8">
	    <title>Body Element</title>
	    <link rel="author" title="dzenana"
	          href="mailto:dzenana.trenutak@gmail.com">
	    <link rel="help"
	          href="http://www.w3.org/html/wg/drafts/html/CR/single-
	                page.html#the-body-element">
	    <meta name="flags" content="interact" />
	    <script src="/resources/testharness.js"></script>
	    <script src="/resources/testharnessreport.js"></script>
	</head>
	<body>
	    <h1>Validation of li characteristic requiring manual testing</h1>

	    <p>The spec states: "If the parent element is an ol element, then
	the li element has an ordinal value."</p>
	    <p>This manual test is needed to verify that NON-ol element parents
	do NOT result in an ordinal value.</p>
	    <p>It needs to be manual because the ordinal value assigned to each
	list element by the user agent is NOT available programmatically.
	Values which are set either via markup or IDL are available
	programmatically, but not the calculated values for all the other list
	items.</p>
	    <p>And, as we cannot be sure how a mistakenly assigned value would
	be rendered, this test cannot be a reftest.</p>
	    <p>So, please use the buttons to answer the following question:</p>

	    <table>
	        <thead>
	            <tr>
	                <th>HTML Markup</th>
	                <th>Do you see any sort of sequencing information?</th>
	            </tr>
	        </thead>
	        <tbody>
	            <tr>
	                <td>
	                    <ul>
	                        <li>list item</li>
	                        <li>list item</li>
	                        <li>list item</li>
	                    </ul>
	                </td>
	                <td>
	                    <input type="button" id="btnULYes" value="Yes"/>
	                    <input type="button" id="btnULNo" value="No"/>
	                </td>
	            </tr>
	        </tbody>
	    </table>

	    <div id="log"></div>

	    <script>
	        "use strict";

	        var testUL = {};

	        // need to be able to wait for user to push button
	        setup(function () {
	                btnULYes.disabled = false;
	                btnULNo.disabled = false;
	             },
	             { explicit_timeout: true }
	        );

	        // register async tests
	        testUL = async_test("Check that unordered list element does not
	                             result in values for list items.");

	        // run async tests after buttons are clicked - UL test
	        document.getElementById("btnULNo").onclick = 
	            testUL.step_func(function (event) {     	
	                assert_true(true, "No sequencing applied to list
	                                   elements inside UL.");
	                testUL.done();
	                btnULYes.disabled = true;
	                btnULNo.disabled = true;
	            });
	        document.getElementById("btnULYes").onclick = 
	            testUL.step_func(function (event) {     	
	                assert_true(false, "No sequencing applied to list
	                                    elements inside UL.");
	                testUL.done();
	                btnULYes.disabled = true;
	                btnULNo.disabled = true;
	            });

	    </script>
	</body>
	</html>

In an ideal test suite in an ideal world, you would never need to use the
techniques explained here regarding manual tests.

Still, better to know how to create a manual test when necessary than to
leave any normative spec statement untested!

[1]: ./template-manual.html
