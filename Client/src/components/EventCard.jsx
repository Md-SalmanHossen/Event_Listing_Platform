import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../library/api/api";

const EventCard = ({ event, onBook }) => {
  if (!event) return null; // safe check

  const handleBookNow = async () => {
    if (!onBook) return;
    await onBook(event._id);
  };

  return (
    <div className="card bg-white shadow-md hover:shadow-lg transition rounded-lg overflow-hidden">
      <figure>
        <img
          src={event?.image || "https://via.placeholder.com/400x200"}
          alt={event?.title || "Event"}
          className="h-48 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-lg font-semibold">{event?.title || "Untitled Event"}</h2>
        <p className="text-sm text-gray-500">📍 {event?.location || "Unknown"}</p>
        <p className="text-sm text-gray-500">📅 {event?.date || "-"} ⏰ {event?.time || "-"}</p>

        <div className="card-actions justify-between mt-3">
          <Link
            to={`/events/${event._id}`}
            className="btn btn-sm bg-green-500 hover:bg-green-600 text-white border-none"
          >
            View Details
          </Link>

          <button
            onClick={handleBookNow}
            className="btn btn-sm btn-outline text-green-500 hover:bg-green-50"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
