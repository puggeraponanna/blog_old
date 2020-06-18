---
layout: default
permalink: /gallery
---
<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100 img-fluid" src="{{ site.baseurl }}/assets/images/default-fallery-image.jpg" alt="Image">
    </div>
    {% assign image_files = site.static_files | where: "image", true %}
    {% for myimage in image_files %}
      <div class="carousel-item">
        <img class="d-block w-100 img-fluid" src="{{ site.baseurl }}{{ myimage.path }}" alt="Image">
      </div>
    {% endfor %}
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
