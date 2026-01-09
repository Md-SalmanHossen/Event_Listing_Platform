import Ticket from "../models/Ticket.model.js";
import Event from "../models/Event.model.js";


export const userDashboard = async (req, res) => {
  try {

    const tickets = await Ticket.find({user: req.user.id})
      .populate('event','title date time location')
      .sort({createdAt:-1});
    
    const confirmedTicket=tickets.filter(t=>t.status==='confirmed');
    const totalSpent=confirmedTicket.reduce((sum,t)=>sum+t.price,0);

    const recentTickets=tickets.slice(0,5);

    res.status(200).json({
      success: true,
      dashboard: {
        totalTickets: tickets.length,
        totalSpent,
        recentTickets,
      },
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const organizerDashboard = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user.id });

    const tickets = await Ticket.find({ organizer: req.user.id })
      .populate("user", "name email")
      .populate("event", "title date time location")
      .sort({ createdAt: -1 });

    const confirmedTickets = tickets.filter(t => t.status === "confirmed");
    const totalRevenue = confirmedTickets.reduce((sum, t) => sum + t.price, 0);

    const recentTickets = tickets.slice(0, 5);

    res.status(200).json({
      success: true,
      dashboard: {
        totalEvents: events.length,
        totalTickets: tickets.length,
        totalRevenue,
        recentTickets,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

