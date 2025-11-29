import mongoose from "mongoose";

const connectDB = (url) => {
  mongoose.set("strictQuery", true);

  return mongoose
    .connect(url)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB Error:", err));
};

export default connectDB;
