import { useState } from "react";
import api from "../../library/api/api";
import toast from "react-hot-toast";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("location", location);
    if (image) formData.append("image", image);

    try {
      await api.post("/user/event", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Event created successfully!");
      setTitle(""); setDate(""); setTime(""); setLocation(""); setImage(null);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create Event</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="input input-bordered" required />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input input-bordered" required />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="input input-bordered" required />
        <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="input input-bordered" required />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="input input-bordered" />
        <button type="submit" className="btn bg-green-500 hover:bg-green-600 text-white">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
