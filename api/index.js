import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import axios from "axios";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.post("/api/execute", async (req, res) => {
  const { script, language, input } = req.body; // Get the C code from the request

  // Create the payload to send to JDoodle API
  const program = {
    script: script,
    language: language,
    stdin: input,
    versionIndex: "0",
    clientId: process.env.JDOODLE_CLIENT_ID,
    clientSecret: process.env.JDOODLE_CLIENT_SECRET,
  };

  try {
    // Make a POST request to JDoodle API
    const response = await axios.post(
      "https://api.jdoodle.com/v1/execute",
      program
    );
    const output = response.data.output;
    const awaitingInput = output.toLowerCase().includes("enter");
    return res.status(200).json({ output: response.data.output });
  } catch (error) {
    return res.status(500).json({ error: "Failed to execute code." });
  }
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
