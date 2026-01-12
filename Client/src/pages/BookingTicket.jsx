import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../library/api/axios";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const BookingTicket = () => {
  const { id } = useParams(); // event id
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await api.get(`/user/event/${id}`);
        setEvent(data.event);
      } catch (err) {
        toast.error("Failed to load event");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleConfirmBooking = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please login first");

    try {
      setBookingLoading(true);
      const { data } = await api.post("/user/ticket/book", { eventId: id });
      toast.success(data.message || "Ticket booked successfully!");
      navigate("/dashboard/user/my-tickets");
    } catch (err) {
      const msg =
        typeof err === "string"
          ? err
          : err?.response?.data?.message || "Booking failed";
      toast.error(msg);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin text-green-600" size={40} />
      </div>
    );
  }

  if (!event) {
    return (
      <p className="text-center mt-20 text-gray-500">
        Event not found
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
        Confirm Your Booking
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-4">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-60 object-cover rounded-xl"
        />

        <h2 className="text-2xl font-bold">{event.title}</h2>
        <p className="text-gray-500">
          📍 {event.location} | 📅{" "}
          {new Date(event.date).toLocaleDateString()} | ⏰ {event.time}
        </p>

        <div className="flex justify-between items-center pt-4 border-t">
          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p className="text-xl font-bold text-green-600">
              ${event.ticketPrice}
            </p>
          </div>

          <button
            onClick={handleConfirmBooking}
            disabled={bookingLoading}
            className="px-6 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition disabled:opacity-50"
          >
            {bookingLoading ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingTicket;
