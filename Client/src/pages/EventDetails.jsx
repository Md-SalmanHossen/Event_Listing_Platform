import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../library/api/axios";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/user/event/${id}`);
        setEvent(data?.event || null);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin text-green-600" size={40} />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-14 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Event not found</h2>
        <Link
          to="/events"
          className="inline-block mt-6 px-5 py-2.5 rounded-xl bg-green-600 text-white font-semibold"
        >
          Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-10">
      <img
        src={event.image || "https://via.placeholder.com/800x400"}
        alt={event.title}
        className="w-full h-80 object-cover rounded-3xl shadow-md"
      />

      <div className="mt-6">
        <span className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-bold">
          {event.category || "Other"}
        </span>

        <h1 className="text-3xl md:text-4xl font-extrabold mt-3 text-gray-900">
          {event.title}
        </h1>

        <p className="text-gray-500 mt-2">
          📍 {event.location || "TBA"} | 📅{" "}
          {event.date ? new Date(event.date).toLocaleDateString() : "TBA"} | ⏰{" "}
          {event.time || "TBA"}
        </p>

        <div className="mt-6 p-6 bg-gray-50 rounded-2xl border border-dashed">
          <h3 className="font-bold text-lg">About this event</h3>
          <p className="mt-2 text-gray-700 leading-relaxed">
            {event.description || "No description available."}
          </p>
        </div>

        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5 p-6 bg-white border rounded-3xl shadow-sm">
          <div>
            <p className="text-gray-500 text-sm">Ticket Price</p>
            <p className="text-2xl font-extrabold text-green-600">
              ${event.ticketPrice ?? 0}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Remaining: {event.availableTickets ?? 0}
            </p>
          </div>

          <button
            onClick={() => navigate(`/ticket-book/${id}`)}
            className="px-7 py-3 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold transition"
          >
            Book Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
