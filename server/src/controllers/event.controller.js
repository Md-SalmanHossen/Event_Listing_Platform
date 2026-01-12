import Event from "../models/Event.model.js";

export const createEvent = async (req, res) => {
  try {
    if (req.user.role !== "organizer") {
      return res.status(403).json({ success: false, message: "Unauthorized" });
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
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (!req.file?.path) {
      return res.status(400).json({ success: false, message: "Event image is required" });
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

    return res.status(201).json({ success: true, message: "Event created successfully", event });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const { category, location, page = 1, limit = 10 } = req.query;
    const query = { isActive: true };

    if (category) query.category = category;
    if (location) query.location = { $regex: location, $options: "i" };

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

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
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getSingleEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id).populate("organizer", "name email");

    if (!event || !event.isActive) {
      return res.status(404).json({ success: false, message: "Event not found" });
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

    const event = await Event.findOneAndDelete({ _id: id, organizer: req.user.id });
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
