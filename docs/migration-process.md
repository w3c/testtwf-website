---
layout: docs
type: [migration]
title: Migration Process for Working Groups
---

Migrating to the [common GitHub repository][web-platform-tests] is an opt-in
process for Working Groups. While the cost of migrating might be significant
for certain Working Groups, the benefits of sharing a common infrastructure,
repository and processes should outweigh it by far.

The following workflow will help a WG migrate to Github as easy as possible.

## Naming the directories after the TR shortnames

<!--
  TODO this section needs to move to its own page: "How to setup a new test suite."
-->

A WG should name the directories after the [TR][2] shortnames in order to
match their [TR][2] counterparts. Each top-level directory represents a W3C
specification: the name matches the shortname used after the canonical
address of the said specification under [http://www.w3.org/TR/][2].

For all specifications, the tree under the top-level directory
represents the sections of the respective documents, using the section IDs
for directory names.

So if you're looking for tests in HTML for "The History interface", they will
be under `html/browsers/history/the-history-interface/`.

Various resources that tests depend on are in `common`, `images`, and
`fonts`.

If you're looking at a section of the specification and can't figure out
where the directory is for it in the tree, just run:
`node tools/scripts/id2path.js your-id`

## Spec metadata

As we build tools on top of GitHub to ease test contribution and review, it
becomes useful to gather meta-data about the test suite for each spec. This
is why all specs must have a `manifest.json` file in their root directory.

For now, this file needs the following information in JSON format:

- the specs's test coordinator's GitHub handle (the `coordinator` property,
  takes a string),
- spec reviewers' GitHub handle (the `reviewers` property, takes an array
  of strings), and
- the mailing list(s) to which new pull requests need to be sent (accepts
  an array of strings).

### Example

``` json
{
    "coordinator": "KrisKrueger",
    "reviewers": ["KrisKrueger", "jgraham", "Ms2ger"],
    "mailingLists": [
        "public-webapps-testsuite@w3.org",
        "public-pfwg-test@w3.org"
    ]
}
```

<!--
  TODO this needs information on the manifest format, see:
  http://lists.w3.org/Archives/Public/public-test-infra/2013JulSep/0075.html
  http://lists.w3.org/Archives/Public/public-test-infra/2013JulSep/0080.html
-->

## Set up Team

In order for the test coordinator and the reviewers listed in the `manifest.json` file
to be granted commit access to the repository, please send an email to the
[public-test-infra@ mailing list][public-test-infra] with a pointer to the manifest
file.

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

[public-test-infra]: mailto:public-test-infra@w3.org?subject=[github-access-request]
[web-platform-tests]: https://github.com/w3c/web-platform-tests
[2]: http://www.w3.org/TR/
[3]: https://github.com/w3c/testharness.js
