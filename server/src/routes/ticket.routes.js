import express from "express";
import {
  bookTicket,
  getUserTickets,
  getOrganizerTickets,
  cancelTicket,
} from "../controllers/ticket.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

/* USER */
router.post("/book", authMiddleware, bookTicket);
router.get("/my", authMiddleware, getUserTickets);
router.put("/cancel/:id", authMiddleware, cancelTicket);

/* ORGANIZER */
router.get(
  "/organizer",
  authMiddleware,
  getOrganizerTickets
);

export default router;
