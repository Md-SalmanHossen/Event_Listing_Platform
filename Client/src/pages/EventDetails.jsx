import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../library/api/axios";
import toast from "react-hot-toast";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingQty, setBookingQty] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);

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

  const handleBookTicket = async () => {
    try {
      setBookingLoading(true);
      // Backend e 'eventId' pathacchi jeta tomar controller e dorkar
      const { data } = await api.post("/user/ticket/book", { 
        eventId: id 
      });
      
      toast.success(data.message || "Ticket booked successfully!");
      
      // UI update: availableTickets ekta komie deya
      setEvent((prev) => ({
        ...prev,
        availableTickets: prev.availableTickets - 1
      }));
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
      <img
        src={event.image || "https://via.placeholder.com/800x400"}
        alt={event.title}
        className="w-full h-80 object-cover rounded-3xl shadow-lg"
      />
      <div className="mt-6">
        <span className="bg-green-100 text-green-600 px-4 py-1 rounded-full text-sm font-bold">
          {event.category}
        </span>
        <h1 className="text-4xl font-black mt-3 text-gray-900">{event.title}</h1>
        <p className="text-gray-500 mt-2 flex items-center gap-2">
          📍 {event.location} | 📅 {new Date(event.date).toLocaleDateString()} | ⏰ {event.time}
        </p>
        <div className="mt-6 p-6 bg-gray-50 rounded-2xl border border-dashed">
            <h3 className="font-bold text-lg">About this event</h3>
            <p className="mt-2 text-gray-700 leading-relaxed">{event.description}</p>
        </div>

        <div className="mt-8 flex items-center justify-between p-6 bg-white border rounded-3xl shadow-sm">
          <div>
            <p className="text-gray-500 text-sm">Price per ticket</p>
            <p className="text-2xl font-black text-green-500">${event.ticketPrice}</p>
            <p className="text-xs text-gray-400">Remaining: {event.availableTickets}</p>
          </div>

          {event.availableTickets > 0 ? (
            <button
              onClick={handleBookTicket}
              disabled={bookingLoading}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-bold transition-all disabled:opacity-50"
            >
              {bookingLoading ? "Processing..." : "Book Ticket Now"}
            </button>
          ) : (
            <button className="bg-gray-200 text-gray-500 px-8 py-4 rounded-2xl font-bold cursor-not-allowed">
              Sold Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;