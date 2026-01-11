import React, { useEffect, useState } from "react";
import api from "../library/api/api";
import toast from "react-hot-toast";
import { Search, ArrowUpDown, Filter, Loader2, AlertCircle } from "lucide-react";
import EventCard from "../components/EventCard"; 

const EventListing = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        // Backend route ta check korun: /user/event/all naki shudhu /user/event
        const response = await api.get("/user/event/all");
        
        console.log("Backend Data:", response.data); // Console e check koren data asche kina

        // Jodi data.events thake tobe seta set hobe, nahole khali array
        setEvents(response.data.events || response.data || []);
      } catch (err) {
        console.error("Fetch Error:", err);
        toast.error("Could not load events from server");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Filter and Sort Logic with Safety Checks
  const filteredEvents = (Array.isArray(events) ? events : [])
    .filter((event) => {
      if (!event || !event.title) return false; // Bad data skip korbe
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === "All" || event.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const dateA = new Date(a?.date || 0);
      const dateB = new Date(b?.date || 0);
      if (sortBy === "newest") return dateB - dateA;
      if (sortBy === "oldest") return dateA - dateB;
      return 0;
    });

  const handleBookTicket = async (eventId) => {
    try {
      await api.post("/user/ticket/book", { eventId });
      toast.success("Ticket booked!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Loader2 className="animate-spin text-indigo-600" size={40} />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Search & Filter Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <h1 className="text-3xl font-black text-gray-900">Explore Events</h1>
        
        <div className="flex flex-wrap gap-3">
          <input 
            type="text" 
            placeholder="Search..." 
            className="p-3 border rounded-2xl outline-none focus:border-indigo-300"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className="p-3 border rounded-2xl outline-none"
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Music">Music</option>
            <option value="Tech">Tech</option>
          </select>
          <button 
            onClick={() => setSortBy(sortBy === "newest" ? "oldest" : "newest")}
            className="bg-indigo-600 text-white px-5 py-3 rounded-2xl font-bold"
          >
            {sortBy === "newest" ? "Newest First" : "Oldest First"}
          </button>
        </div>
      </div>

      {/* Grid Display */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-[40px] border border-dashed">
          <AlertCircle className="mx-auto text-gray-300 mb-4" size={48} />
          <h3 className="text-lg font-bold text-gray-800">No events found</h3>
          <p className="text-gray-500 text-sm">Server theke kono data asche na ba filter match korche na.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            // Ekhane amra check korchi event exist kore kina
            event && event._id ? (
              <EventCard key={event._id} event={event} onBook={handleBookTicket} />
            ) : null
          ))}
        </div>
      )}
    </div>
  );
};

export default EventListing;