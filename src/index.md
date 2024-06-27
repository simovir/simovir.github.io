---
# Feel free to add content and custom Front Matter to this file.

layout: default
---

<ul class="flex flex-wrap gap-4">
  {% for post in collections.posts.resources %}
   <li class="max-w-full rounded-md sm:max-w-xs list-item">
      <a class="flex flex-col overflow-hidden rounded-md bg-dark-purple-300 " href="{{ post.relative_url }}">
        <div class="w-full bg-center bg-cover stylized aspect-video cover-image" style="background-image: url('images/{{post.data.image}}')"></div>
        <div class="flex flex-col justify-center gap-2 p-4">
          <div>
            <span class="text-xs">{{ post.data.date | date: "%d.%m.%Y"}}</span>
            <h2 class="font-bold text-md heading">
              {{ post.data.title }}
            </h2>
          </div>
          <p class="text-sm text-balance line-clamp-2 body"> {{ post.data.description }}</p>
        </div>
      </a>
    </li>
  {% endfor %}
</ul>
