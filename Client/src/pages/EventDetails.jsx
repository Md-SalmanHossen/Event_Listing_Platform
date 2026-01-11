import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../library/api/api";
import toast from "react-hot-toast";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingQty, setBookingQty] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Fetch single event
  const fetchEvent = async () => {
    try {
      const { data } = await api.get(`/user/event/${id}`);
      setEvent(data.event);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Ticket Booking Function
  const handleBookTicket = async () => {
    if (bookingQty < 1) return toast.error("Enter a valid quantity");
    if (bookingQty > event.availableTickets)
      return toast.error("Not enough tickets available");

    try {
      setBookingLoading(true);
      const { data } = await api.post("/user/ticket/book", { eventId: id });
      toast.success(data.message || "Ticket booked successfully!");
      // Optional: update UI
      setEvent({ ...event, availableTickets: event.availableTickets - 1 });
      setBookingQty(1);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setBookingLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!event) return <p className="text-center mt-20">Event not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Event Details */}
      <img
        src={event.image || "https://via.placeholder.com/800x400"}
        alt={event.title}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h1 className="text-3xl font-bold mt-4">{event.title}</h1>
      <p className="text-gray-600 mt-2">
        📍 {event.location} | 📅 {event.date} | ⏰ {event.time}
      </p>
      <p className="mt-4 text-gray-700">{event.description}</p>
      <p className="mt-2 text-gray-500">Tickets Available: {event.availableTickets}</p>
      <p className="mt-1 text-gray-500">Price: ${event.ticketPrice}</p>

      {/* Booking Form */}
      {event.availableTickets > 0 ? (
        <div className="mt-6 flex items-center gap-4">
          <input
            type="number"
            value={bookingQty}
            min={1}
            max={event.availableTickets}
            onChange={(e) => setBookingQty(parseInt(e.target.value))}
            className="input input-bordered w-24"
          />
          <button
            onClick={handleBookTicket}
            disabled={bookingLoading}
            className="btn bg-green-500 hover:bg-green-600 text-white"
          >
            {bookingLoading ? "Booking..." : "Book Ticket"}
          </button>
        </div>
      ) : (
        <button className="mt-6 btn bg-gray-400 text-gray-200 cursor-not-allowed">
          Sold Out
        </button>
      )}
    </div>
  );
};

export default EventDetails;
