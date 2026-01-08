import Ticket from "../models/Ticket.model.js";
import Event from "../models/Event.model.js";


export const bookTicket = async (req, res) => {
  try {
    const { eventId } = req.body;

    const alreadyBooked = await Ticket.findOne({
      event: eventId,
      user: req.user.id,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (alreadyBooked) {
      return res.status(400).json({
        success: false,
        message: 'You have already booked this event'
      });
    }

    const event = await Event.findOneAndUpdate(
      {
        _id: eventId,
        isActive: true,
        availableTickets: { $gt: 0 }
      },
      { $inc: { availableTickets: -1 } },
      { new: true }
    );

    if (!event) {
      return res.status(400).json({
        success: false,
        message: 'Event not found or tickets sold out'
      });
    }

    const ticket = await Ticket.create({
      user: req.user.id,
      event: eventId,
      organizer: event.organizer,
      price: event.ticketPrice,
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Ticket booking request submitted',
      ticket
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
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
