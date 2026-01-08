import Event from "../models/Event.model.js";


export const createEvent = async (req, res) => {
  try {
    if (req.user.role !== "organizer") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const {
      title,
      description,
      time,
      date,
      location,
      category,
      ticketPrice,
      totalTickets,
    } = req.body;

    if (
      !title ||
      !description ||
      !time ||
      !date ||
      !location ||
      !category ||
      ticketPrice === undefined ||
      totalTickets === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!req.file || !req.file.path) {
      return res.status(400).json({
        success: false,
        message: "Event image is required",
      });
    }

    const event = await Event.create({
      title,
      description,
      date,
      time,
      location,
      category,
      ticketPrice,
      totalTickets,
      image: req.file.path,
      organizer: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getAllEvents = async (req, res) => {
  try {

    const {category,location,page=1,limit=10}=req.query;
    const query={isActive:true};

    if(category) query.category=category;
    if(location) query.location={$regex:location,$options:"i"};

    const skip=(parseInt(page)-1)*parseInt(limit);


    const events=await Event.find(query)
      .populate("organizer", "name email")
      .sort({ date: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalEvents=await Event.countDocuments(query);

    res.status(200).json({
      success: true,
      totalEvents,
      totalPages: Math.ceil(totalEvents / limit),
      currentPage: parseInt(page),
      events,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSingleEvent=async(req, res)=>{
  try {
    const {id}=req.params;

    const event=await Event.findById(id).populate('organizer','name email');

    if(!event || !event.isActive){
      return res.status(404).json({
        success:false,
        message:'Event not found'
      })
    };

    res.status(200).json({
      success:true,
      event
    });

  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}


export const getOrganizerEvents = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user.id });

    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ======================
   UPDATE EVENT
====================== */
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, organizer: req.user.id },
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ======================
   DELETE EVENT
====================== */
export const deleteEvent = async (req, res) => {
  try {
    await Event.findOneAndDelete({
      _id: req.params.id,
      organizer: req.user.id,
    });

    res.status(200).json({
      success: true,
      message: "Event deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
