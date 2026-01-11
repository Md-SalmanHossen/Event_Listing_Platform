import { useEffect, useState } from "react";
import api from "../../library/api/api";
import toast from "react-hot-toast";

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

  if (loading) return <p>Loading events...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Events</h2>
      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {events.map((event) => (
            <li key={event._id} className="p-2 border rounded">
              {event.title} - {event.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyEvents;
