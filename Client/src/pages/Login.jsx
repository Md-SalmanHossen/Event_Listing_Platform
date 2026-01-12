import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../library/store/useAuthStore";
import toast from "react-hot-toast";

const Login = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) return toast.error("Email is required");
    if (!password.trim()) return toast.error("Password is required");

    try {
      setLoading(true);
      await login(email, password);
      toast.success("Login successful");
      navigate("/"); // or navigate("/dashboard")
    } catch (err) {
      const msg =
        typeof err === "string"
          ? err
          : err?.response?.data?.message || err?.message || "Login failed";
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
          Welcome back
        </h2>
        <p className="text-center text-sm text-gray-500">
          Login to continue booking events.
        </p>

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
            placeholder="Your password"
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
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <Link to="/register" className="text-green-600 font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
