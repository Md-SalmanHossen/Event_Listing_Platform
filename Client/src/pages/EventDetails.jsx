import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../library/api/api";
import toast from "react-hot-toast";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleBook = async () => {
    try {
      await api.post("/user/ticket/book", { eventId: id });
      toast.success("Ticket booked successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
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
        className="w-full h-64 object-cover rounded-lg"
      />

      <h1 className="text-3xl font-bold mt-4">{event.title}</h1>
      <p className="text-gray-600 mt-2">
         {event.location} | 📅 {event.date} | ⏰ {event.time}
      </p>
      <p className="mt-4 text-gray-700">{event.description}</p>
      <p className="mt-2 text-gray-500">Tickets Available: {event.availableTickets}</p>
      <p className="mt-1 text-gray-500">Price: ${event.ticketPrice}</p>

      <button
        onClick={handleBook}
        className="mt-6 btn bg-green-500 hover:bg-green-600 text-white"
      >
        Book Ticket
      </button>
    </div>
  );
};

export default EventDetails;
