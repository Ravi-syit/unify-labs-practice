
const { MongoClient } = require("mongodb");


const url = "mongodb://localhost:27017";
const client = new MongoClient(url);


const dbName = "productStore";

async function main() {
  try {
   
    await client.connect();
    console.log("Database connected successfully");

    const db = client.db(dbName);
    const productsCollection = db.collection("products");

   
    const products = await productsCollection.find({}).toArray();
    console.log("Products:", products);
  } catch (err) {
    console.error("Connection failed:", err);
  } finally {
   
    await client.close();
  }
}


main();