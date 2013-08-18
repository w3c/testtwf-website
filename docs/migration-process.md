---
layout: docs
title: Migration Process for Working Groups
---

# Migration Process for Working Groups

Migrating to the [common GitHub repository][web-platform-tests] is an opt-in
process for Working Groups. While the cost of migrating might be significant
for certain Working Groups, the benefits of sharing a common infrastructure,
repository and processes should outweigh it by far.

The following workflow will help a WG migrate to Github as easy as possible.

## Naming the directories after the TR shortnames

<!--
  TODO this section needs to move to its own page: "How to setup a new test suite."
-->

<!--
  TODO this needs information on the manifest format, see:
  http://lists.w3.org/Archives/Public/public-test-infra/2013JulSep/0075.html
  http://lists.w3.org/Archives/Public/public-test-infra/2013JulSep/0080.html
-->

A WG should name the directories after the [TR][2] shortnames in order to
match their [TR][2] counterparts. Each top-level directory represents a W3C
specification: the name matches the shortname used after the canonical
address of the said specification under [http://www.w3.org/TR/][2].

For all of the specifications, the tree under the top-level directory
represents the sections of the respective documents, using the section IDs
for directory names, with a maximum of three levels deep.

So if you're looking for tests in HTML for "The History interface", they will
be under `html/browsers/history/the-history-interface/`.

Various resources that tests depend on are in `common`, `images`, and
`fonts`.

In order to function properly, tests need to be run from a web server that
has [`testharness.js`][3] in `/resources/`.

If you're looking at a section of the specification and can't figure out
where the directory is for it in the tree, just run:
`node tools/scripts/id2path.js your-id`

## Set up Team

<!--
  TODO we need to describe a clearer process here, including who to send the
  email to + to add github handles for all reviewers.
-->

You also need to get someone to setup a team for the group that has access to
the repository.

## Initial Submission Process

Once you have defined the directories where the tests of your specification
will be located and the team has been set up, you just need to follow the
normal Git workflow as follows:

<!--
  TODO all but step 7 are explained elsewhere already. We should point to the
  regular submission flow article and just add the disclaimer that sits in step 7.
-->

1. Create the top level directory under an appropriate branch of
[web-platform-tests][web-platform-tests]. Note that the top level directory may be directly
under [web-platform-tests][web-platform-tests] directory.

2. Fork the top level directory, which is empty.

3. Create a branch for your initial set of tests that you want to migrate.

4. Add your set of tests and commit.

5. Push that to your GitHub repository

6. Send in a pull request based on the above

7. Anyone in your team can merge the pull request. Because this is a
migration of your existing tests, the review process is bypassed. But it
doesn't hurt if you want the tests to be reviewed before they are merged.

## How newly created WG should submit their tests.

<!--
  TODO not sure how having two different process here is valuable.
  I'd scratch that altogether.
-->

If your WG is newly created, or your specification doesn't have any tests
yet, it is even simpler. You just need to:

1. Create top level repositories under [web-platform-tests][web-platform-tests], one directory
for each specification.

2. Fork the top level directory which you intend to work on some tests.

3. Create a branch to start to work there.

4. Once your work is done, add the set of tests and commit.

5. Push that to your GitHub repository

6. Send in a pull request based on the above

7. Someone in your team can review and merge.

[web-platform-tests]: https://github.com/w3c/web-platform-tests
[2]: http://www.w3.org/TR/
[3]: https://github.com/w3c/testharness.js
