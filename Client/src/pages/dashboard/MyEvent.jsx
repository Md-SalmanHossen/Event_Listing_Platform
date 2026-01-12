import { useEffect, useMemo, useState } from "react";
import api from "../../library/api/axios";
import toast from "react-hot-toast";
import { Calendar, Tag, MapPin, Plus, Package, Trash2, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const formatDate = (d) => {
    if (!d) return "N/A";
    try {
      return new Date(d).toLocaleDateString();
    } catch {
      return "N/A";
    }
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/user/event/organizer/my-event");
      setEvents(data?.events || []);
    } catch (err) {
      const msg =
        typeof err === "string"
          ? err
          : err?.response?.data?.message || "Failed to load events";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const totalText = useMemo(() => {
    const n = events.length;
    return `${n} ${n === 1 ? "Event" : "Events"}`;
  }, [events]);

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this event?");
    if (!ok) return;

    try {
      setDeletingId(id);

      // ✅ backend delete route: DELETE /v1/user/event/:id
      const { data } = await api.delete(`/user/event/${id}`);

      toast.success(data?.message || "Event deleted");
      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      const msg =
        typeof err === "string"
          ? err
          : err?.response?.data?.message || "Delete failed";
      toast.error(msg);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="animate-spin text-green-600" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 md:px-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            My Events
          </h2>
          <p className="text-gray-500">Manage all the events you have organized.</p>

          <div className="mt-2 inline-flex bg-green-50 border border-green-100 px-3 py-1 rounded-full text-sm font-bold text-green-700">
            {totalText}
          </div>
        </div>

        <Link
          to="/dashboard/create-event"
          className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-green-700 transition shadow-lg shadow-green-100"
        >
          <Plus size={20} /> Create New Event
        </Link>
      </div>

      {/* Events List */}
      {events.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
          <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="text-gray-300" size={30} />
          </div>
          <h3 className="text-lg font-bold text-gray-800">No events found</h3>
          <p className="text-gray-400 mb-6">You haven't created any events yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col md:flex-row md:items-center gap-6"
            >
              {/* Image + Details */}
              <div className="flex items-center gap-4 flex-1">
                <div className="w-16 h-16 rounded-xl bg-green-50 overflow-hidden flex items-center justify-center flex-shrink-0">
                  {event.image ? (
                    <img
                      src={event.image}
                      className="w-full h-full object-cover"
                      alt={event.title}
                      loading="lazy"
                    />
                  ) : (
                    <Calendar className="text-green-700" size={24} />
                  )}
                </div>

                <div>
                  <h3 className="font-extrabold text-gray-800 text-lg leading-tight mb-1">
                    {event.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1 text-green-700 bg-green-50 px-2 py-1 rounded-lg">
                      <Tag size={12} /> {event.category || "Other"}
                    </span>

                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {formatDate(event.date)}
                    </span>

                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {event.location || "TBA"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats + Actions */}
              <div className="flex items-center justify-between md:justify-end gap-8 border-t md:border-t-0 pt-4 md:pt-0 w-full md:w-auto">
                <div className="text-center">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Ticket Price
                  </p>
                  <p className="font-extrabold text-gray-800">${event.ticketPrice ?? 0}</p>
                </div>

                <div className="text-center">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Total Seats
                  </p>
                  <p className="font-extrabold text-gray-800">{event.totalTickets ?? 0}</p>
                </div>

                <button
                  onClick={() => handleDelete(event._id)}
                  disabled={deletingId === event._id}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 transition disabled:opacity-50"
                >
                  <Trash2 size={16} />
                  {deletingId === event._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
