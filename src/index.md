---
# Feel free to add content and custom Front Matter to this file.

layout: default
---

<ul class="flex flex-col gap-4">
  {% for post in collections.posts.resources %}
   <li>
      <a class="flex flex-col sm:flex-row gap-4 border border-1 rounded-sm overflow-hidden" href="{{ post.relative_url }}">
        <img class="w-full stylized inline-block sm:max-w-40 aspect-square" src="images/{{post.data.img}}">
        <div class="flex flex-col gap-4 p-4 justify-center">
          <h2 class="text-xl font-bold">
            {{ post.data.title }}
          </h2>
          <p class="text-balance line-clamp-2 "> {{ post.data.description }}</p>
        </div>
      </a>
    </li>
  {% endfor %}
</ul>
