import { useEffect, useMemo, useState } from "react";
import api from "../../library/api/axios";
import toast from "react-hot-toast";
import { Ticket, User, Calendar, Loader2, Search } from "lucide-react";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all"); // all | pending | confirmed | cancelled

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/organizer/tickets");
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

  const filteredTickets = useMemo(() => {
    const list = Array.isArray(tickets) ? tickets : [];

    return list.filter((t) => {
      const tStatus = (t?.status || "").toLowerCase();
      const matchesStatus = status === "all" || tStatus === status;

      const text = `${t?.event?.title || ""} ${t?.user?.name || ""} ${t?._id || ""}`.toLowerCase();
      const matchesQuery = text.includes(query.toLowerCase());

      return matchesStatus && matchesQuery;
    });
  }, [tickets, query, status]);

  const totalRevenue = useMemo(() => {
    //  only confirmed tickets contribute revenue
    return filteredTickets
      .filter((t) => (t?.status || "").toLowerCase() === "confirmed")
      .reduce((sum, t) => sum + (t?.price || 0), 0);
  }, [filteredTickets]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="animate-spin text-green-600" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4 md:p-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Ticket Sales
          </h2>
          <p className="text-gray-500 text-sm">
            Monitor and manage all ticket bookings for your events.
          </p>
        </div>

        <div className="bg-green-50 px-6 py-3 rounded-2xl border border-green-100">
          <p className="text-xs font-bold text-green-700 uppercase tracking-widest">
            Total Revenue (Confirmed)
          </p>
          <p className="text-xl font-extrabold text-green-900">${totalRevenue}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <div className="relative w-full md:max-w-sm">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by event, user, or ID..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-200 bg-white"
          />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-200 bg-white"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {filteredTickets.length === 0 ? (
          <div className="p-20 text-center">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Ticket className="text-gray-300" size={30} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">No tickets found</h3>
            <p className="text-gray-500 text-sm">
              When users book your events, they will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Event & Customer
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Price
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Order ID
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {filteredTickets.map((t) => {
                  const st = (t?.status || "").toLowerCase();
                  const badge =
                    st === "confirmed"
                      ? "bg-emerald-100 text-emerald-700"
                      : st === "cancelled"
                      ? "bg-rose-100 text-rose-700"
                      : "bg-amber-100 text-amber-700";

                  return (
                    <tr key={t._id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-700 group-hover:scale-110 transition-transform">
                            <Calendar size={18} />
                          </div>

                          <div>
                            <p className="font-bold text-gray-800 line-clamp-1">
                              {t?.event?.title || "Deleted Event"}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <User size={12} /> {t?.user?.name || "Unknown User"}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span className="font-bold text-gray-900">
                          ${t?.price ?? 0}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${badge}`}
                        >
                          {t?.status || "unknown"}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <code className="text-[10px] bg-gray-100 px-2 py-1 rounded-lg text-gray-600 font-mono">
                          #{String(t?._id || "").slice(-8)}
                        </code>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tickets;
