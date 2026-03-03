// main.js

const postsGrid = document.getElementById("postsGrid");
const toggleBtn = document.getElementById("toggleMode");

// Modal Elements
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const modalAuthor = document.getElementById("modalAuthor");
const modalClose = document.getElementById("close");

// Dark Mode Toggle
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Store posts globally
let allPosts = [];

// Load posts from API
async function loadPosts() {
  try {
    const res = await fetch("/api/posts");
    allPosts = await res.json();

    postsGrid.innerHTML = allPosts.map(post => `
      <div class="card">
        <h2>${post.title}</h2>
        <p>${post.content.substring(0, 100)}${post.content.length > 100 ? "..." : ""}</p>
        <small>By ${post.author}</small>
        <div class="card-buttons">
          <button class="read-more" data-id="${post._id}">Read More</button>
          <button class="delete-post" data-id="${post._id}">Delete</button>
        </div>
      </div>
    `).join("");
  } catch (err) {
    postsGrid.innerHTML = `<p style="color:red;">Failed to load posts: ${err.message}</p>`;
  }
}

// Event delegation for buttons
postsGrid.addEventListener("click", async (e) => {
  const id = e.target.dataset.id;
  
  // Read More
  if (e.target.classList.contains("read-more")) {
    const post = allPosts.find(p => p._id === id);
    if (!post) return;

    modalTitle.textContent = post.title;
    modalContent.textContent = post.content;
    modalAuthor.textContent = `By ${post.author}`;
    modal.classList.add("visible");
  }

  // Delete Post
  if (e.target.classList.contains("delete-post")) {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      const data = await res.json();
      console.log(data.message);

      // Refresh posts grid
      loadPosts();
    } catch (err) {
      alert("Failed to delete post: " + err.message);
    }
  }
});

// Close modal
modalClose.addEventListener("click", () => modal.classList.remove("visible"));
modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.remove("visible"); });

// Initial load
loadPosts();

// Make loadPosts globally available (for editor.js SPA update)
window.loadPosts = loadPosts;