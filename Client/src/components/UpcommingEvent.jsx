import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import api from "../library/api/api";
import toast from "react-hot-toast";

const UpcomingEvent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUpcomingEvents = async () => {
    try {
      const { data } = await api.get("/user/event?page=1&limit=5");
      setEvents(data.events || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const handleBookTicket = async (eventId) => {
    try {
      await api.post("/user/ticket/book", { eventId });
      toast.success("Ticket booked successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-2xl font-bold mb-8 text-center">Upcoming Events</h2>

      {loading ? (
        <p className="text-center">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-500">No events found</p>
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
