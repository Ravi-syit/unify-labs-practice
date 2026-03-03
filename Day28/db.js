const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://pbvishwakarma2005_db_user:5rVam9xM6etlyyLQ@cluster0.mit1y2c.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri);

async function connectDB() {
  await client.connect();
  console.log("✅ Connected to MongoDB Atlas");
  return client.db("productDB");
}

module.exports = connectDB;