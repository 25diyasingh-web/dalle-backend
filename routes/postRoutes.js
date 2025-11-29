import express from "express";
import Post from "../mongodb/models/post.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts.reverse());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;

    const newPost = await Post.create({
      name,
      prompt,
      photo,
    });

    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
