const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../frontend"))); // serve frontend files

// MongoDB connection (local)
const client = new MongoClient("mongodb://127.0.0.1:27017");
let db;

async function connectDB() {
    await client.connect();
    db = client.db("titan_store");

    // Load products.json if collection is empty
    const count = await db.collection("products").countDocuments();
    if (count === 0) {
        const products = JSON.parse(fs.readFileSync("./products.json"));
        await db.collection("products").insertMany(products);
        console.log("Products loaded into DB");
    }
}

connectDB().catch(console.error);

// Routes
app.get("/api/products", async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = {};
        if (category) query.category = category;
        if (search) query.name = { $regex: search, $options: "i" };
        const products = await db.collection("products").find(query).toArray();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

app.post("/api/orders", async (req, res) => {
    try {
        const { customer, items } = req.body;
        if (!customer || !items || items.length === 0) return res.status(400).json({ error: "Invalid order" });
        if (!customer.name || !customer.email || !customer.address) return res.status(400).json({ error: "Missing customer details" });

        // Calculate total securely on server
        const productIds = items.map(item => item._id);
        const products = await db.collection("products").find({ _id: { $in: productIds } }).toArray();

        const total = products.reduce((acc, p) => {
            const qty = items.find(i => i._id === p._id)?.quantity || 1;
            return acc + p.price * qty;
        }, 0);

        const order = {
            customer,
            items,
            total,
            status: "pending",
            createdAt: new Date()
        };

        const result = await db.collection("orders").insertOne(order);
        res.status(201).json({ orderId: result.insertedId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to place order" });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));