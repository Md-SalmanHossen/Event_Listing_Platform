import React, { useEffect, useState } from "react";
import api from "../../library/api/api";
import toast from "react-hot-toast";
import { Ticket, Calendar, MapPin, Tag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const { data } = await api.get("/user/ticket/my");
        setTickets(data.tickets || []);
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">My Tickets</h2>
          <p className="text-gray-500 mt-1">All your booked events in one place.</p>
        </div>
        <div className="bg-indigo-50 px-4 py-2 rounded-full text-indigo-600 text-sm font-bold">
          {tickets.length} {tickets.length === 1 ? 'Ticket' : 'Tickets'} Total
        </div>
      </div>

      {tickets.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 shadow-sm">
          <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Ticket className="text-gray-300" size={40} />
          </div>
          <h3 className="text-xl font-bold text-gray-800">No bookings found</h3>
          <p className="text-gray-500 mb-8 max-w-xs mx-auto">You haven't booked any event tickets yet. Start exploring events now!</p>
          <Link to="/events" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all">
            Browse Events <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {tickets.map((ticket) => (
            <div 
              key={ticket._id} 
              className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 overflow-hidden flex flex-col md:flex-row"
            >
              {/* Event Image (Mockup or dynamic) */}
              <div className="md:w-48 bg-gray-100 relative">
                 <img 
                   src={ticket.event?.image || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=400"} 
                   className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                   alt="event"
                 />
                 <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider text-gray-800">
                    ID: {ticket._id.substring(ticket._id.length - 6)}
                 </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest">
                      {ticket.event?.category || 'Event'}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {ticket.event?.title}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium">
                    <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                      <Tag size={14} /> ${ticket.price}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} /> {ticket.event?.date || 'Upcoming'}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-end gap-3">
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                    <span className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest ${
                      ticket.status?.toLowerCase() === 'confirmed' || ticket.status?.toLowerCase() === 'paid'
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-amber-100 text-amber-700'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                  <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline underline-offset-4">
                    Download Receipt
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTickets;