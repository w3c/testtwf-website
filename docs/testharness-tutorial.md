---
layout: docs
type: [jstest]
title: Testharness.js Tutorial
---

This document provides a tutorial for W3C's test framework, known as
`testharness.js`, which you can clone from its [GitHub Repository][1].

This tutorial does not assume that you are necessarily familiar with other
test frameworks, but it does expect you to be reasonably proficient with
JavaScript since JavaScript APIs is what one tests using this.

If you are familiar with other test frameworks such as [QUnit][2],
[Mocha][3], or [Jasmine][4] then you should find your way around here
relatively easily.

Indeed, `testharness.js` is not very different from those, though it does
have a number of features that make it particularly well suited to testing
APIs implemented by the browser and exposed _to_ JavaScript rather than those
created in JavaScript directly.

## Getting Started

<!--
  TODO This should describe how to include testharness.js as a submodule in 
  web-platform-tests.
-->

Let's get started with this code! The first thing you need to do to load
`testharness.js` is to include it from a `script` element in the usual way.
You can either [download your own copy][1] and set it up locally whichever way you
want, or if you're writing a test for a W3C service you should just point to
the W3C copy:

``` html
<script src="/resources/testharness.js"></script>
<script src="/resources/testharnessreport.js"></script>
```

At which point you might rightfully ask why there are two files. The reason
for this is simple: the first one is the actual implementations, and the
second one is empty. Why include an empty file? The idea is that when a
specific vendor checks your test suite out, they can override the content of
the `testharnessreport.js` file. This makes it possible for them to integrate
running the test suite with whatever test reporting tool they may be using
internally.

If you wish the HTML page into which your tests are being run to render
results in a nice and convenient table, you should include an HTML element
with ID `log` where you would like those results to appear. See the bottom of
this document for an example.

## Basic Testing

The most basic usage relies on the `test()` function, which takes a function
with the code to run, a name of the test, and optionally a literal object
providing some additional options.

```js
test(function () {
    assert_true(true);
}, "True really is true");
```

The given function _must_ include at least one assertion; conversely,
assertions can only appear in the context of a test function. A single test
may contain multiple assertions, in which case it is considered to be atomic.
That is to say that a single failed assertion will fail the test, whereas all
are required to pass for the whole test to pass. A document can contain as
many tests as you wish it to.

The example here contains two assertions, both of which pass.

```js
test(function () {
    assert_true(true);
    assert_false(false);
}, "Truth is what you believe it to be");
```

But in this example one passes, while the other fails. This causes the entire
test to be reported as a failure.

```js
test(function () {
    assert_true(true);
    assert_false(true);
}, "All opinions are equally valid.");
```

In addition to a function and a name, `test()` can also accept a third
parameter being a dictionary of options. Most of those options are documented
in the [Including Metadata][7] section below.

The only general-purpose option that you can use is `timeout`. It takes a
number of milliseconds (defaulting to 1000, which the brightest at maths
amongst you will have recognised as being equivalent to one second). If the
content of the test takes longer than `timeout` to run, then the test is
aborted and counted as a fail. Since some processing can take longer than one
second to run, especially if you are performing a complex test in a low-end
environment (e.g. a basic mobile phone) it can at times be useful to increase
this limit as exemplified here.

```js
test(function () {
    /* do something long and slow here */
    assert_true(true);
}, "Long operation is successful", { timeout: 5000 });
```

