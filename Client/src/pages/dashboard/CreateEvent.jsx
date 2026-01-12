import React, { useState } from "react";
import api from "../../library/api/axios";
import toast from "react-hot-toast";
import { Upload, Calendar, MapPin, DollarSign, Tag } from "lucide-react";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "Music",
    ticketPrice: "",
    totalTickets: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    // Shob fields append kora
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (image) data.append("image", image);

    try {
      await api.post("/organizer/event", data); // Backend route check: /organizer/event or /user/event
      toast.success("Event created successfully!");
      // Form reset logic...
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-3xl shadow-sm border">
      <h2 className="text-2xl font-black mb-6">Create New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Event Title" className="w-full p-3 border rounded-xl" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" className="w-full p-3 border rounded-xl" onChange={handleChange} required />
        
        <div className="grid grid-cols-2 gap-4">
           <input type="date" name="date" className="p-3 border rounded-xl" onChange={handleChange} required />
           <input type="time" name="time" className="p-3 border rounded-xl" onChange={handleChange} required />
        </div>

        <div className="grid grid-cols-2 gap-4">
           <input type="number" name="ticketPrice" placeholder="Ticket Price ($)" className="p-3 border rounded-xl" onChange={handleChange} required />
           <input type="number" name="totalTickets" placeholder="Total Tickets" className="p-3 border rounded-xl" onChange={handleChange} required />
        </div>

        <select name="category" className="w-full p-3 border rounded-xl" onChange={handleChange}>
           <option value="Music">Music</option>
           <option value="Tech">Tech</option>
           <option value="Sports">Sports</option>
        </select>

        <div className="border-2 border-dashed p-4 rounded-xl text-center">
           <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />
           <p className="text-xs text-gray-400 mt-2">Upload event cover image</p>
        </div>

        <button disabled={loading} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all">
          {loading ? "Creating..." : "Launch Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;