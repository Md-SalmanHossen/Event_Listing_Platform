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

export const getUserTickets = async (req, res) => {
  try {
    const {status}=req.query;
    const filter={user:req.user.id};

    if(status) filter.status=status;

    const tickets=await Ticket.find(filter)
      .populate({
        path:'event',
        select:'title date time location image ticketPrice'
      })
      .populate({
        path:'organizer',
        select:'name email'
      })
      .sort({createdAt:-1});


    res.status(200).json({
      success: true,
      count:tickets.length,
      tickets,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const cancelTicket=async(req,res)=>{
  try {
    const {id}=req.params;
    
    const ticket=await Ticket.findOne({
      _id:id,
      user:req.user.id,
      status:{$in:['pending','confirmed']},
    });

    
    if(!ticket){
      return res.status(404).json({
        success:false,
        message:'Ticket not fond or cannot be cancelled'
      });
    }

    ticket.status='cancelled';
    await ticket.save();

    await Event.findByIdAndUpdate(ticket.event,{
      $inc:{availableTickets:1}
    });

    res.status(200).json({
      success:true,
      message:'Ticket cancelled successfully'
    });

  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
};

export const confirmedTicket=async(req ,res)=>{
  try {

    const {id}=req.params;

    console.log("event id",id);
    
    if(req.user.role!=='organizer'){
      return res.status(403).json({
        success:false,
        message:'Only organizer can confirm tickets'
      });
    }

    const ticket=await Ticket.findById(id).populate('event');
    console.log('ticket', ticket);
    
    if(!ticket){
      return res.status(404).json({
        success:false,
        message:'Ticket not found or already processed'
      });
    }

    if(ticket.event.organizer.toString()!==req.user.id){
      return res.status(403).json({
        success:false,
        message:'You are not allowed to confirm this ticket'
      });
    }

    if(ticket.status!=='pending'){
      return res.status(400).json({
        success:false,
        message:'Ticket already processed'
      });
    }

    ticket.status='confirmed';
    await ticket.save();

    res.status(200).json({
      success:true,
      message:'Ticket confirmed successfully',
      ticket,
    });


  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

export const getOrganizerTickets = async (req, res) => {
  try {

    if(req.user.role!=='organizer'){
      return res.status(403).json({
        success:false,
        message:'Only organizer can access tickets'
      });
    }

    const tickets = await Ticket.find({organizer: req.user.id,})
      .populate('user','name email')
      .populate("event", "title date time location");

    res.status(200).json({
      success: true,
      totalTickets:tickets.length,
      tickets,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
