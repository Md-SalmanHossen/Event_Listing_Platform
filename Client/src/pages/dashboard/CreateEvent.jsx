import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../library/api/axios";
import toast from "react-hot-toast";
import { Loader2, Image as ImageIcon } from "lucide-react";

const CATEGORIES = ["Music", "Tech", "Sports", "Education", "Art", "Other"];

const CreateEvent = () => {
  const navigate = useNavigate();

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
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // cleanup preview
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (preview) URL.revokeObjectURL(preview);
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      category: "Music",
      ticketPrice: "",
      totalTickets: "",
    });
    setImage(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validations
    if (!image) return toast.error("Event image is required");
    if (!formData.title.trim()) return toast.error("Title is required");
    if (!formData.description.trim()) return toast.error("Description is required");
    if (!formData.location.trim()) return toast.error("Location is required");

    const price = Number(formData.ticketPrice);
    const total = Number(formData.totalTickets);

    if (Number.isNaN(price) || price < 0) return toast.error("Ticket price must be 0 or more");
    if (Number.isNaN(total) || total < 1) return toast.error("Total tickets must be at least 1");

    try {
      setLoading(true);

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("date", formData.date);
      data.append("time", formData.time);
      data.append("location", formData.location);
      data.append("category", formData.category);
      data.append("ticketPrice", String(price));
      data.append("totalTickets", String(total));
      data.append("image", image);

      //  backend route: POST /v1/user/event
      const res = await api.post("/user/event", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res.data?.message || "Event created successfully!");
      resetForm();

      // go to my events
      navigate("/dashboard/my-events");
    } catch (err) {
      console.error(err);
      const msg =
        typeof err === "string"
          ? err
          : err?.response?.data?.message || "Something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-extrabold mb-2 text-gray-900">Create New Event</h2>
      <p className="text-sm text-gray-500 mb-6">
        Fill the form and publish your event.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-100"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          className="w-full p-3 border rounded-xl min-h-[120px] outline-none focus:ring-2 focus:ring-green-100"
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="date"
            name="date"
            value={formData.date}
            className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-100"
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-100"
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="text"
          name="location"
          placeholder="Location (e.g., Dhaka, Bangladesh)"
          value={formData.location}
          className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-100"
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="number"
            name="ticketPrice"
            placeholder="Ticket Price"
            value={formData.ticketPrice}
            className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-100"
            onChange={handleChange}
            min={0}
            required
          />
          <input
            type="number"
            name="totalTickets"
            placeholder="Total Tickets"
            value={formData.totalTickets}
            className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-100"
            onChange={handleChange}
            min={1}
            required
          />
        </div>

        <select
          name="category"
          value={formData.category}
          className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-100"
          onChange={handleChange}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Image upload */}
        <div className="border-2 border-dashed p-4 rounded-xl text-center bg-gray-50">
          <div className="flex items-center justify-center gap-2 text-gray-600 font-bold">
            <ImageIcon size={18} /> Upload cover image
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-3 block w-full text-sm"
            required
          />

          {preview && (
            <div className="mt-4">
              <img
                src={preview}
                alt="Preview"
                className="w-full max-h-64 object-cover rounded-2xl border"
              />
            </div>
          )}

          <p className="text-xs text-gray-400 mt-2">
            JPG/PNG/WebP recommended.
          </p>
        </div>

        <button
          disabled={loading}
          className="w-full cursor-pointer bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} /> Creating...
            </>
          ) : (
            "Launch Event"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
