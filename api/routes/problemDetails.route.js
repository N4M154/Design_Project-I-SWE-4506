import express from "express";
import ProblemDetails from "../models/ProblemDetails.model.js";

const router = express.Router();

// Route handler to fetch a problem by ID
export const problemDetails = async (req, res) => {
  try {
    const problemId = req.params.id;

    const details = await ProblemDetails.findOne({ id: problemId }).lean();
    if (details) {
      res.status(200).json(details);
    } else {
      res.status(404).json({ message: "Problem not found" });
    }
  } catch (error) {
    res.status(404).json({ message: "Fetching Failed", error: error.message });
  }
};

// Route handler to add a new problem detail
export const addProblemDetail = async (req, res) => {
  try {
    const newProblem = new ProblemDetails(req.body);
    const savedProblem = await newProblem.save();
    res.status(201).json(savedProblem);
  } catch (error) {
    console.error("Error adding problem detail:", error);
    res.status(500).json({ message: "Error adding problem detail", error: error.message });
  }
};

// Define routes
router.get("/problem/:id", problemDetails); // Fetch a problem by ID
router.post("/addProblemDetail", addProblemDetail); // Add a new problem detail

export default router;
