---
layout: page
title: Posts
---

<ul class="flex flex-col gap-2">
  {% for post in collections.posts.resources %}
    <li>
      <a class="flex gap-2 href="{{ post.relative_url }}">
        <img src="images/{{post.data.img}}">
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

If you have a lot of posts, you may want to consider adding [pagination](https://www.bridgetownrb.com/docs/content/pagination)!
