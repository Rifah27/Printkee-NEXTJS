const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/collections", async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.json(collections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/data/:collection", async (req, res) => {
  try {
    const collectionName = req.params.collection;

    const data = await mongoose.connection.db
      .collection(collectionName)
      .find({})
      .toArray();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;