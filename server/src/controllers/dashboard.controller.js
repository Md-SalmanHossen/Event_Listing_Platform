import Ticket from "../models/Ticket.model.js";
import Event from "../models/Event.model.js";

/* ======================
   USER DASHBOARD
====================== */
export const userDashboard = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id });

    const totalSpent = tickets.reduce(
      (sum, t) => sum + (t.status === "confirmed" ? t.price : 0),
      0
    );

    res.status(200).json({
      success: true,
      dashboard: {
        totalTickets: tickets.length,
        totalSpent,
        recentTickets: tickets.slice(-5),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ======================
   ORGANIZER DASHBOARD
====================== */
export const organizerDashboard = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user.id });
    const tickets = await Ticket.find({ organizer: req.user.id });

    const revenue = tickets.reduce(
      (sum, t) => sum + (t.status === "confirmed" ? t.price : 0),
      0
    );

    res.status(200).json({
      success: true,
      dashboard: {
        totalEvents: events.length,
        totalTickets: tickets.length,
        totalRevenue: revenue,
        recentTickets: tickets.slice(-5),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
