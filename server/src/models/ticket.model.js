import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["confirmed",'pending', "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Ticket= mongoose.model("Ticket", ticketSchema);
export default Ticket;