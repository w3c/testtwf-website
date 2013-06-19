---
layout: default
title: Github Test Submission
---

# Github Test Submission

All the basics that you need to know are documented on this page, but for the
full GitHub documentation, visit [help.github.com/][help]

## Setup

1.  Create a GitHub account if you do not already have one on
    [github.com][github]

2.  Download and install the latest version of Git:
    [http://git-scm.com/downloads][git]. Please refer to the instruction there for
    different platforms.

3.  Configure your settings so your commits are properly labeled:
    * On Mac or Linux or Solaris, open the Terminal.
    * Or on Windows, open Git Bash (From the Start Menu > Git > Git Bash)
    * At the prompt, type:
        
            $ git config --global user.name "Your Name"
        
        _This will be the name that is displayed with your test submissions_
    * Next, type:
        
            $ git config --global user.email "your_email@address.com"
        
        _This should be the email address you used to create the account in Step 1._
    * Next, type:
        
            $ git config --global push.default upstream
        
        This ensures that git push will never unintentionally create or update a
    remote branch.
    
4.  (Optional) If you don't want to enter your username and password every
    time you talk to the remote server, you'll need to set up password caching.
    See [Mac Instructions][mac-setup], or [Windows Instructions][window-setup], or
    [Linux Instructions][linux-setup]. _On all of those pages, see 'Password caching'_.

## Fork

Now that you have Git set up, you can grab the tests. All of the test
repositories are read-only, which means you must fork your own copy. This
will enable you to [submit][submit] your tests using a pull request (more on this
[below][submit]).

1.  In the browser, go the the GitHub page for the test repository:
    * CSS: [github.com/w3c/csswg-test][css-repo]
    * everything else: [github.com/w3c/web-platform-tests][main-repo]

2.  Click the ![fork][forkbtn] button in the upper right.

3.  The fork will take several seconds, then you will be redirected to your
    GitHub page for this forked repository. If you forked the HTML test repo (for
    example), you will now be at
    **https://github.com/username/web-platform-tests**.

4.  Once you've successfully forked the repository, you can now clone it
    (download the files) to your local machine. Go back to your command prompt
    and cd into the directory where you want to keep the tests.

5.  If you forked the W3C Web Platform tests:
    
        $ git clone https://github.com/username/web-platform-tests.git
    
    If you forked the CSS tests:
    
        $ git clone https://github.com/username/csswg-test.git
    
    _This will download the tests into a directory named for the repo:
    `./web-platform-tests`, `./csswg-test`._

6.  You should now have a full copy of the test repository on your local
    machine. Feel free to browse the directories on your hard drive. You can also
    browse them on [github.com][github] and see the full history of contributions
    there.

## Branch

Now that you have everything locally, create a branch for your tests. In
Command Prompt:

    $ git checkout -b username/topic

_This will create a branch named_ `username/topic`
_and immediately switch this to be your active working branch_.

You're ready to start writing tests! Come back to this page you're ready to
[commit][commit] them or [submit][submit] them for review.

## Commit

Before you submit your tests for review and contribution to the main test
repo, you'll need to first commit them locally, where you now have your own
personal version control system with git. In fact, as you are writing your
tests, you may want to save versions of your work as you go before you submit
them to be reviewed and merged.

1.  When you're ready to save a version of your work, go to the command
    prompt and cd to the directory where your files are.

2.  First, ask git what new or modified files you have:
    
        $ git status
    
    _This will show you files that have been added or modified_.

3.  For all new or modified files, you need to tell git to add them to the
    list of things you'd like to commit:
    
        $ git add [file1] [file2] ... [fileN]
    
    Or:
    
        $ git add [directory_of_files]
    
4.  Run `git status` again to see what you have on the 'Changes to be
    committed' list. These files are now 'staged'.

5.  Alternatively, you can run `git diff --staged`, which will show you the
    diff of things to be committed.

6.  Once you've added everything, you can commit and add a message to this
    set of changes:
    
    $ git commit -m "Tests for indexed getters in the HTMLExampleInterface"
    
7.  Repeat these steps as many times as you'd like before you submit.

## Submit

If you're here now looking for more instructions, that means you've written
some awesome tests and are ready to submit them. Congratulations and Welcome
Back!

1.  The first thing you do before submitting them to the W3C repo is to push
them back up to the server.
    
    In the Command Prompt:
    
        $ git push https://github.com/username/web-platform-tests.git username/topic
    
    Or, for short:
    
        $ git push origin username/topic
    
    _Note: Here,_ `origin` _refers to remote repo from which you cloned
    (downloaded) the files after you forked, referred to as web-platform-tests.git
    in the previous example;_ `username/topic` _refers to the name of your
    local branch that you want to push_.
    
2.  Now you can send a message that you have changes or additions you'd like
    to be reviewed and merged into the main (original) test repository. You do
    this by using a pull request. In a browser, open the GitHub page for your
    forked repository: **https://github.com/username/web-platform-tests**.
    
3.  Click the ![pull request][pullrequestbtn] button.
    
4.  On the left, you should see the base repo is the w3c/web-platform-tests. On
    the right, you should see your fork of that repo. In the branch menu of
    your forked repo, switch to `username/topic`
    
5.  In the Title field, enter a brief description for your submission.
    
    Example: Tests for CSS Transforms skew() function.
    
6.  If you'd like to add more detailed comments, use the comment field below
    
7.  Click ![the send pull request button][sendpullrequest]

That's it! If you're currently at a Test the Web Forward event, find an
expert nearby and ask for a review. If you're doing this on your own
(AWESOME!), your pull request will be go into a queue and will be reviewed
soon.

## Modify

Once you submit your pull request, a reviewer will check your proposed changes
for correctness and style. It is likely that this process will lead to some
comments asking for modifications to your code. When you are ready to make the
changes, follow these steps:

1.  Check out the branch corresponding to your changes e.g. if your branch was
    called `username/topic` run:
    
        $ git checkout username/topic
    
2.  Make the changes needed to address the comments, and commit them just like
    before.
    
3.  Push the changes to the remote branch containing the pull request:
    
        $ git push origin username/topic
    
4.  The pull request will automatically be updated with the new commit. Note for
    advanced users: it is generally discouraged to rebase your pull request
    before review is complete. Tests typically have few conflicts so this should
    not be a problem in the common case.

Sometimes it takes multiple iterations through a review before the changes are
finally accepted. Don't worry about this; it's totally normal. The goal of test
review is to work together to create the best possible set of tests for the web
platform.

## Tips & Tricks

The following workflow is recommended:

1. Start branch based on latest w3c/master
2. Write tests
3. Rebase onto latest w3c/master
4. Submit tests
5. Stop fiddling with the branch base until review is done
6. Merge

You need to be able to set up remote upstream, etc. Please refer to [Pro Git
Book][git-book] and enjoy reading.

[branch]: #branch
[commit]: #commit
[css-repo]: https://github.com/w3c/csswg-test
[forkbtn]: /assets/forkbtn.png
[git]: http://git-scm.com/downloads
[git-book]: http://git-scm.com/book
[github]: https://github.com/
[help]: https://help.github.com/
[linux-setup]: https://help.github.com/articles/set-up-git#platform-linux
[mac-setup]: https://help.github.com/articles/set-up-git#platform-mac
[main-repo]: https://github.com/w3c/web-platform-tests
[pullrequestbtn]: /assets/pullrequestbtn.png
[sendpullrequest]: /assets/sendpullrequest.png
[submit]: #submit
[window-setup]: https://help.github.com/articles/set-up-git#platform-windows
