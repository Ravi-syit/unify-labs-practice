// editor.js

const postForm = document.getElementById("postForm");

postForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const post = {
    title: document.getElementById("title").value,
    category: document.getElementById("category").value,
    content: document.getElementById("content").value,
    author: "Admin" // optional: you can make this dynamic later
  };

  try {
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post)
    });

    const data = await res.json();
    console.log(data);

    // Reset form
    postForm.reset();

    // Optional: Redirect back to homepage and refresh posts grid
    window.opener?.loadPosts?.(); // if you opened editor in a new tab
    window.location.href = "/";    // fallback redirect
  } catch (err) {
    alert("Failed to create post: " + err.message);
  }
});