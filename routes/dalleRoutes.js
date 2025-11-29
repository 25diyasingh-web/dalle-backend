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
      response_format: "b64_json",
    });

    const imageBase64 = result.data[0].b64_json;

    res.status(200).json({ photo: imageBase64 });
  } catch (error) {
    console.error("DALL·E Error:", error);
    res.status(500).json({ error: error.message || "Generation failed" });
  }
});

export default router;
