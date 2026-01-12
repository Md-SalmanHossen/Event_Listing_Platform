import { useEffect, useState } from "react";
import api from "../library/api/axios";
import toast from "react-hot-toast";
import EventCard from "./EventCard";
import { Loader2, CalendarDays } from "lucide-react";

const UpcomingEvent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUpcomingEvents = async () => {
    try {
      const { data } = await api.get("/user/event?page=1&limit=6");

      const today = new Date();
      const upcoming = (data.events || []).filter((e) => new Date(e.date) >= today);

      setEvents(upcoming);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const handleBookTicket = async (eventId) => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please login to book tickets!");

    try {
      await api.post("/user/ticket/book", { eventId });
      toast.success("Ticket booking request submitted!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    }
  };

  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-green-600" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-14">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Upcoming Events
        </h2>
        <p className="text-gray-500 mt-2">Discover what’s happening next.</p>
        <div className="w-20 h-1.5 bg-green-600 mx-auto mt-4 rounded-full" />
      </div>

      {events.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed">
          <CalendarDays className="mx-auto text-gray-300 mb-3" size={44} />
          <p className="text-gray-500 font-semibold">No upcoming events right now.</p>
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event._id} event={event} onBook={handleBookTicket} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingEvent;
