import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../library/store/useAuthStore";
import toast from "react-hot-toast";

const Register = () => {
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return toast.error("Name is required");
    if (!email.trim()) return toast.error("Email is required");
    if (password.length < 6) return toast.error("Password must be at least 6 characters");

    try {
      setLoading(true);
      await register(name, email, password);

      toast.success("Register successful! Please login.");
      navigate("/login");
    } catch (err) {
      // ✅ works for both string error and axios error
      const msg =
        typeof err === "string"
          ? err
          : err?.response?.data?.message || err?.message || "Register failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4"
      >
        <h2 className="text-2xl font-extrabold text-green-600 text-center">
          Create account
        </h2>
        <p className="text-center text-sm text-gray-500">
          Join Eventify and start booking events.
        </p>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-200"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-200"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Minimum 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-200"
            required
          />
        </div>

        <button
          disabled={loading}
          className={`w-full px-4 py-2 rounded-lg text-white font-semibold transition ${
            loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Creating..." : "Register"}
        </button>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
