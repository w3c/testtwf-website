---
layout: default
title: Sponsors
---

# Test the Web Forward Sponsors

Coming soon.

# Event Sponsors


{% assign sponsors = site.sponsors | sort: "name" %}
<div class="sponsors">
{% for sponsor in sponsors %}
    <img src="{{ sponsor.logo }}" alt="{{ sponsor.name }}" data-html="true" class="auto-popover" data-toggle="popover" data-placement="top auto" data-trigger="hover focus" data-content="<ul>
  {% for p in site.pages %}
    {% if (p.section == "events" or p.layout == "events") and p.sponsors %}
      {% for page_sponsor in p.sponsors %}
        {% if page_sponsor == sponsor.name %}
          <li>{{ p.city }}</li>
        {% endif %}
      {% endfor %}
    {% endif %}
  {% endfor %}
  </ul>" data-title="Events Sponsored by {{ sponsor.name }}" />
{% endfor %}
</div>
