import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

const EventCard = ({ event, onBook }) => {
  // Jodi event na thake, tahole khali div return korbe crash na kore
  if (!event) return null;

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="h-48 relative overflow-hidden bg-gray-100">
        <img 
          // Safe reading: event?.image
          src={event?.image || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          alt={event?.title || "Event"}
        />
        {event?.category && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase text-indigo-600">
            {event.category}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 text-indigo-600 mb-2">
          <Calendar size={14} />
          <span className="text-xs font-bold uppercase tracking-wider">{event?.date || "Upcoming"}</span>
        </div>
        
        <h3 className="text-lg font-black text-gray-900 mb-2 line-clamp-1">
          {event?.title || "Untitled Event"}
        </h3>
        
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
          <MapPin size={14} />
          <span className="truncate">{event?.location || "TBA"}</span>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <p className="text-xl font-black text-gray-900">${event?.ticketPrice || 0}</p>
          <button 
            onClick={() => onBook(event?._id)}
            className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 active:scale-95 transition-all"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;