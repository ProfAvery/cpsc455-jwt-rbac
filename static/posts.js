const response = await window.fetch('/posts')
const posts = await response.json()
const news = document.querySelector('#news')
news.innerHTML = ejs.render(`
    <% for (const post of posts) { %>
      <aside>
        <h3><%= post.title %></h3>
        <p><%= post.body %></p>
        <p><small>
          Posted by <%= post.username %>
          at <%= post.dateline %>
        </small></p>
      </aside>
  <% } %>
`, {posts})
