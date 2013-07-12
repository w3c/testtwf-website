---
layout: default
title: Testharness.js Documentation
---

# Testharness.js Documentation

## Introduction

This file provides a framework for writing testcases. It is intended to provide
a convenient API for making common assertions, and to work both for testing
synchronous and asynchronous DOM features in a way that promotes clear and
robust tests.

## Basic Usage

To use this file, import the script and the testharnessreport script into the
test document:

    <script src="/resources/testharness.js"></script>
    <script src="/resources/testharnessreport.js"></script>

Within each file one may define one or more tests. Each test is atomic in the
sense that a single test has a single result (pass/fail/timeout).

Within each test one may have a number of asserts. The test fails at the
first failing assert, and the remainder of the test is (typically) not run.

If the file containing the tests is a HTML file with an element of id `log`,
this will be populated with a table containing the test results after all
the tests have run.

NOTE: By default tests must be created before the load event fires. For ways
to create tests after the load event, see "Determining when all tests are
complete", below.

## Synchronous Tests

To create a synchronous test use the test() function:

    test(test_function, name, properties)

`test_function` is a function that contains the code to test. For example,
a trivial passing test would be:

    test(function() {assert_true(true)}, "assert_true with true")

The function passed in is run in the `test()` call.

`properties` is an object that overrides default test properties. The
recognised properties are:

* timeout - the test timeout in ms

e.g.

    test(test_function, "Sample test", {timeout:1000})

would run test_function with a timeout of 1s.

Additionally, test-specific metadata can be passed in the properties. These
are used when the individual test has different metadata from that stored
in the `<head>`. The recognized metadata properties are:

* help - The url of the part of the specification being tested
* assert - A human readable description of what the test is attempting to prove
* author - Name and contact information for the author of the test in the
format: "Name &lt;email_addr&gt;" or "Name http://contact/url"

## Asynchronous Tests

Testing asynchronous features is somewhat more complex since the result of
a test may depend on one or more events or other callbacks. The API provided
for testing these features is intended to be rather low-level but hopefully
applicable to many situations.

To create a test, one starts by getting a Test object using async_test:

    async_test(name, properties)

e.g.

    var t = async_test("Simple async test")

Assertions can be added to the test by calling the step method of the test
object with a function containing the test assertions:

    t.step(function() {assert_true(true)});

When all the steps are complete, the done() method must be called:

    t.done();

As a convenience, `async_test` can also takes a function as first argument.
This function is called with the test object as both its `this` object and
first argument. The above example can be rewritten as:

    async_test(function(t) {
        object.some_event = function() {
            t.step(function (){assert_true(true); t.done();});
        };
    }, "Simple async test");

which avoids cluttering the global scope with references to async tests
instances.

The properties argument is identical to that for `test()`.

In many cases it is convenient to run a step in response to an event or a
callback. A convenient method of doing this is through the step_func method
which returns a function that, when called runs a test step. For example

    object.some_event = t.step_func(function(e) {assert_true(e.a)});

## Making assertions

Functions for making assertions start with "assert_". The best way to get a
list is to look in this file `testharness.js` for functions names matching
that pattern. The general signature is:

    assert_something(actual, expected, description)

although not all assertions precisely match this pattern e.g. assert_true
only takes actual and description as arguments.

The description parameter is used to present more useful error messages when
a test fails.

NOTE: All asserts must be located in a `test()` or a step of an `async_test()`.
asserts outside these places won't be detected correctly by the harness and
may cause a file to stop testing.

## Setup

Sometimes tests require non-trivial setup that may fail. For this purpose there
is a `setup()` function, that may be called with one or two arguments.

The two argument version is:

    setup(func, properties)

The one argument versions may omit either argument.

`func` is a function to be run synchronously. `setup()` becomes a no-op once
any tests have returned results. Properties are global properties of the test
harness. Currently recognised properties are:

* timeout - The time in ms after which the harness should stop waiting for
tests to complete (this is different to the per-test timeout because async
tests do not start their timer until `.step` is called)
* explicit_done - Wait for an explicit call to done() before declaring all
tests complete (see below)
* output_document - The document to which results should be logged. By default
this is the current document but could be an ancestor document in some cases
e.g. a SVG test loaded in an HTML wrapper
* explicit_timeout - disable file timeout; only stop waiting for results when
the timeout() function is called (typically for use when integrating with some
existing test framework that has its own timeout mechanism).

## Determining when all tests are complete

By default the test harness will assume there are no more results to come when:

* There are no Test objects that have been created but not completed
* The load event on the document has fired

This behaviour can be overridden by setting the `explicit_done` property to
`true` in a call to `setup()`. If `explicit_done` is `true`, the test harness
will not assume it is done until the global `done()` function is called. Once
`done()` is called, the two conditions above apply like normal.

## Generating tests

NOTE: this functionality may be removed

There are scenarios in which is is desirable to create a large number of
(synchronous) tests that are internally similar but vary in the parameters
used. To make this easier, the `generate_tests` function allows a single
function to be called with each set of parameters in a list:

    generate_tests(test_function, parameter_lists, properties)

For example:

    generate_tests(assert_equals, [
        ["Sum one and one", 1+1, 2],
        ["Sum one and zero", 1+0, 1]
    ]);

Is equivalent to:

    test(function() {assert_equals(1+1, 2)}, "Sum one and one")
    test(function() {assert_equals(1+0, 1)}, "Sum one and zero")

Note that the first item in each parameter list corresponds to the name of the
test.

The properties argument is identical to that for `test()`. This may be a single
object (used for all generated tests) or an array.

## Callback API

