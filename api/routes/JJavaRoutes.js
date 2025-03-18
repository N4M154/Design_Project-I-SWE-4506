import express from "express";
import { getJProgress, updateJProgress, markJAsRead } from "../controllers/JProgressController.js";

const router = express.Router();

router.get("/api/progress/jget-progress/:userId", getJProgress);
router.post("/api/progress/jupdate-progress", updateJProgress);
router.post("/api/progress/jmark-as-read", markJAsRead);

export default router;


