const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const port = 3000;


app.use(express.json());


const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("unify_labs"); 
    console.log("Database connected successfully");
  } catch (err) {
    console.error("DB connection failed:", err);
  }
}

connectDB();


app.get("/", (req, res) => {
  res.send("Welcome to the Unify Labs Product API 🚀");
});


app.get("/products", async (req, res) => {
  try {
    const products = await db.collection("products").find().toArray();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.patch("/products/:id", async (req, res) => {
  try {
    const { stock } = req.body;
    const id = req.params.id;
    await db.collection("products").updateOne(
      { _id: new ObjectId(id) },  
      { $set: { stock } }
    );
    res.json({ message: "Stock updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.delete("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection("products").deleteOne({ _id: new ObjectId(id) }); 
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.delete("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection("products").deleteOne({ _id: ObjectId(id) });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});