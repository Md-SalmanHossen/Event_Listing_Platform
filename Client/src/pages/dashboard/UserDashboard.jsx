import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Navigation er jonno import kora holo
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from "recharts";
import { CreditCard, User, Ticket, Activity, Calendar } from "lucide-react";
import api from "../../library/api/api";
import toast from "react-hot-toast";

// dashboard/user/profile

const UserDashboard = () => {
  const [stats, setStats] = useState({ total: 0, pending: 0, confirmed: 0 });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await api.get("/user/ticket/my");
        const tickets = data.tickets || [];
        
        const total = tickets.length;
        const pending = tickets.filter(t => t.status?.toLowerCase() === "pending").length;
        const confirmed = tickets.filter(t => t.status?.toLowerCase() === "paid" || t.status?.toLowerCase() === "confirmed").length;
        
        setStats({ total, pending, confirmed });

        const dataForChart = [
          { name: "Total Booked", value: total, color: "#4F46E5" },
          { name: "Confirmed", value: confirmed, color: "#10B981" },
          { name: "Pending", value: pending, color: "#F59E0B" },
        ];
        setChartData(dataForChart);
      } catch (err) {
        toast.error("Failed to load dashboard stats");
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-gray-800 tracking-tight">Overview</h2>
          <p className="text-gray-500">Welcome back! Manage your events and bookings.</p>
        </div>
        <Link 
          to="/user/profile" 
          className="hidden md:flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-sm hover:bg-gray-50 transition-all text-sm font-semibold"
        >
          <User size={18} /> My Account
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Tickets" value={stats.total} icon={<Ticket className="text-indigo-600" />} bgColor="bg-indigo-50" />
        <StatCard title="Confirmed" value={stats.confirmed} icon={<Activity className="text-emerald-600" />} bgColor="bg-emerald-50" />
        <StatCard title="Pending" value={stats.pending} icon={<CreditCard className="text-amber-600" />} bgColor="bg-amber-50" />
      </div>

      {/* Chart & Quick Actions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Booking Analytics</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#F9FAFB'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={50}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group">
             {/* Decorative Background Icon */}
            <User className="absolute -right-4 -bottom-4 text-white/10 group-hover:scale-110 transition-transform" size={120} />
            
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <User size={20} /> Personal Profile
            </h3>
            <p className="text-gray-300 text-sm mb-6 max-w-[200px]">Update your info, change photo, and more.</p>
            <Link 
              to="/dashboard/user/profile" 
              className="inline-block w-full text-center bg-white/10 hover:bg-white/20 py-3 rounded-xl font-bold transition-all backdrop-blur-sm border border-white/10"
            >
              Go to Profile
            </Link>
          </div>
          
          <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group">
            {/* Decorative Background Icon */}
            <Calendar className="absolute -right-4 -bottom-4 text-white/10 group-hover:scale-110 transition-transform" size={120} />

            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Ticket size={20} /> New Events
            </h3>
            <p className="text-indigo-100 text-sm mb-6 max-w-[200px]">Check out the latest upcoming events.</p>
            <Link 
              to="/events" 
              className="inline-block w-full text-center bg-indigo-500 hover:bg-indigo-400 py-3 rounded-xl font-bold transition-all shadow-lg border border-indigo-400"
            >
              Browse Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ title, value, icon, bgColor }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-indigo-100 transition-colors">
    <div>
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
      <p className="text-3xl font-black text-gray-800 mt-1">{value}</p>
    </div>
    <div className={`p-4 rounded-xl ${bgColor}`}>
      {icon}
    </div>
  </div>
);

export default UserDashboard;