import express from "express";
import {
  getUserDashboard,
  getOrganizerDashboard,
} from "../controllers/dashboard.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/user", authMiddleware, getUserDashboard);
router.get("/organizer", authMiddleware, getOrganizerDashboard);

export default router;
