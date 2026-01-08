import express from "express";
import *as ticket from "../controllers/ticket.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

/* USER */
router.post('/book', protect, ticket.bookTicket);
router.get('/my', protect, ticket.getUserTickets);

// router.get("/my", authMiddleware, getUserTickets);
// router.put("/cancel/:id", authMiddleware, cancelTicket);

// /* ORGANIZER */
// router.get(
//   "/organizer",
//   authMiddleware,
//   getOrganizerTickets
// );

export default router;
