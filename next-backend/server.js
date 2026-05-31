const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subcategoryRoutes = require("./routes/subcategoryRoutes");
const adminRoutes = require("./routes/adminRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const allRoutes = require("./routes/allRoutes");

const blogRoutes = require("./routes/blogRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve uploaded files (featured images, etc.)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", allRoutes);

app.use("/api/blogs", blogRoutes);
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/subcategory", subcategoryRoutes);
app.use("/api/admin", adminRoutes);
console.log("Mongo URI:", process.env.MONGODB_URI ? "FOUND" : "NOT FOUND");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("Mongo Error:", err);
  });

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(process.env.PORT || 5030, () => {
  console.log(`Server running on port ${process.env.PORT || 5030}`);
});
