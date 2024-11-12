---
# Feel free to add content and custom Front Matter to this file.

layout: default
---

<ul class="grid grid-cols-1 gap-6 sm:grid-cols-2">
  {% for post in collections.posts.resources %}
   <li class="w-full h-auto list-item">
      <a class="inline-flex flex-col w-full h-full overflow-hidden grow" href="{{ post.relative_url }}">
        <div class="w-full bg-center bg-cover aspect-video cover-image {{post.class}}" style="background-image: url('{{post.data.image}}'); view-transition-name: post-image-{{post.data.id}}"></div>
        <div class="flex flex-col justify-start h-full gap-2 p-4">
            <span class="text-xs">{{ post.data.date | date: "%d.%m.%Y"}}</span>
            <h2 class="">
              {{ post.data.title }}
            </h2>
        </div>
      </a>
    </li>
  {% endfor %}
</ul>
