import Event from "../models/Event.model.js";

/* ======================
   CREATE EVENT (Organizer)
====================== */
export const createEvent = async (req, res) => {
  try {
    if (req.user.role !== "organizer") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const event = await Event.create({
      ...req.body,
      image: req.file?.path,
      organizer: req.user.id,
    });

    res.status(201).json({
      success: true,
      event,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ======================
   GET ALL EVENTS (Public)
====================== */
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({ isActive: true }).populate(
      "organizer",
      "name email"
    );

    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ======================
   GET ORGANIZER EVENTS
====================== */
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
