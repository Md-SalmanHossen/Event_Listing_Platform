import express from "express";
import *as ticket from "../controllers/ticket.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

/* USER */
router.post('/book', protect, ticket.bookTicket);
router.get('/my', protect, ticket.getUserTickets);

router.put('/cancel/:id', protect, ticket.cancelTicket);
router.put('/confirmed/:id', protect, ticket.confirmedTicket);

router.get('/organizer-tickets', protect, ticket.getOrganizerTickets);


export default router;