Note that you do not want to use this for asynchronous operations (if only
because it won't work). For those, see the section dedicated to that topic
below.

## Included Assertions

There is a good choice of assertions available by default. Most of those take
the form `assert_something(actual, expected, description)` but several have
different signatures. When a `description` is part of the signature, it is
optional and a string intended for human consumption in order to provide a
better description of which assertion exactly failed. If you don't provide
it, you will get a default error message instead.

`assert_true(actual, description)` checks that `actual` is _strictly_ equal
to `true`, which is to say that it _has_ to be the JavaScript "true" value
and not just someting that evaluates as "truthy" such as `1` or `"dahut"`.

```js
test(function () {
    assert_true(true, "Truth is true");
    assert_true(1 === 1, "One is really one");
}, "Simple checks on truth");
```

`assert_false(actual, description)` is the same as `assert_true` but in
reverse. It has the same strictness about its `actual` being JavaScript's
`false` and not just "falsy" (e.g. 0, null).

```js
test(function () {
    assert_false(false, "Falsity is false");
    assert_false(1 === 0, "One is not zero");
}, "Simple checks on falsity");
```

`assert_equals(actual, expected, description)` checks that `actual` and
`expected` have the same value (and are in fact the same object). Note that
this comparison is strict and that you should not rely on whatever automatic
type conversions that JavaScript may perform on comparisons.

```js
test(function () {
    assert_equals("dahut", "da" %2B "hut", "String concatenation");
    assert_equals(42, 6 * 7, "The ultimate answer");
}, "Simple checks on equality");
```

`assert_not_equals(actual, expected, description)` is the reverse of
`assert_equals` and checks that its /actual/ and /expected/ are not the same.
The same caveat on comparison strictness applies, so that values that may
seem very similar are still not equal.

```js
test(function () {
    assert_not_equals("dahut", "myth", "String comparison");
    assert_not_equals(42, "42", "The ultimate answer");
}, "Simple checks on unequality");
```

`assert_in_array(actual, expected, description)` checks that `actual` is in
the array provided in `expected`. Any odd member will do, but note that it
will not recurse into the array if it is multidimensional.

```js
test(function () {
    assert_in_array("dahut",
                    "chupacabra dahut unicorn".split(" "),
                    "Dahut hunting");
    assert_in_array(2017, [42, 47, 62, 2017] , "Lottery");
}, "Simple checks on membership");
```

`assert_array_equals(actual, expected, description)` takes an array for both
`actual` and `expected`, and validates that they have the same length and
that each item is `assert_equals` its corresponding member in the other
array. Just like the previous assertion, this is unidimensional.

```js
test(function () {
    assert_array_equals(["chupacabra", "dahut", "unicorn"],
                        "chupacabra dahut unicorn".split(" "),
                        "Dahut hunting");
    assert_array_equals([4, 9, 16],
                        [2, 3, 4].map(function (x) { return x * x; }),
                        "Square");
}, "Checks on identical membership");
```

`assert_approx_equals(actual, expected, epsilon, description)` takes a
numerical `actual` value and checks that it is within `epsilon` of
`expected`. This is notably useful for floating point calculations in which
you know that some drift may occur and you need to check that the outcome is
within a given ballpark but it can also be used in other cases.

```js
test(function () {
    assert_approx_equals(Math.PI, 3.14, 0.01, "Roughly circular");
    assert_approx_equals(42, 47, 5, "47 is almost 42");
}, "Checks on epsilon equality");
```

`assert_regexp_match(actual, expected, description)` checks that `actual`
matches the `expected` regular expression. The latter can be as simple or
complex as you wish to make it, and can be created with flags.

```js
test(function () {
    assert_regexp_match(document.title,
                        /^\w{5}-\w{10,12}\.js$/,
                        "That's my title");
    assert_regexp_match("A", /a/i, "Matching lowercase");
}, "Checks using regular expressions");
```

`assert_own_property(object, property_name, description)` checks that
`object` has a property that is truly its own (as opposed to inherited down
the prototype chain). JavaScripters will recognise this as checking
`hasOwnProperty`. If you don't know about this important method, you can
[read up about it on MDN][5].

```js
test(function () {
    var gollum = { ring: "MIIIIINE!!!!" };
    assert_own_property(gollum, "ring", "Tricksy hobbitses!");
    /* this will fail even though `gollum` has `toString`. */
    assert_own_property(gollum,
                        "toString",
                        "I have that property, but it'ssss not mine.");
}, "Checks for property ownership");
```

`assert_inherits(object, property_name, description)` complements 
`assert_own_property` in that it similarly checks that the attribute is
available on the object, but asserts that it is _not_ the object's own
property but rather has been inherited down the prototype chain.

```js
test(function () {
    var gollum = { ring: "MIIIIINE!!!!" };
    /* this will succeed here */
    assert_inherits(gollum,
                    "toString",
                    "I have that property, but it'ssss not mine.");
    assert_inherits(gollum,
                    "hasOwnProperty",
                    "This one works too.");
}, "Checks for property inheritance");
```

`assert_idl_attribute(object, attribute_name, description)` is the same as
`assert_inherits` and simply aliases it. For clarity, you may be better off
sticking to the previous one.

`assert_readonly(object, property_name, description)` checks that the given
`property_name` on `object` is properly read-only and therefore cannot be
set.

```js
test(function () {
    assert_readonly(document, "nodeType", "You cannot change nodeType.");
}, "Checks for attribute readonlyness");
```

`assert_throws(code, func, description)` is a powerful way of checking that
code throws when and how you expect it to, knowing that the code in `func` is
what must trigger the exception. This assertion works differently depending
on what you pass for `code`.

If `code` is `null`, then any old exception will do (this is not a
particularly recommended check as the others are more useful).

```js
test(function () {
    assert_throws(null,
                  function () { document.appendChild(document); },
                  "Any exception.");
}, "Checks for exceptions (null)");
```

If `code` is any kind of object, then its `name` attribute is checked. That
attribute must match the `name` attribute on the exception being thrown. This
means that you can pass a specific `DOMException` object here and have it
match if it's what is being thrown.

```js
test(function () {
    assert_throws({ name: "Bad Kitten!" },
                  function () { throw { name: "Bad Kitten!"}; },
                  "Any exception with the right name.");
}, "Checks for exceptions (object)");
```

If `code` is a string then it must be one of the commonly recognised
`DOMException` names, and it checks that `func` throws the corresponding
`DOMException`. For compatibility with older browsers, the old exception
contacts are supported and mapped to the newer name; so for instance you can
use `WRONG_DOCUMENT_ERR` to mean `WrongDocumentError`. The latter style is
preferred however.

```js
test(function () {
    assert_throws("HierarchyRequestError",
                  function () { document.appendChild(document); },
                  "Specific DOM exception.");
}, "Checks for exceptions (string)");
```

`assert_unreached(description)` is a very simple assertion the role of which
is to check that some code is indeed unreachable. It only takes a
description, and simply always throws its hands up in disgust whenever it is
called. Opposite here you can see a case in which it is successful (since
untouched).

```js
test(function () {
    if (true) return "where you came from";
    assert_unreached("Can't Touch This");
}, "Simple check on unreachability");
```

Whereas this one fails because the code reaches it.

```js
test(function () {
    assert_unreached("Reaching where no coder has reached before");
}, "Failed check on unreachability");
```

## Asynchronous Testing

It is increasingly rare for Web APIs to be entirely synchronous. Many of the
modern ones are very careful to be asynchronous whenever an operation may
take a little time and therefore freeze the main thread. Testing asynchronous
APIs is naturally different from testing synchronous code since results from
asynchronous calls by their very nature do not follow the nicely linear flow
of synchronous calls.

Thankfully, `testharness.js` makes testing asynchronous APIs pretty much just
as easy as testing synchronous APIs, with all the assertions being the same
and only some small details of how the tests are set up being different. We
will start with an example testing that setTimeout works.

First, instead of calling `test(func, name, options)` we call
`async_test(name, options)` and hold on to its return value the latter is
the object with which we will interact to control the flow of our
asynchronous test. As you can see, the `name` and `options` parameters that
`async_test()` accepts are exactly the same as those used by `test()`, and
`options` is just as optional.

```js
var stTest = async_test("Testing setTimeout()");
```

We will use our setTimeout call to perform an assertion, and flag that the
test is over. This will cancel the timeout and if the assertion is successful
(in our case it trivially is) then the test passes. This is performed with
two operations: first, the `step()` method is used to define the individual
test to be run (just as with the first argument to `test()`); second, the
`done()` method is called to tell `testharness.js` that the entire test has
run.

```js
setTimeout(function () {
    stTest.step(function () {
        assert_true(true, "Truth is asynchronously true.");
    });
    stTest.done();
}, 10);
```

It is often the case that in testing asynchronous code one needs to assign
event handlers to specific `onfoo` fields of an object. This can be done with
`step()` but it is somewhat cumbersome since that call to `step()` needs
itself to be wrapped inside a function. There is a shortcut for precisely
this usage: `step_func`. What it does is take a function exactly like
`step()` does, but returns a function that can be used directly as an event
handler. The XHR example opposite makes use of that facility.

```js
var xhrTest = async_test("Testing XHR access")
,   xhr
;
/* this in a step because it could throw */
xhrTest.step(function () {
    xhr = new XMLHttpRequest();
    xhr.open("GET", "using-testharness.html");
    xhr.onreadystatechange = xhrTest.step_func(function (ev) {
        assert_true(ev.isTrusted, "readystatechange is a trusted event");
        assert_false(ev.bubbles, "readystatechange is does not bubble");
        xhrTest.done();
    });
    xhr.send();
});
```

## Testing vendor-prefixed features

While the expectation is that new features will no longer be deployed
using vendor prefixes, there are still vendor-prefixed features that
need to be tested.

To minimize the impact of these vendor-prefixes and make it easy to run
test suites without these prefixes, a dedicated script is available to
declare the need and usage of prefixed features.

To build a test case for a vendor-prefixed feature, add the following
script **after** the `testharness*.js` scripts:

``` html
<script src="/common/vendor-prefix.js"></script>
```

You then need to declare which features need to be used with a vendor
prefix. This is done by setting `data-prefixed-objects` and
`data-prefixed-prototypes` attributes on that script element.

Both these attributes take a JSON-encoded array of objects value describing
where to apply the prefix. Each such object has a property `ancestors`, and
a proprety `name`: `ancestors` contains a list of object names describing
the hierarchy on which the prefixed-feature lives, and `name` is the
unprefixed name of the feature.

If the vendor prefix is applied to a well-known object in the global
namespace, you would declare it via the `data-prefixed-objects` attribute.
If the vendor prefix is applied to objects that get instantiated from
well-known interfaces, you would declare it via the
`data-prefixed-prototypes` attribute.

For instance, a [Media Capture and Streams API][GUM] test need the
following prefixes:

* the method `navigator.getUserMedia` is deployed with vendor prefixes
(e.g. as `navigator.mozGetUserMedia` and navigator.webkitGetUserMedia`)
* the property `srcObject` of an `HTMLMediaElment` instance is deployed
with vendor prefixes (e.g. as `vid.mozSrcObject`)

To make it possible to write tests as if these features were not prefixed,
one would add the following script declaration:

``` html
<script src="vendor-prefix.js"
  data-prefixed-objects =  '[{"ancestors":["navigator"],
                              "name":"getUserMedia"}]'
  data-prefixed-prototypes='[{"ancestors":["HTMLMediaElement"],
                              "name":"srcObject"}]'>
