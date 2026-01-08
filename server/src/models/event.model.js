import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  image: {
    type: String,
    default: ""
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);
