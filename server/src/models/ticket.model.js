import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending"
  },
  price: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Ticket", ticketSchema);
