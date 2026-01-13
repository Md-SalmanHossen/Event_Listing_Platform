import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DollarSign, Users, Calendar, ArrowUpRight, Loader2 } from "lucide-react";
import api from "../../library/api/axios";
import toast from "react-hot-toast";

const OrganizerDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        //  backend route: /v1/dashboard/organizer
        const { data } = await api.get("/dashboard/organizer");
        setDashboard(data?.dashboard || null);
      } catch (err) {
        console.error(err);
        const msg =
          typeof err === "string"
            ? err
            : err?.response?.data?.message || "Failed to load organizer stats";
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const chartData = useMemo(() => {
    const recent = dashboard?.recentTickets || [];
    //  only confirmed tickets chart করলে better (optional)
    const confirmed = recent.filter((t) => (t?.status || "").toLowerCase() === "confirmed");

    const list = confirmed.length ? confirmed : recent;

    return list.map((t) => ({
      name: (t?.event?.title || "Event").slice(0, 10),
      amount: t?.price || 0,
    }));
  }, [dashboard]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin text-green-600" size={40} />
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="p-10 text-center">
        <p className="font-bold text-gray-800">Organizer dashboard not available</p>
        <p className="text-gray-500 text-sm mt-1">Please try again.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-gray-50/50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Organizer Hub
          </h2>
          <p className="text-gray-500">Track your event performance and ticket sales.</p>
        </div>

        <Link
          to="/dashboard/create-event"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-200 transition-all active:scale-95"
        >
          <Calendar size={20} /> Create New Event
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Total Revenue"
          value={`$${dashboard.totalRevenue || 0}`}
          icon={<DollarSign className="text-emerald-600" />}
          color="bg-emerald-100"
          trend="Confirmed sales"
        />
        <StatCard
          label="Events Hosted"
          value={dashboard.totalEvents || 0}
          icon={<Calendar className="text-blue-600" />}
          color="bg-blue-100"
          trend="All events"
        />
        <StatCard
          label="Tickets Sold"
          value={dashboard.totalTickets || 0}
          icon={<Users className="text-purple-600" />}
          color="bg-purple-100"
          trend="All bookings"
        />
      </div>

      {/* Chart + Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Revenue Overview</h3>
            <div className="text-xs text-gray-400">Latest activity</div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16A34A" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#16A34A"
                  fill="url(#colorRev)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Recent Bookings</h3>

          <div className="space-y-4">
            {dashboard.recentTickets?.length ? (
              dashboard.recentTickets.map((ticket) => (
                <div
                  key={ticket._id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-2xl transition border border-transparent hover:border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-700 font-bold text-xs">
                      {(ticket.user?.name || "U").slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800 line-clamp-1">
                        {ticket.event?.title || "Event"}
                      </p>
                      <p className="text-[10px] text-gray-400 font-medium">
                        {ticket.user?.name || "User"}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-800">${ticket.price || 0}</p>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${
                        (ticket.status || "").toLowerCase() === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : (ticket.status || "").toLowerCase() === "cancelled"
                          ? "bg-rose-100 text-rose-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {ticket.status || "pending"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center">No recent bookings</p>
            )}
          </div>

          <Link
            to="/dashboard/tickets"
            className="block text-center mt-6 text-sm font-bold text-green-700 hover:text-green-800"
          >
            View All Sales →
          </Link>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon, color, trend }) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
    <div className="flex justify-between items-start relative z-10">
      <div>
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
        <h4 className="text-3xl font-extrabold text-gray-900 mt-2">{value}</h4>
        <p className="text-xs font-medium text-green-700 mt-2 flex items-center gap-1">
          <ArrowUpRight size={14} /> {trend}
        </p>
      </div>
      <div className={`p-4 rounded-2xl ${color} transition-transform group-hover:rotate-12`}>
        {icon}
      </div>
    </div>
  </div>
);

export default OrganizerDashboard;
