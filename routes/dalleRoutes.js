import express from "express";
import OpenAI from "openai";

const router = express.Router();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from DALL·E!" });
});

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    const result = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024"
    });

    res.status(200).json({ photo: result.data[0].url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
});

export default router;
