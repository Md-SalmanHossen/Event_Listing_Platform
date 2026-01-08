import Ticket from "../models/Ticket.model.js";
import Event from "../models/Event.model.js";

/* ======================
   BOOK TICKET
====================== */
export const bookTicket = async (req, res) => {
  try {
    const { eventId } = req.body;

    const event = await Event.findById(eventId);
    if (!event || event.availableTickets <= 0) {
      return res.status(400).json({ message: "Ticket not available" });
    }

    const ticket = await Ticket.create({
      user: req.user.id,
      event: eventId,
      organizer: event.organizer,
      price: event.ticketPrice,
      status: "confirmed",
    });

    event.availableTickets -= 1;
    await event.save();

    res.status(201).json({
      success: true,
      ticket,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ======================
   USER TICKETS
====================== */
export const getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id }).populate(
      "event",
      "title date location"
    );

    res.status(200).json({
      success: true,
      tickets,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ======================
   ORGANIZER TICKETS
====================== */
export const getOrganizerTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({
      organizer: req.user.id,
    }).populate("event user", "title name email");

    res.status(200).json({
      success: true,
      tickets,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
