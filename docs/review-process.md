---
layout: docs
type: [review]
title: Test Review and Approval Process
---

## Test Review Policy

In order to encourage a high level of quality in the W3C test
suites, test contributions must be reviewed by a peer.

Reviewers may be:

- Spec editors
- The test coordinator for that spec
- An implementor
- Anyone with the ability to read and understand the spec along
with an understanding of the [format][format] and [style][style] guidelines 

**The reviewer can be a colleague of the contributor as long as the**
**proceedings are public.**

**A reviewer cannot review his/her own tests and changes.**

*To assist with test reviews, a [review checklist][review-checklist]*
*is available.*

## Test Review and Approval Process on Github

The preferred method for reviewing tests is on Github. The general 
workflow for test reviews and approval follows the GitHub
contribution model and is summarized here: 

* To initiate a review, make a Pull Request to the main 
```web-platform-tests/master``` or ```csswg-test/master``` on 
GitHub. This will notify all subscribers of the PR, including 
the test coordinator and test reviewers.
* Reviewers should review the test code and reply accordingly in 
Github. If no issues are found, the reviewer should state that so 
there is a trail a review was done. 
* After all of the review issues are addressed, the PR will be 
merged into the repository. The merge may be done by the spec's Test 
Facilitator or someone that is overseeing the test repository.
* The merged tests are considered Approved.

## Labels

Pull requests get automatically labelled in the Github repository. Check
out the list of labels in Github [https://github.com/w3c/web-platform-tests/issues][issues]
to see the open pull requests for a specific area.

## Using Critic

Critic is a tool to help review of the code in the pull requests and is complementary
to the Github tools. If you're interested in being a reviewer for an area in the repository,
make sure you create an account in critic, add your proper email address, and add filters
to monitor specific directories. Your name will be automatically added to the list of
reviewers after that and you'll get notify if something comes up


[format]: ./test-format-guidelines.html
[style]: ./test-style-guidelines.html
[review-checklist]: ./review-checklist.html
[issues]: https://github.com/w3c/web-platform-tests/issues
