---
layout: default
---
<h1>Latest Posts</h1>

{% for post in site.posts %}
  <div class="card mt-4">
    <div class="card-body">
      <h5 class="card-title">{{ post.title }}</h5>
      <p class="card-text">{{ post.excerpt }}</p>
      <a href="{{ post.url }}" class="btn btn-primary">Read More</a>
    </div>
  </div>
{% endfor %}
