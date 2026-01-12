import { useEffect, useState } from "react";
import api from "../../library/api/axios";
import toast from "react-hot-toast";
import { Ticket, User, Calendar, DollarSign, Search } from "lucide-react";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    try {
      const { data } = await api.get("/organizer/tickets");
      setTickets(data.tickets || []);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Ticket Sales</h2>
          <p className="text-gray-500 text-sm">Monitor and manage all ticket bookings for your events.</p>
        </div>
        
        {/* Simple Search Stats */}
        <div className="bg-indigo-50 px-6 py-3 rounded-2xl border border-indigo-100">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Total Revenue</p>
          <p className="text-xl font-black text-indigo-900">
            ${tickets.reduce((sum, t) => sum + (t.price || 0), 0)}
          </p>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {tickets.length === 0 ? (
          <div className="p-20 text-center">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Ticket className="text-gray-300" size={30} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">No tickets found</h3>
            <p className="text-gray-500 text-sm">When users book your events, they will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Event & Customer</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Price</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Order ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {tickets.map((t) => (
                  <tr key={t._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                          <Calendar size={18} />
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 line-clamp-1">{t.event?.title || "Deleted Event"}</p>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <User size={12} /> {t.user?.name || "Unknown User"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="font-bold text-gray-900">${t.price}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        t.status?.toLowerCase() === 'confirmed' || t.status?.toLowerCase() === 'paid'
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-amber-100 text-amber-700'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <code className="text-[10px] bg-gray-100 px-2 py-1 rounded-lg text-gray-500 font-mono">
                        #{t._id.substring(t._id.length - 8)}
                      </code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tickets;