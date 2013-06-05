---
layout: default
title: Github Test Submission
---

# Github Test Submission

All the basics that you need to know are documented on this page, but for the full github documention, visit [https://help.github.com/] (https://help.github.com/).

## Setup

  1. Create a github account if you do not already have one: [https://github.com/] (https://github.com/)

  2. Download and install the latest version of Git: [http://git-scm.com/downloads] (http://git-scm.com/downloads)

  3. Configure your settings so your commits are properly labeled:
    1. On Mac, open the Terminal.
On Windows, open Git Bash (From the Start Menu > Git > Git Bash)
    2. At the prompt, type:
`$ git config --global user.name "Your Name"`
_This will be the name that is displayed with your test submissions_
    3. Next, type:
`$ git config --global user.email "your_email@address.com"`
_This should be the email address you used to create the account in Step 1._
    4. (Optional) If you don't want to enter your username and password every time you talk to the remote server, you'll need to set up password caching.
[Mac Instructions](https://help.github.com/articles/set-up-git#platform-mac)
[Windows Instructions](https://help.github.com/articles/set-up-git#platform-windows)
_On both pages, see 'Password caching'_

## Fork

Now that you have Git set up, you can grab the tests. All of the test repositories are read-only, which means you must fork your own copy. This will enable you to submit your tests using a pull request (more on this below).

  1. In the browser, go the the github page for the test repository:

> HTML5: [https://github.com/w3c/web-platform-tests] (https://github.com/w3c/web-platform-tests)
> CSS: [https://github.com/w3c/csswg-test] (https://github.com/w3c/csswg-test)

  2. Click the ![forkbtn.png] (http://testthewebforward.org/assets/forkbtn.png) button in the upper right.

  3. The fork will take several seconds, then you will be redirected to your github page for this forked repository. If you forked the HTML test repo (for example), you will now be at **https://github.com/yourusername/web-platform-tests**.

  4. Once you've successfully forked the repository, you can now clone it (download the files) to your local machine. Go back to your Terminal (Mac) or Git Bash (Windows) and cd into the directory where you want to keep the tests.

  5. If you forked the HTML tests:
`$ git clone https://github.com/yourusername/web-platform-tests.git`

If you forked the CSS tests:
`$ git clone https://github.com/yourusername/csswg-test.git`

_This will download the tests into a directory named for the repo: /web-platform-tests, /csswg-test_

  6. You should now have a full copy of the test repository on your local machine. Feel free to browse the directories on your hard drive. You can also browse them on the github.com page and see the full history of contributions there.

  7. Next, you'll need to create [branch](#branch).

## Branch

Now that you have everything locally, create a branch for your tests. In Terminal (Mac) or Git Bash (Windows):

> `$ git checkout -b submissions/yourusername`
_This will create a branch named_ `submissions/yourusername` _ and immediately switch this to be your active working branch_

You're ready to start writing tests! Come back to this page you're ready to [commit] (#commit) them or [submit](#submit) them for review.

## Commit

Before you submit your tests for review and contribution to the main test repo, you'll need to first commit them locally, where you now have your own personal version control system with git. In fact, as you are writing your tests, you may want to save versions of your work as you go before you submit them to be reviewed and merged.

  1. When you're ready to save a version of your work, go to the Terminal (Mac) or Git Bash (Windows) and cd to the directory where your files are.

  2. First, ask git what new or modified files you have:
`$ git status `
_This will show you all the differences between your local repo and the original clone it or since your last local commit_.

  3. For all new or modified files, you need to tell git to add them to the list of things you'd like to commit:
`$ git add [file1] [file2] ... [fileN] `
Or:
`$ git add [directory_of_files]`

  4. Run `git status` again to see what you have on the 'Changes to be committed' list. These files are now 'staged'.

  5. Once you've added everything, you can commit and add a message to this set of changes:
`$ git commit -m "new test files from TestTWF" `

  6. Repeat these steps as many times as you'd like before you submit and definitely do this one last time before you do.

## Submit

If you're here now looking for more instructions, that means you've written some awesome tests and are ready to submit them. Congratulations and Welcome Back!

  1. The first thing you do before submitting them to the W3C repo is to push them back up to the server.

In Terminal (Mac) or Git Bash (Windows):
`$ git push https://github.com/yourusername/repo-name.git submissions/yourusername`

Or, for short:
`$ git push origin submissions/yourusername`
_Note: Here,_ `origin` _refers to remote repo from which you cloned (downloaded) the files after you forked, referred to as repo-name.git in the previous example; _`submissions/yourusername` _refers to the name of your local branch that you want to push._

  2. Now you can send a message that you have changes or additions you'd like to be reviewed and merged into the main (original) test repository. You do this by using a pull request. In a browser, open the github page for your forked repository, **https://github.com/yourusername/test-repo**

  3. Click the ![pullrequestbtn.png] (http://testthewebforward.org/assets/pullrequestbtn.png) button.

  4. On the left, you should see the base repo is the w3c/test-repo. On the right, you should see your fork of that repo. In the branch menu of your forked repo, switch to submissions/yourusername

  5. In the Title field, enter a brief description for your submission. Example: Tests for CSS Transforms skew() function.

  6. If you'd like to add more detailed comments, use the comment field below

  7. Click ![sendpullrequest.png] (http://testthewebforward.org/assets/sendpullrequest.png)

That's it! If you're currently at a Test the Web Forward event, find an expert nearby and ask for a review. If you're doing this on your own (AWESOME!), your pull request will be go into a queue and will be reviewed soon. Feel free to email appropriate test suite mailing list and ask for a review.

HTML5:
[public-html-testsuite@w3.org] (mailto:public-html-testsuite%40w3.org)

WebApps:
[public-webapps-testsuite@w3.org] (mailto:public-webapps-testsuite%40w3.org)

CSS:
[public-css-testsuite@w3.org] (mailto:public-css-testsuite%40w3.org)

## Tips & Tricks

  1. Once you have added your files for the first time with `git add [file]`, you dont need to run `git add` %2B `git commit` for all subsequent commits. Instead, you can pass the `-a` flag when you commit:
`$ git commit -a -m "saving a version of my test"`

  2. If you'd like to maintain a master branch in git, you can merge your work from ` submissions/yourusername` as frequently as you like:
`$ git checkout master `
_This will make master your active working branch_
`$ git merge submissions/yourusername`
_This merges your changes from your submissions branch into master_
`$ git push origin master`
_Send it to the server!_
