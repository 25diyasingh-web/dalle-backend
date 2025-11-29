import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import dalleRoutes from "./routes/dalleRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from DALL·E backend!" });
});

app.use("/api/v1/dalle", dalleRoutes);
app.use("/api/v1/post", postRoutes);

const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log("Server running on port 8080 🚀")
    );
  } catch (err) {
    console.error(err);
  }
};

startServer();
