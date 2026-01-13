import { Calendar, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event, onBook }) => {
  const navigate = useNavigate();

  // event বা id না থাকলে render করব না
  if (!event || !event._id) return null;

  const goDetails = () => {
    navigate(`/events/${event._id}`);
  };

  // Date safe (invalid date হলে Upcoming)
  const dateText = (() => {
    if (!event?.date) return "Upcoming";
    const d = new Date(event.date);
    if (isNaN(d.getTime())) return "Upcoming";
    return d.toLocaleDateString();
  })();

  return (
    <div
      onClick={goDetails}
      className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      <div className="h-48 relative overflow-hidden bg-gray-100">
        <img
          src={
            event?.image ||
            "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"
          }
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          alt={event?.title || "Event"}
        />

        {event?.category && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase text-green-600">
            {event.category}
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 text-green-600 mb-2">
          <Calendar size={14} />
          <span className="text-xs font-bold uppercase tracking-wider">
            {dateText}
          </span>
        </div>

        <h3 className="text-lg font-black text-gray-900 mb-2 line-clamp-1">
          {event?.title || "Untitled Event"}
        </h3>

        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
          <MapPin size={14} />
          <span className="truncate">{event?.location || "TBA"}</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <p className="text-xl font-black text-gray-900">
            ${event?.ticketPrice ?? 0}
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation(); // card click details block
              // onBook থাকলে call, না থাকলে booking page এ যাও
              if (onBook) onBook(event._id);
              else navigate(`/ticket-book/${event._id}`);
            }}
            className="bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-green-700 active:scale-95 transition-all"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
