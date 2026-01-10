import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../library/store/store";
import { useState } from "react";

const Navbar = () => {
  const { token, logout } = useAuthStore();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-white shadow-md relative">
      <div className="max-w-8xl mx-auto md:px-16 flex items-center justify-between h-16">
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="text-2xl font-bold text-green-500">
            Eventify
          </Link>
        </div>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex flex-1 justify-center gap-8 font-medium">
          <Link to="/" className="hover:text-green-500 transition">Home</Link>
          <Link to="/events" className="hover:text-green-500 transition">Events</Link>
          <Link to="/contact" className="hover:text-green-500 transition">Contact</Link>
        </div>

        {/* Right Side Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {token ? (
            <>
              <Link
                to="/dashboard"
                className="text-green-500 font-medium hover:text-green-600 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="border border-green-500 text-green-500 px-4 py-1 rounded-md hover:bg-green-50 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md transition"
              >
                Register
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="cursor-pointer text-2xl focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white shadow-md absolute w-full left-0 top-16 flex flex-col items-center gap-4 py-4 z-50">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="w-full text-center py-1 hover:text-green-500 transition"
          >
            Home
          </Link>
          <Link
            to="/events"
            onClick={() => setOpen(false)}
            className="w-full text-center py-1 hover:text-green-500 transition"
          >
            Events
          </Link>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="w-full text-center py-1 hover:text-green-500 transition"
          >
            Contact
          </Link>

          <div className="flex flex-col gap-2 mt-2 w-full items-center">
            {token ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="w-full text-center py-1 text-green-500 hover:text-green-600 transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="w-full bg-green-500 text-white py-1 rounded-md hover:bg-green-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                    setOpen(false);
                  }}
                  className="w-full border border-green-500 text-green-500 py-1 rounded-md hover:bg-green-50 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/register");
                    setOpen(false);
                  }}
                  className="w-full bg-green-500 text-white py-1 rounded-md hover:bg-green-600 transition"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
