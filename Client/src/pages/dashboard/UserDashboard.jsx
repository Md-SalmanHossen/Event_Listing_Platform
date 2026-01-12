import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from "recharts";
import { CreditCard, User, Ticket, Activity, Calendar } from "lucide-react";
import api from "../../library/api/axios";
import toast from "react-hot-toast";

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
        setChartData([
          { name: "Total", value: total, color: "#4F46E5" },
          { name: "Confirmed", value: confirmed, color: "#10B981" },
          { name: "Pending", value: pending, color: "#F59E0B" },
        ]);
      } catch (err) {
        toast.error("Failed to load stats");
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-gray-800">Overview</h2>
          <p className="text-gray-500">Welcome back!</p>
        </div>
        <Link to="/dashboard/user/profile" className="hidden md:flex items-center gap-2 bg-white border p-2 px-4 rounded-xl font-bold shadow-sm">
          <User size={18} /> My Account
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Tickets" value={stats.total} icon={<Ticket className="text-indigo-600" />} bgColor="bg-indigo-50" />
        <StatCard title="Confirmed" value={stats.confirmed} icon={<Activity className="text-emerald-600" />} bgColor="bg-emerald-50" />
        <StatCard title="Pending" value={stats.pending} icon={<CreditCard className="text-amber-600" />} bgColor="bg-amber-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm min-h-[350px]">
          <h3 className="text-lg font-bold mb-6">Activity Chart</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="99%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#F9FAFB'}} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                  {chartData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-900 p-8 rounded-3xl text-white relative overflow-hidden group">
            <h3 className="text-xl font-bold mb-2">My Profile</h3>
            <p className="text-gray-400 text-sm mb-6">Manage your settings</p>
            <Link to="/dashboard/user/profile" className="inline-block w-full text-center bg-white/10 py-3 rounded-xl font-bold border border-white/10">
              Go to Profile
            </Link>
          </div>
          <div className="bg-indigo-600 p-8 rounded-3xl text-white relative overflow-hidden group">
            <h3 className="text-xl font-bold mb-2">Browse Events</h3>
            <p className="text-indigo-100 text-sm mb-6">Find something new</p>
            <Link to="/events" className="inline-block w-full text-center bg-indigo-500 py-3 rounded-xl font-bold border border-indigo-400">
              Browse Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, bgColor }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-3xl font-black text-gray-800">{value}</p>
    </div>
    <div className={`p-4 rounded-xl ${bgColor}`}>{icon}</div>
  </div>
);

export default UserDashboard;