</script>
```


## Including Metadata

If you are writing tests for inclusion in the [W3C Testing Framework][6]
(and if you're writing those tests for a W3C group, then you really should),
then this section can be of interest to you. If not, you can safely skip it.

In order to best integrate into the Testing Framework, your tests ought to
have metadata. If you have only one test per HTML file, then your test
metadata should be contained in the  section of your document and, again, you
can safely skip over this section. If, however, you wish to include an entire
test suite in a single document (which you certainly can do) then it is
useful to specify test metadata for every call to `test()`.

This can be achieved very simply by providing the test metadata as part of
the third parameter to `test()` which we have seen earlier. There are three
fields that you can use: `help` which is a pointer to the section of the
specification that this test is exercising; `assert` which is an array of
assertion description that your test contains; and `author` which is simply
the author of the test.

```js
test(function () {
        assert_true(true, "The spec says it's true.");
    },
    "True is true as per spec",
    {
        help:   "http://w3.org/TR/some-specification#truth-and-beauty",
        assert: ["Truth is true, you know."],
        author: "Robin Berjon "
    }
);
```

## Advanced Usage

Most users should not need this section. Read it if you are trying to achieve
something complex that is not working, or if you are curious but don't
worry if it does not seem to make much sense as oftentimes you will not need
it.

### Complex Setup

Sometimes it is important either to perform complex setup operations for a
test run, or to modify the overall behaviour of the test run, or both. These
can be performed by using the `setup(func, properties)`. Either of its
arguments is optional, so it can also be called as `setup(func)` and
`setup(properties)`.

Once the first test has run, any call to `setup()` is immediately short-
circuited so none of the examples in this section actually do anyting (you're
expected to only have one `setup()` anyway) but they are still useful for
their illustrative value.

Essentially, anything that happens in `setup()`'s function (when used) stays
in `setup()`'s function. This allows massive failure to happen there and for
the test to still attempt a run.

```js
setup(function () {
    throw new Error("BOOM!");
});
```

The `properties` parameter is a dictionary that can take four fields.

`timeout: ms`. This sets the timeout not for a single test (as with the other
`timeout` option) but rather for the entire set of tests in the page. You can
use this if you are concerned about the entire run being slow even though
individual tests may not be triggering their own timeouts.

```js
/* time out after 20 seconds */
setup({ timeout: 20000 });
```

`explicit_done: true | false`. Normally, a test run is considered complete
(and the report generated, etc.) whenever the document's load event triggers
and all synchronous tests have reported values (or timed out), and if there
are asynchronous tests when those have either run or timed out as well. In
other words, under normal operations the system knows how to guess when a
test run is complete and does not need you to tell it. You may wish to
override this behaviour if you are doing something that could confuse the
system, such as for instance asynchronously loading or generating new tests.
If that is the case, then set `explicit_done` to `true` and when you know
you're done with all the tests you want to run, call the global `done()`
function yourself.

It is important to note that if you wish to use `explicit_done` you _must_
set it to true _before_ the load event triggers. Otherwise, you will spend a
lot of time wondering why nothing is working in the way you expect.

```js
setup({ explicit_done: true });
/* ... at some point later... */
done();
```

`output_document: Document`. By default the runner will log the test results
inside an element with an ID of `log` inside the same document that the tests
are being run in. This works well for the vast majority of cases, but in some
situations you will want something different. The test run document may be
included in a larger one in which you would like to see the test to appear,
or you may wish to open a popup or new tab and write the results there. More
typically, if you are running tests inside an SVG document, providing a `log`
element will do you little good unless it can be rendered as HTML. In that
case, you will want to redirect the output to an HTML document. For all of
those, just pass a Document object to `output_document`.

```js
setup({ output_document: window.parent.contentDocument });
setup({ output_document: document.getElementById
                         ("someIFrame").contentDocument });
