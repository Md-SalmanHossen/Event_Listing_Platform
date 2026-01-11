import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";
import { DollarSign, Users, Calendar, ArrowUpRight } from "lucide-react";
import api from "../../library/api/api";
import toast from "react-hot-toast";

const OrganizerDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await api.get("/organizer/dashboard"); // backend route
        setData(data.dashboard);
      } catch (err) {
        toast.error("Failed to load organizer stats");
      }
    };
    fetchDashboard();
  }, []);

  if (!data) return <div className="p-10 text-center font-bold">Loading Organizer Panel...</div>;

  return (
    <div className="p-6 space-y-8 bg-gray-50/50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Organizer Hub</h2>
          <p className="text-gray-500">Track your event performance and ticket sales.</p>
        </div>
        <Link 
          to="/dashboard/create-event" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 transition-all active:scale-95"
        >
          <Calendar size={20} /> Create New Event
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Total Revenue" 
          value={`$${data.totalRevenue || 0}`} 
          icon={<DollarSign className="text-emerald-600" />} 
          color="bg-emerald-100" 
          trend={data.revenueTrend || "+0%"}
        />
        <StatCard 
          label="Events Hosted" 
          value={data.totalEvents || 0} 
          icon={<Calendar className="text-blue-600" />} 
          color="bg-blue-100" 
          trend="Active campaigns"
        />
        <StatCard 
          label="Tickets Sold" 
          value={data.totalTickets || 0} 
          icon={<Users className="text-purple-600" />} 
          color="bg-purple-100" 
          trend="All time sales"
        />
      </div>

      {/* Revenue Chart + Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Revenue Overview</h3>
            <select className="bg-gray-50 border-none text-sm rounded-lg focus:ring-0">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.recentTickets?.map(t => ({
                name: t.event?.title?.substring(0, 10) || "Event",
                amount: t.price || 0
              })) || []}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="amount" stroke="#4F46E5" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Recent Bookings</h3>
          <div className="space-y-4">
            {data.recentTickets?.map((ticket) => (
              <div key={ticket._id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-2xl transition-colors border border-transparent hover:border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs">
                    {ticket.user?.name?.substring(0, 2).toUpperCase() || "US"}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 line-clamp-1">{ticket.event?.title || "Event"}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{ticket.user?.name || "User"}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-800">${ticket.price || 0}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    ticket.status === 'confirmed' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                  }`}>
                    {ticket.status || "pending"}
                  </span>
                </div>
              </div>
            )) || <p className="text-gray-400 text-center">No recent bookings</p>}
          </div>
          <Link to="/dashboard/tickets" className="block text-center mt-6 text-sm font-bold text-indigo-600 hover:text-indigo-700">
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
        <h4 className="text-3xl font-black text-gray-900 mt-2">{value}</h4>
        <p className="text-xs font-medium text-indigo-500 mt-2 flex items-center gap-1">
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
