import express from "express";
import protect from "../middlewares/auth.middleware.js";
import *as dashboard from '../controllers/dashboard.controller.js'


const router = express.Router();

router.get("/user", protect, dashboard.userDashboard);
router.get("/organizer", authMiddleware, getOrganizerDashboard);

export default router;
