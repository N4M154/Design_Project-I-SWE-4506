import express from "express";
import {
  updateContestProgress,
  getContestProgress,
} from "../controllers/contest.controller.js";

const router = express.Router();

router.post("/progress", updateContestProgress);
router.get("/progress/:userId", getContestProgress);

export default router;
