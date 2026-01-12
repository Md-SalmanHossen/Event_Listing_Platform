import { useEffect, useMemo, useState } from "react";
import api from "../../library/api/axios";
import toast from "react-hot-toast";
import { Ticket, Calendar, Tag, ArrowRight, Loader2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState(null);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/user/ticket/my");
      setTickets(data?.tickets || []);
    } catch (err) {
      const msg =
        typeof err === "string"
          ? err
          : err?.response?.data?.message || "Failed to load tickets";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const totalText = useMemo(() => {
    const n = tickets.length;
    return `${n} ${n === 1 ? "Ticket" : "Tickets"} Total`;
  }, [tickets]);

  const formatDate = (d) => {
    if (!d) return "Upcoming";
    try {
      return new Date(d).toLocaleDateString();
    } catch {
      return "Upcoming";
    }
  };

  const getStatusBadge = (statusRaw) => {
    const st = (statusRaw || "").toLowerCase();
    if (st === "confirmed") return "bg-green-100 text-green-700";
    if (st === "cancelled") return "bg-rose-100 text-rose-700";
    return "bg-amber-100 text-amber-700"; // pending
  };

  const handleCancel = async (ticketId) => {
    try {
      setCancelingId(ticketId);
      const { data } = await api.put(`/user/ticket/cancel/${ticketId}`);
      toast.success(data?.message || "Ticket cancelled");

      // ✅ UI update (beginner-friendly)
      setTickets((prev) =>
        prev.map((t) => (t._id === ticketId ? { ...t, status: "cancelled" } : t))
      );
    } catch (err) {
      const msg =
        typeof err === "string"
          ? err
          : err?.response?.data?.message || "Cancel failed";
      toast.error(msg);
    } finally {
      setCancelingId(null);
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
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            My Tickets
          </h2>
          <p className="text-gray-500 mt-1">All your booked events in one place.</p>
        </div>

        <div className="bg-green-50 px-4 py-2 rounded-full text-green-700 text-sm font-bold border border-green-100">
          {totalText}
        </div>
      </div>

      {tickets.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 shadow-sm">
          <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Ticket className="text-gray-300" size={40} />
          </div>
          <h3 className="text-xl font-bold text-gray-800">No bookings found</h3>
          <p className="text-gray-500 mb-8 max-w-xs mx-auto">
            You haven't booked any event tickets yet. Start exploring events now!
          </p>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition"
          >
            Browse Events <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {tickets.map((ticket) => {
            const st = (ticket?.status || "").toLowerCase();
            const canCancel = st === "pending" || st === "confirmed";

            return (
              <div
                key={ticket._id}
                className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-green-100 transition overflow-hidden flex flex-col md:flex-row"
              >
                {/* Image */}
                <div className="md:w-48 bg-gray-100 relative">
                  <img
                    src={
                      ticket.event?.image ||
                      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=400"
                    }
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                    alt="event"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider text-gray-800">
                    ID: {String(ticket._id).slice(-6)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-3">
                    <span className="px-2 py-0.5 rounded-md bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-widest">
                      {ticket.event?.category || "Event"}
                    </span>

                    <h3 className="text-xl font-extrabold text-gray-900">
                      {ticket.event?.title || "Event"}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium">
                      <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg">
                        <Tag size={14} /> ${ticket?.price ?? 0}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} /> {formatDate(ticket.event?.date)}
                      </div>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex flex-col items-start md:items-end gap-3">
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                        Status
                      </p>
                      <span
                        className={`px-4 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-widest ${getStatusBadge(
                          ticket.status
                        )}`}
                      >
                        {ticket.status || "pending"}
                      </span>
                    </div>

                    {canCancel ? (
                      <button
                        onClick={() => handleCancel(ticket._id)}
                        disabled={cancelingId === ticket._id}
                        className="inline-flex items-center gap-2 text-xs font-bold text-rose-600 hover:text-rose-700 disabled:opacity-50"
                      >
                        <XCircle size={16} />
                        {cancelingId === ticket._id ? "Canceling..." : "Cancel Ticket"}
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400">No actions available</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyTickets;
