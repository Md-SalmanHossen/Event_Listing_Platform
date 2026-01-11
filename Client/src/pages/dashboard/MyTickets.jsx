import React, { useEffect, useState } from "react";
import api from "../../library/api/api";
import toast from "react-hot-toast";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const { data } = await api.get("/user/ticket/my");
        setTickets(data.tickets || []);
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-800">My Tickets</h2>
        <p className="text-gray-500">Manage and view all your booked event tickets here.</p>
      </div>

      {tickets.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg border-2 border-dashed">
          <p className="text-gray-400">No tickets booked yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {tickets.map((ticket) => (
            <div 
              key={ticket._id} 
              className="bg-white p-5 border rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Event Info Section */}
              <div className="flex-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">Event Name</span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">{ticket.event.title}</h3>
              </div>

              {/* Status Section */}
              <div className="w-32">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-1">Status</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  ticket.status === 'confirmed' || ticket.status === 'Paid' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {ticket.status}
                </span>
              </div>

              {/* Price Section */}
              <div className="w-24 text-right">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-1">Price</span>
                <p className="text-xl font-bold text-gray-800">${ticket.price}</p>
              </div>

              {/* Unique ID (Optional) */}
              <div className="text-xs text-gray-300 hidden lg:block">
                ID: {ticket._id.substring(0, 8)}...
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTickets;