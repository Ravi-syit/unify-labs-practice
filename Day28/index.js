const express = require("express");
const connectDB = require("./db");

const app = express();
app.use(express.json());

async function startServer() {
  const db = await connectDB();

  app.get("/products", async (req, res) => {
    const products = await db.collection("products").find().toArray();
    res.json(products);
  });

  app.post("/products", async (req, res) => {
    const result = await db.collection("products").insertOne(req.body);
    res.json(result);
  });

  app.listen(3000, () => {
    console.log("🚀 Server running on port 3000");
  });
}

startServer();