import { useEffect, useMemo, useState } from "react";
import api from "../library/api/axios";
import toast from "react-hot-toast";
import EventCard from "../components/EventCard";
import { Loader2 } from "lucide-react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search / Filter / Sort states
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("date_asc");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/user/event");
        setEvents(data?.events || []);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Category dropdown list
  const categories = useMemo(() => {
    const set = new Set((events || []).map((e) => e?.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [events]);

  // Apply search + filter + sort
  const visibleEvents = useMemo(() => {
    let list = [...events];

    // Search
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((e) => {
        const t = (e?.title || "").toLowerCase();
        const l = (e?.location || "").toLowerCase();
        return t.includes(q) || l.includes(q);
      });
    }

    // Filter category
    if (category !== "All") {
      list = list.filter((e) => e?.category === category);
    }

    // Sort
    if (sort === "date_asc") {
      list.sort((a, b) => new Date(a?.date) - new Date(b?.date));
    } else if (sort === "date_desc") {
      list.sort((a, b) => new Date(b?.date) - new Date(a?.date));
    } else if (sort === "price_asc") {
      list.sort((a, b) => (a?.ticketPrice ?? 0) - (b?.ticketPrice ?? 0));
    } else if (sort === "price_desc") {
      list.sort((a, b) => (b?.ticketPrice ?? 0) - (a?.ticketPrice ?? 0));
    }

    return list;
  }, [events, search, category, sort]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin text-green-600" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
        All Events
      </h1>
      <p className="text-gray-500 mt-2">Search, filter and sort events.</p>

      {/* Controls */}
      <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or location..."
          className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="date_asc">Sort: Date (Old → New)</option>
          <option value="date_desc">Sort: Date (New → Old)</option>
          <option value="price_asc">Sort: Price (Low → High)</option>
          <option value="price_desc">Sort: Price (High → Low)</option>
        </select>
      </div>

      {/* List */}
      {visibleEvents.length === 0 ? (
        <div className="text-center py-16 mt-10 bg-gray-50 rounded-2xl border border-dashed">
          <p className="text-gray-500 font-semibold">No events found.</p>
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10">
          {visibleEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
