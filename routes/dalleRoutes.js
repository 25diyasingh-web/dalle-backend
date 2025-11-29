import express from "express";
import OpenAI from "openai";

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
    });

    const imageUrl = result.data[0].url;

    res.status(200).json({ photo: imageUrl });
  } catch (error) {
    console.error("DALL·E Error:", error);
    res.status(500).json({ error: error.message || "Generation failed" });
  }
});

export default router;
