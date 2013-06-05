Documentation is currently built using [GitHub Pages][gh-pages] which itself
relies on [Jekyll][jekyll]. This automatically transforms the content of this
repository into a [static website hosted on GitHub][github-io]. We'll have a
custom domain pointing to it shortly.

## Documentation format

Documentation should be written using [Markdown][markdown]. It will be
transformed into HTML during the build process.

To ease online review, lines should be no longer than 80 characters. This is
greatly simplified by using [reference style links][ref-style] placed at the
bottom of the page. For example (lifted off John Gruber's
[Markdown Syntax guide][markdown]):

    This is [an example][id] reference-style link. Then, anywhere in the
    document, you define your link label like this, on a line by itself:
    
    [...]
    
    [id]: http://example.com/

As an added benefit, this syntax makes keeping links up to date a
lot easier as they are all placed at the bottom of the page.

## Contribution workflow

Contributions should follow the standard open source GitHub workflow (fork
the repository, work off topic-branches, send atomic commits as pull requests,
and get them reviewed by a peer).

Generally, contributing to a doc will imply:

1.  commenting on the issue to announce you're planning to work on it,
2.  looking at [existing docs][resources] to find related content,
3.  using an [online service][fuckyeahmarkdown] to convert that content to
    [Markdown][markdown],
4.  copyediting it,
5.  adding [YAML front-matter][front-matter],
6.  signing the [Contributor License Agreement][clahub], and
7.  sending a pull request.

Thanks for your help!

[clahub]: http://www.clahub.com/agreements/w3c/ttwf-docs
[front-matter]: http://jekyllrb.com/docs/frontmatter/
[fuckyeahmarkdown]: http://fuckyeahmarkdown.com/
[gh-pages]: http://pages.github.com/
[github-io]: http://w3c.github.io/testtwf-website/
[jekyll]: http://jekyllrb.com/
[markdown]: http://daringfireball.net/projects/markdown/syntax
[ref-style]: http://daringfireball.net/projects/markdown/syntax#link
[resources]: https://github.com/w3c/testtwf-website/blob/gh-pages/RESOURCES.md