```

`explicit_timeout: true | false`. In some cases you don't want to handle
timeouts yourself at all (typically because your tests are being run in the
context of a larger test runner that is controlling timeouts on your behalf).
If that is the case, then simply set `explicit_timeout` to `true` and have
whatever is in charge of controlling timeouts call the global `timeout()`
function directly.

```js
setup({ explicit_timeout: true });
/* ... at some point later if there really is a time out... */
timeout();
```

### Formatting

At times when you wish to report issues in a test suite, or simply log
something during development, it can be very valueable to produce output that
is more human-oriented than what `toString()` is most likely to provide most
of the time (there is only so much you can infer from `[object Object]`). For
those times, simply use the global `format_value(value)`. It knows how to
format arrays (by recursing into them), strings with control characters,
JavaScript core types including negative zero, and the more important DOM
Node types.

```js
format_value(document);
format_value("foo bar");
format_value([-0, Infinity]);
```

## Generating Tests

Writing tests can be a very repetitive endeavour. At times, you simply need
to call the same assertion on a long list of actual and expected values, and
when that happens the overhead of the testing boilerplate, no matter how
lightweight it has been made to be, can seem overwhelming.

In order to make your life ever so simpler, `testharness.js` provides a very
simple function that will call the same assertion repeatedly on a list of
actual and expected values each described by a name. The signature for that
is `generate_tests(assert_something, [ [name, actual, expected], ...])`.

```js
generate_tests(assert_equals, [
                                [ "Square of 2", 2 * 2, 4 ],
                                [ "Square of 3", 3 * 3, 9 ],
                                [ "Square of 4", 4 * 4, 16 ],
                                [ "Square of 5", 5 * 5, 25 ],
                                [ "Square of 6", 6 * 6, 36 ]
                              ]
);
```

## Callbacks

At times it can be useful to know what is going on inside the test harness so
that you can react to it and build your own behaviour (for instance,
producing your own reports or integrating with a larger testing system that
you may be using).

For that purpose, `testharness.js` provides a set of events that you can be
informed of if you so desire. The first way in which you can be notified of
these events is, if you are in the same context as the tests being run and
can run code before they start, to simply register some callbacks. The second
way to be notified is if you are running the test in its own iframe (or
object element) contained in the document that is your context (any level
down) by creating a function with a specific name that will be called for
you. (Be careful with this latter approach that these calls will not happen
across origin boundaries).

`start`. Setup has happened and the first test has been created. This is the
point at which your wrapper can do its own setup.

```js
/* in same context */
add_start_callback(function () {
    console.log("The tests have started running.");
});
/* in enclosing context */
function start_callback () {
    console.log("The tests have started running.");
}
```

`result`. Happens whenever a result is produced. It receives a `Test` object
that has a `status` field which can be compared to the `PASS`, `FAIL`,
`TIMEOUT`, or `NOTRUN` fields on the same object, meaning respectively that
the test has passed, failed, timed out, or hasn't run at all; and a `message`
field providing the error message, if any.

```js
/* in same context */
add_result_callback(function (res) {
    console.log("Result received", res);
});
/* in enclosing context */
function result_callback (res) {
    console.log("Result received", res);
}
```

`complete`. Happens when the test run has terminated (successfully or not).
It receives an array of `Test` objects just like the one passed to `result`
corresponding to all the results, and a status object describing the state of
the entire run, which has a `status` field which can be compared to the `OK`,
`ERROR`, and `TIMEOUT` fields on the same object and respectively mean that
the suite has entirely succeeded, that it has failed, or that there has been
a time out.

```js
/* in same context */
add_completion_callback(function (allRes, status) {
    console.log("Test run completed", allRes, status);
});
/* in enclosing context */
function completion_callback (allRes, status) {
    console.log("Test run completed", allRes, status);
}
```

[1]: /docs/github-101.html#clone-the-submodules
[2]: http://docs.jquery.com/QUnit
[3]: http://visionmedia.github.com/mocha/
[4]: http://pivotal.github.com/jasmine/
[5]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
[GUM]: http://dev.w3.org/2011/webrtc/editor/getusermedia.html
[6]: http://w3c-test.org/framework/
[7]: #including-metadata
