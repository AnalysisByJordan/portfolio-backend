const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// Get Posts
router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// Add Post
router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
    createdAt: new Date(),
  });
  res.status(201).send();
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    process.env.MongoDB,
    { useNewUrlParser: true }
  );

  return client.db("vue_portfolio").collection("posts");
}

module.exports = router;
