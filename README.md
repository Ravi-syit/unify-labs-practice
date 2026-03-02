# 🛍 MongoDB Product Store

A simple MongoDB project demonstrating bulk insertion, nested objects,
filtering, sorting, and limiting results using `insertMany()` and
MongoDB queries.




## 🗂 Database Details

Database Name: productStore\
Collection Name: products

------------------------------------------------------------------------

## 📦 Document Structure

Each product document contains:

-name -- Product name (String)\
-category -- Product category (String)\
-price -- Product price (Number)\
-stock -- Available quantity (Number)\
-specs -- Nested object containing:
    -   color\
    -   weight

------------------------------------------------------------------------

##  Bulk Insert Operation

Used `insertMany()` to insert 5 products across Electronics, Clothing,
and Furniture categories.

------------------------------------------------------------------------

## Queries Implemented

### 1️⃣ Find Electronics Products

`db.products.find({ category: "Electronics" })`

### 2️⃣ Sort by Price (Descending) and Limit to Top 2

`db.products.find().sort({ price: -1 }).limit(2)`

