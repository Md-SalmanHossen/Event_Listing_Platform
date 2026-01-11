import { useEffect, useState } from "react";
import api from "../../library/api/api";
import toast from "react-hot-toast";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      const { data } = await api.get("/organizer/tickets");
      setTickets(data.tickets || []);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tickets</h2>
      {tickets.length === 0 ? (
        <p>No tickets found</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {tickets.map((t) => (
            <li key={t._id}>
              {t.event.title} - {t.user.name} - {t.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Tickets;
