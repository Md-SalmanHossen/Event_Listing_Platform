import { useEffect, useState } from "react";
import api from "../../library/api/api";
import toast from "react-hot-toast";
import { Calendar, Tag, MapPin, Plus, Package } from "lucide-react";
import { Link } from "react-router-dom";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const { data } = await api.get("/user/event/organizer/my-event");
      setEvents(data.events || []);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">My Events</h2>
          <p className="text-gray-500">Manage all the events you have organized.</p>
        </div>
        <Link 
          to="/dashboard/create-event" 
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
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
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center gap-6"
            >
              {/* Event Image & Details */}
              <div className="flex items-center gap-4 flex-1">
                <div className="w-16 h-16 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0 font-bold">
                  {event.image ? (
                    <img src={event.image} className="w-full h-full object-cover rounded-xl" alt="" />
                  ) : (
                    <Calendar size={24} />
                  )}
                </div>
                <div>
                  <h3 className="font-black text-gray-800 text-lg leading-tight mb-1">{event.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1 text-indigo-500">
                      <Tag size={12} /> {event.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {event.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats/Price Info */}
              <div className="flex items-center gap-8 border-t md:border-t-0 pt-4 md:pt-0">
                <div className="text-center">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Ticket Price</p>
                  <p className="font-black text-gray-800">${event.ticketPrice}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Seats</p>
                  <p className="font-black text-gray-800">{event.totalTickets}</p>
                </div>
                <div className="flex gap-2">
                   <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                     {/* Edit icon/button thakte pare pore */}
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

export default MyEvents;