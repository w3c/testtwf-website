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
[2]: http://www.w3.org/TR/
[3]: https://github.com/w3c/testharness.js
