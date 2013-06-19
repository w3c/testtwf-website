This website is currently built using [GitHub Pages][gh-pages] which itself
relies on [Jekyll][jekyll]. This automatically transforms the content of this
repository into a [static website hosted on GitHub][github-io]. We now have a
[temporary domain][staging] pointing to it.

## Documentation format

Documentation should be written using [Markdown][markdown]. It will be
transformed into HTML during the build process.

To ease online review, lines should be no longer than 80 characters. This is
greatly simplified by using [reference style links][ref-style] placed at the
bottom of the page. For example (lifted off John Gruber's
[Markdown Syntax guide][markdown]):

    This is [an example][eg] reference-style link.
    
    [...]
    
    Then, anywhere in the document (usually at the end), you define your link
    label like this, on a line by itself:
    
    [eg]: http://example.com/

Favor named referenced over indexed ones, as those make refactoring much
simpler.

As an added benefit, this syntax makes keeping links up to date a
lot easier as they are all placed together at the bottom of the page.

## Event page format

Event pages should be written in HTML. A lot of the content is automatically
generated from data placed in the [YAML front-matter][front-matter]. This
includes:

* name of the venue (`venue`, and `localized_venue` fields),
* date of the event (`date`, and `localized_date` fields),
* title of the page (optional `title` field),
* list of event sponsors (`sponsors` field),
* list of event speakers (`speakers` field), and
* list of event experts (`experts` field).

Setting the language of the page (`lang` field) can help automatically
localize some of the above.

There are good examples of how to author this YAML front-matter in the
[page for the Seattle event][event-eg].

The `sponsors`, `speakers` and `experts` field simply pull data out of the
[site-wide config file][config] (a poor man's db) which they run through
[templates][templates] to produce markup. So for example:

``` yaml
---
lang: zho
speakers: [Rebecca Hauck]
---
```

will automatically create the following HTML markup:

``` html
<div class="block-speakers">
  <h2 id="speakers" class="hed">专家</h2>
  <ul>
    <li>
      <img width="48" height="48" src="/assets/experts/rhauck.jpg" alt=''>
       <h4>Rebecca Hauck</h4>
       <p>Adobe, CSS Working Group</p>
    </li>
  </ul>
</div>
```

Note that while sponsors get automatically added to the end of the events page,
speakers and experts need to be included via an `include tag` at the desired
location. E.g.:

``` html
<p>Some content goes here:</p>

{% include speakers.html %}

<p>All talks will be given in English.</p>

{% include experts.html %}
```

Should you need to modify or add a speaker, expert or sponsor, please do so in
the [config file][config]. The format is [YAML][yaml] of which JSON is a
subset. Note that speakers and experts share the same `experts` entry.

## File names

File names should be lowercased, hyphenated and use the `.md` extension, e.g.:
`review-process.md`. The build step will change that to `review-process.html`
and use it as URL.

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
[config]: https://github.com/w3c/testtwf-website/blob/gh-pages/_config.yml
[front-matter]: http://jekyllrb.com/docs/frontmatter/
[event-eg]: https://github.com/w3c/testtwf-website/blob/gh-pages/events/2013/seattle.html#L1-L8
[fuckyeahmarkdown]: http://fuckyeahmarkdown.com/
[gh-pages]: http://pages.github.com/
[github-io]: http://w3c.github.io/testtwf-website/
[jekyll]: http://jekyllrb.com/
[markdown]: http://daringfireball.net/projects/markdown/syntax
[ref-style]: http://daringfireball.net/projects/markdown/syntax#link
[resources]: https://github.com/w3c/testtwf-website/blob/gh-pages/RESOURCES.md
[staging]: http://www.testthewebforward-staging.org/
[templates]: https://github.com/w3c/testtwf-website/blob/gh-pages/_includes
[testtwf-org]: http://testthewebforward.org
[yaml]: http://www.yaml.org/
