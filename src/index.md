---
layout: default
---

<ul class="grid grid-cols-1 gap-16 mx-auto mt-6 md:max-w-3xl">
  {% for post in collections.posts.resources %}
   <li class="w-full h-auto list-item">
      <a class="inline-flex flex-col w-full h-full overflow-hidden grow" href="{{ post.relative_url }}">
        <div class="w-full bg-center bg-cover aspect-video cover-image {{post.class}}" data-cover="{{ post.data.image | replace: ".jpg", ".avif" }}" style="background-image: image-set(url('{{ post.data.image | replace: ".jpg", ".avif" }}') type('image/avif'), url('{{ post.data.image }}') type('image/jpeg')); view-transition-name: post-image-{{post.data.id}}"></div>
        <div class="flex flex-col justify-start h-full gap-2 p-4">
            <span class="muted">{{ post.data.date | date: "%d.%m.%Y"}}</span>
            <h2 class="title-lg">{{ post.data.title }}</h2>
            <p class="muted">{{ post.data.description }}</p>
        </div>
      </a>
    </li>
  {% endfor %}
</ul>