The framework provides callbacks corresponding to 3 events:

* start - happens when the first Test is created
* result - happens when a test result is recieved
* complete - happens when all results are recieved

The page defining the tests may add callbacks for these events by calling the
following methods:

* add_start_callback(callback) - callback called with no arguments
* add_result_callback(callback) - callback called with a test argument
* add_completion_callback(callback) - callback called with an array of tests
and an status object

tests have the following properties:

* status: A status code. This can be compared to the PASS, FAIL, TIMEOUT and
NOTRUN properties on the test object
* message: A message indicating the reason for failure. In the future this will
always be a string

The status object gives the overall status of the harness. It has the following
properties:

* status: Can be compared to the OK, ERROR and TIMEOUT properties
* message: An error message set when the status is ERROR

## External API

In order to collect the results of multiple pages containing tests, the test
harness will, when loaded in a nested browsing context, attempt to call certain
functions in each ancestor and opener browsing context:

* start - start_callback
* result - result_callback
* complete - completion_callback

These are given the same arguments as the corresponding internal callbacks
described above.

## External API through cross-document messaging

Where supported, the test harness will also send messages using cross-document
messaging to each ancestor and opener browsing context. Since it uses the
wildcard keyword (\*), cross-origin communication is enabled and script on
different origins can collect the results.

This API follows similar conventions as those described above only slightly
modified to accommodate message event API. Each message is sent by the harness
is passed a single vanilla object, available as the `data` property of the
`event` object. These objects are structures as follows:

* start - `{ type: "start" }`
* result - `{ type: "result", test: Test }`
* complete - `{ type: "complete", tests: [Test, ...], status: TestsStatus }`

## List of assertions

* assert_true(actual, description) - asserts that /actual/ is strictly true

* assert_false(actual, description) - asserts that /actual/ is strictly false

* assert_equals(actual, expected, description) - asserts that /actual/ is the
same value as /expected/

* assert_not_equals(actual, expected, description) - asserts that /actual/ is a
different value to /expected/. Yes, this means that "expected" is a misnomer

* assert_in_array(actual, expected, description) - asserts that /expected/ is
an Array, and /actual/ is equal to one of the members -- expected.indexOf
(actual) != -1

* assert_array_equals(actual, expected, description) - asserts that /actual/
and /expected/ have the same length and the value of each indexed property in
/actual/ is the strictly equal to the corresponding property value in
/expected/

* assert_approx_equals(actual, expected, epsilon, description) - asserts that
/actual/ is a number within +/- /epsilon/ of /expected/

* assert_less_than(actual, expected, description) - asserts that /actual/ is a
number less than /expected/

* assert_greater_than(actual, expected, description) - asserts that /actual/ is
a number greater than /expected/

* assert_less_than_equal(actual, expected, description) - asserts that /actual/
is a number less than or equal to /expected/

* assert_greater_than_equal(actual, expected, description) - asserts that
/actual/ is a number greater than or equal to /expected/

* assert_regexp_match(actual, expected, description) - asserts that /actual/
matches the regexp /expected/

* assert_class_string(object, class_name, description) - asserts that the class
string of /object/ as returned in `Object.prototype.toString` is equal to
/class_name/.

* assert_own_property(object, property_name, description) - assert that object
has own property property_name

* assert_inherits(object, property_name, description) - assert that object does
not have an own property named `property_name` but that `property_name` is
present in the prototype chain for object

* assert_idl_attribute(object, attribute_name, description) - assert that an
object that is an instance of some interface has the attribute attribute_name
following the conditions specified by WebIDL

* assert_readonly(object, property_name, description) - assert that property
property_name on object is readonly

* assert_throws(code, func, description)

    code - the expected exception:

        string: the thrown exception must be a DOMException with the given
name, e.g., "TimeoutError" (for compatibility with existing tests, a constant
is also supported, e.g., "TIMEOUT_ERR")

        object: the thrown exception must have a property called `name` that
matches code.name

        null: allow any exception (in general, one of the options above should
be used)

    func - a function that should throw

* assert_unreached(description) - asserts if called. Used to ensure that some
codepath is *not* taken e.g. an event does not fire.

* assert_any(assert_func, actual, expected_array, extra_arg_1, ... extra_arg_N)
- asserts that one `assert_func(actual, expected_array_N, extra_arg1, ...,
extra_arg_N)` is true for some expected_array_N in expected_array. This only
works for `assert_func` with signature `assert_func(actual, expected, args_1,
..., args_N)`. Note that tests with multiple allowed pass conditions are bad
practice unless the spec specifically allows multiple behaviours. Test authors
should not use this method simply to hide UA bugs.

* assert_exists(object, property_name, description) - *** deprecated ***
asserts that object has an own property property_name

* assert_not_exists(object, property_name, description) - *** deprecated ***
assert that object does not have own property property_name

## Template code

A template is just a javascript structure. An element is represented as:

    [tag_name, {attr_name:attr_value}, child1, child2]

the children can either be strings (which act like text nodes), other templates
or functions (see below)

A text node is represented as

    ["{text}", value]

String values have a simple substitution syntax; `${foo}` represents a variable
"foo".

It is possible to embed logic in templates by using a function in a place where
a node would usually go. The function must either return part of a template or
null.

In cases where a set of nodes are required as output rather than a single node
with children it is possible to just use a list

    [node1, node2, node3]

Usage:

* render(template, substitutions) - take a template and an object mapping
variable names to parameters and return either a DOM node or a list of DOM
nodes
* substitute(template, substitutions) - take a template and variable mapping
object, make the variable substitutions and return the substituted template
