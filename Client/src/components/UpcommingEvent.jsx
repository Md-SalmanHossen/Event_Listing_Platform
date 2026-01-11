import { useEffect, useState } from "react";
import api from "../library/api/api";
import toast from "react-hot-toast";
import EventCard from "./EventCard"; // Ekhon import thik kaj korbe
import { Loader2, CalendarDays } from "lucide-react";

const UpcomingEvent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUpcomingEvents = async () => {
    try {
      // Limit 6 ta rakhlam grid layout sundor dekhabe
      const { data } = await api.get("/user/event/all?page=1&limit=6"); 
      
      // Front-end filter: Shudhu future dates gulo rakhbo
      const today = new Date();
      const upcoming = (data.events || []).filter(event => new Date(event.date) >= today);
      
      setEvents(upcoming);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const handleBookTicket = async (eventId) => {
    const token = localStorage.getItem("token"); // Auth check
    if (!token) return toast.error("Please login to book tickets!");

    try {
      await api.post("/user/ticket/book", { eventId });
      toast.success("Ticket booked successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    }
  };

  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  if (loading) return (
    <div className="flex justify-center py-20">
      <Loader2 className="animate-spin text-indigo-600" size={40} />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-gray-900 tracking-tight">Upcoming Events</h2>
        <div className="w-20 h-1.5 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed">
          <CalendarDays className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-500 font-bold">No upcoming events at the moment.</p>
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