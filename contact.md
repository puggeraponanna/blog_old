---
layout: default
permalink: /contact
---

<form action="{{ site.formspree }}" method="POST">
  <div class="form-group">
    <label for="NameInput">Your Name</label>
    <input type="text" class="form-control" id="EmailInput" placeholder="Enter Name" name="name" required>
  </div>
  <div class="form-group">
    <label for="EmailInput">Your Email</label>
    <input type="email" class="form-control" id="EmailInput" aria-describedby="emailHelp" placeholder="Enter email" name="email" required>
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
      <label for="MessageInput">Message</label>
      <textarea class="form-control" id="MessageInput" rows="4" placeholder="Enter Message" name="message"></textarea>
    </div>
  <button type="submit" class="btn btn-primary">Send</button>
</form>
