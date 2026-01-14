import Event from "../models/event.model.js";

export const createEvent = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (req.user.role !== "organizer") {
      return res.status(403).json({
        success: false,
        message: "Only organizer can create event",
      });
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

    if (!title || !description || !time || !date || !location || !category) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (!req.file?.path) {
      return res.status(400).json({ success: false, message: "Event image is required" });
    }

    const price = Number(ticketPrice);
    const total = Number(totalTickets);

    if (Number.isNaN(price) || price < 0) {
      return res.status(400).json({ success: false, message: "Ticket price must be 0 or more" });
    }

    if (Number.isNaN(total) || total < 1) {
      return res.status(400).json({ success: false, message: "Total tickets must be at least 1" });
    }

    // ✅ date safe
    const eventDate = new Date(date);
    if (isNaN(eventDate.getTime())) {
      return res.status(400).json({ success: false, message: "Invalid date" });
    }

    // ✅ organizer id safe (id or _id)
    const organizerId = req.user._id || req.user.id;
    if (!organizerId) {
      return res.status(401).json({ success: false, message: "Unauthorized (no user id)" });
    }

    const event = await Event.create({
      title: title.trim(),
      description: description.trim(),
      date: eventDate,
      time,
      location: location.trim(),
      category,
      ticketPrice: price,
      totalTickets: total,
      availableTickets: total,
      image: req.file.path,
      organizer: organizerId,
      isActive: true,
    });

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    console.log("createEvent error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const getAllEvents = async (req, res) => {
  try {
    const { category, location } = req.query;

    // ✅ safe parse
    const pageNum = Number(req.query.page) > 0 ? Number(req.query.page) : 1;
    const limitNum = Number(req.query.limit) > 0 ? Number(req.query.limit) : 10;
    const skip = (pageNum - 1) * limitNum;

    // ✅ isActive safe: true OR missing (old data)
    const query = { isActive: { $ne: false } };

    if (category) query.category = category;
    if (location) query.location = { $regex: location, $options: "i" };

    const events = await Event.find(query)
      .populate("organizer", "name email")
      .sort({ date: 1 })
      .skip(skip)
      .limit(limitNum);

    const totalEvents = await Event.countDocuments(query);

    return res.status(200).json({
      success: true,
      totalEvents,
      totalPages: Math.ceil(totalEvents / limitNum),
      currentPage: pageNum,
      events,
    });
  } catch (error) {
    console.log("getAllEvents error:", error); // ✅ terminal এ দেখাবে
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getSingleEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id).populate("organizer", "name email");

    if (!event || !event.isActive) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    return res.status(200).json({ success: true, event });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrganizerEvents = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const events = await Event.find({ organizer: req.user.id })
      .sort({ date: 1 })
      .skip(skip)
      .limit(limitNum);

    const totalEvent = await Event.countDocuments({ organizer: req.user.id });

    return res.status(200).json({
      success: true,
      totalEvent,
      totalPages: Math.ceil(totalEvent / limitNum),
      currentPage: pageNum,
      events,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = { ...req.body };
    if (req.file?.path) updateData.image = req.file.path;

    // ✅ FIX: findOneAndUpdate (NOT delete)
    const event = await Event.findOneAndUpdate(
      { _id: id, organizer: req.user.id, isActive: true },
      updateData,
      { new: true, runValidators: true }
    ).populate("organizer", "name email");

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found or you are not authorized",
      });
    }

    return res.status(200).json({ success: true, event });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findOneAndDelete({
      _id: id,
      organizer: req.user.id,
    });
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found or you are not authorized",
      });
    }

    return res.status(200).json({ success: true, message: "Event deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
