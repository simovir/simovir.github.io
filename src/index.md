---
# Feel free to add content and custom Front Matter to this file.

layout: default
---

<ul class="flex flex-wrap gap-4">
  {% for post in collections.posts.resources %}
   <li class="max-w-full border rounded-md border-1 border-color-white sm:max-w-xs list-item">
      <a class="flex flex-col gap-4 overflow-hidden rounded-md bg-dark-purple-300 " href="{{ post.relative_url }}">
        <div class="w-full bg-center bg-cover stylized aspect-square " style="background-image: url('images/{{post.data.img}}')"></div>
        <div class="flex flex-col justify-center gap-4 p-4">
          <h2 class="text-xl font-bold">
            {{ post.data.title }}
          </h2>
          <p class="text-balance line-clamp-2 "> {{ post.data.description }}</p>
        </div>
      </a>
    </li>
    
  {% endfor %}
</ul>
