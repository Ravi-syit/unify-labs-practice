const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const { ObjectId } = require("mongodb");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

async function startServer() {
  const db = await connectDB();
  const posts = db.collection("posts");

  // GET ALL
  app.get("/api/posts", async (req, res) => {
    const data = await posts.find().sort({ createdAt: -1 }).toArray();
    res.json(data);
  });

  // CREATE
  app.post("/api/posts", async (req, res) => {
    const newPost = {
      ...req.body,
      createdAt: new Date()
    };
    await posts.insertOne(newPost);
    res.json({ message: "Post Created" });
  });

  // DELETE
  // server.js or routes/posts.js
app.delete("/api/posts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await posts.deleteOne({ _id: new ObjectId(id) });
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete post: " + err.message });
  }
});

  // UPDATE
  app.patch("/api/posts/:id", async (req, res) => {
    await posts.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.json({ message: "Updated" });
  });

  app.listen(5000, () => {
    console.log("🚀 Server running at http://localhost:5000");
  });
}

startServer();