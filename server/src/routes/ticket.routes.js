import express from "express";
import *as ticket from "../controllers/ticket.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/book', protect, ticket.bookTicket);
router.get('/my', protect, ticket.getUserTickets);

router.put('/cancel/:id', protect, ticket.cancelTicket);
router.put('/confirm/:id', protect, ticket.confirmTicket);


export default router;
