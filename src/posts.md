---
layout: page
title: Posts
---

<ul class="flex flex-col gap-2">
  {% for post in collections.posts.resources %}
    <li>
      <a class="flex gap-2" href="{{ post.relative_url }}">
        <img src="{{post.data.image}}" alt="">
        <div>
        <h2 class="text-lg">
          {{ post.data.title }}
        </h2>
        <p> {{ post.data.description }}</p>
        </div>
      </a>
    </li>
  {% endfor %}
</ul>
