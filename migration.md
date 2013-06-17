---
layout: default
title: Migration Process for a WG
---

# Migration Process for a WG

All WGs need to migrate their tests to the [same repository in Github][1].
Some WGs have already started, or even nearly completed the migration. For
some WGs, such as CSS, migrating to Github may be more complex.

The following workflow will help a WG migrate to Github as easy as possible.

## Naming the directories after the TR shortnames

A WG should name the directories after the [TR][36] shortnames in order to
match their [TR][36] counterparts. The following is the list of current
directories under [web-platform-tests of Github][1].

* [2dcontext][2]

* [DOMEvents][3]

* [ElementTraversal][4]

* [FileAPI][5]

* [IndexedDB][6]

* [WebCryptoAPI][7]

* [WebIDL][8]

* [XMLHttpRequest][9]

* [common][10]

* [dom][11]

* [domxpath][12]

* [eventsource][13]

* [ext-xhtml-pubid][14]

* [fonts][15]

* [harness][16]

* [html][17]

* [images][18]

* [js][19]

* [media][20]

* [mediacapture-streams][21]

* [microdata][22]

* [old-tests][23]

* [pointerevents][24]

* [progress-events][25]

* [reporting][26]

* [selectors-api][27]

* [shadow-dom][28]

* [tools][29]

* [typedarrays][30]

* [webgl][31]

* [webmessaging][32]

* [websockets][33]

* [webstorage][34]

* [workers][35]

Each top-level directory represents a W3C specification: the name matches the
shortname used after the canonical address of the said specification under
[http://www.w3.org/TR/][36].

For some of the specifications, the tree under the top-level directory
represents the sections of the respective documents, using the section IDs
for directory names, with a maximum of three levels deep.

So if you're looking for tests in HTML for "The History interface", they will
be under `html/browsers/history/the-history-interface/`.

Various resources that tests depend on are in `common`, `images`, and
`fonts`.

In order to function properly, tests need to be run from a web server that
has [`testharness.js`][37] in `/resources/`.

If you're looking at a section of the specification and can't figure out
where the directory is for it in the tree, just run:
`node tools/scripts/id2path.js your-id`

## Set up Team

You also need to get someone to setup a team for the group that has access to
the repository.

## Initial Submission Process

Once you have defined the directories where the tests of your specification
will be located and the team has been set up, you just need to follow the
normal Git workflow as follows:

1. Create the top level directory under an appropriate branch of
[web-platform-tests][1]. Note that the top level directory may be directly
under [web-platform-tests][1] directory.

2. Fork the top level directory, which is empty.

3. Create a branch for your initial set of tests that you want to migrate.

4. Add your set of tests and commit.

5. Push that to your GitHub repository

6. Send in a pull request based on the above

7. Anyone in your team can merge the pull request. Because this is a
migration of your existing tests, the review process is bypassed. But it
doesn't hurt if you want the tests to be reviewed before they are merged.

## How newly created WG should submit their tests.

If your WG is newly created, or your specification doesn't have any tests
yet, it is even simpler. You just need to:

1. Create top level repositories under [web-platform-tests][1], one directory
for each specification.

2. Fork the top level directory which you intend to work on some tests.

3. Create a branch to start to work there.

4. Once your work is done, add the set of tests and commit.

5. Push that to your GitHub repository

6. Send in a pull request based on the above

7. Someone in your team can review and merge.

[1]: https://github.com/w3c/web-platform-tests
[2]: https://github.com/w3c/web-platform-tests/tree/master/2dcontext
[3]: https://github.com/w3c/web-platform-tests/tree/master/DOMEvents
[4]: https://github.com/w3c/web-platform-tests/tree/master/ElementTraversal
[5]: https://github.com/w3c/web-platform-tests/tree/master/FileAPI
[6]: https://github.com/w3c/web-platform-tests/tree/master/IndexedDB
[7]: https://github.com/w3c/web-platform-tests/tree/master/WebCryptoAPI
[8]: https://github.com/w3c/web-platform-tests/tree/master/WebIDL
[9]: https://github.com/w3c/web-platform-tests/tree/master/XMLHttpRequest
[10]: https://github.com/w3c/web-platform-tests/tree/master/common
[11]: https://github.com/w3c/web-platform-tests/tree/master/dom
[12]: https://github.com/w3c/web-platform-tests/tree/master/domxpath
[13]: https://github.com/w3c/web-platform-tests/tree/master/eventsource
[14]: https://github.com/w3c/web-platform-tests/tree/master/ext-xhtml-pubid
[15]: https://github.com/w3c/web-platform-tests/tree/master/fonts
[16]: https://github.com/w3c/web-platform-tests/tree/master/harness
[17]: https://github.com/w3c/web-platform-tests/tree/master/html
[18]: https://github.com/w3c/web-platform-tests/tree/master/images
[19]: https://github.com/w3c/web-platform-tests/tree/master/js
[20]: https://github.com/w3c/web-platform-tests/tree/master/media
[21]: https://github.com/w3c/web-platform-tests/tree/master/mediacapture-streams
[22]: https://github.com/w3c/web-platform-tests/tree/master/microdata
[23]: https://github.com/w3c/web-platform-tests/tree/master/old-tests
[24]: https://github.com/w3c/web-platform-tests/tree/master/pointerevents
[25]: https://github.com/w3c/web-platform-tests/tree/master/progress-events
[26]: https://github.com/w3c/web-platform-tests/tree/master/reporting
[27]: https://github.com/w3c/web-platform-tests/tree/master/selectors-api
[28]: https://github.com/w3c/web-platform-tests/tree/master/shadow-dom
[29]: https://github.com/w3c/web-platform-tests/tree/master/tools
[30]: https://github.com/w3c/web-platform-tests/tree/master/typedarrays
[31]: https://github.com/w3c/web-platform-tests/tree/master/webgl
[32]: https://github.com/w3c/web-platform-tests/tree/master/webmessaging
[33]: https://github.com/w3c/web-platform-tests/tree/master/websockets
[34]: https://github.com/w3c/web-platform-tests/tree/master/webstorage
[35]: https://github.com/w3c/web-platform-tests/tree/master/workers
[36]: http://www.w3.org/TR/
[37]: https://github.com/w3c/testharness.js
