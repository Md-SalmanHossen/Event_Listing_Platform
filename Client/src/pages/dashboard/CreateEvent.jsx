import { useState } from "react";
import api from "../../library/api/api";
import toast from "react-hot-toast";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "", description: "", date: "", time: "", 
    location: "", category: "Music", ticketPrice: "", totalTickets: ""
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (image) data.append("image", image);

    try {
      await api.post("/user/event", data, { headers: { "Content-Type": "multipart/form-data" } });
      toast.success("Event created successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <h2 className="text-2xl font-black text-gray-800 mb-6">Create New Event</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="title" onChange={handleChange} placeholder="Event Title" className="md:col-span-2 p-3 border rounded-xl" required />
        <textarea name="description" onChange={handleChange} placeholder="Description" className="md:col-span-2 p-3 border rounded-xl h-24" required />
        <input name="date" type="date" onChange={handleChange} className="p-3 border rounded-xl" required />
        <input name="time" type="time" onChange={handleChange} className="p-3 border rounded-xl" required />
        <input name="location" onChange={handleChange} placeholder="Location" className="p-3 border rounded-xl" required />
        <select name="category" onChange={handleChange} className="p-3 border rounded-xl">
          <option>Music</option><option>Sports</option><option>Tech</option><option>Workshop</option>
        </select>
        <input name="ticketPrice" type="number" onChange={handleChange} placeholder="Ticket Price ($)" className="p-3 border rounded-xl" required />
        <input name="totalTickets" type="number" onChange={handleChange} placeholder="Total Tickets" className="p-3 border rounded-xl" required />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="md:col-span-2 p-2 border-2 border-dashed rounded-xl" required />
        <button type="submit" className="md:col-span-2 bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all">Publish Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;