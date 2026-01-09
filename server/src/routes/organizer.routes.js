import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { getOrganizerTickets } from "../controllers/ticket.controller.js";

const router = express.Router();

router.get('/tickets', protect, getOrganizerTickets);

export default router;
