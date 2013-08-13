---
layout: default
title: Blog
---

<ul>
  {% for page in site.posts %}
    <li>
      <h3><a href="{{ page.url }}">{{ page.title }}</a></h3>
      <p>Posted on <a href="{{ page.url }}">{{ page.date | date: "%B %d, %Y" }}</a> by {{ page.author }}.</p>
      
      {{ page.excerpt | truncatewords: 80 | markdownify }}
      
      <p><a href="{{ page.url }}">Contine reading →</a></p>
    </li>
  {% endfor %}
</ul>
