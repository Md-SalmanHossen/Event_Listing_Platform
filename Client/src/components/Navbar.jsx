import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../library/store/useAuthStore";
import { useState } from "react";

const NavLink = ({ to, children, onClick }) => {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`px-3 py-2 rounded-lg transition ${
        active ? "text-green-600 bg-green-50" : "hover:text-green-600 hover:bg-green-50"
      }`}
    >
      {children}
    </Link>
  );
};

const Navbar = () => {
  const { token, logout } = useAuthStore();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setOpen(false);

  return (
    <nav className="w-full bg-white/90 backdrop-blur border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-10 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-green-600">
          Eventify
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2 font-medium text-gray-700">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-3">
          {token ? (
            <>
              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-lg text-green-600 font-semibold hover:bg-green-50 transition"
              >
                Dashboard
              </Link>

              <button
                onClick={logout}
                className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 active:scale-[0.98] transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-lg border border-green-600 text-green-600 font-semibold hover:bg-green-50 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 active:scale-[0.98] transition"
              >
                Register
              </button>
            </>
          )}
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-2">
          <NavLink to="/" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/events" onClick={closeMenu}>Events</NavLink>
          <NavLink to="/about" onClick={closeMenu}>About</NavLink>
          <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>

          <div className="pt-3 border-t border-gray-100 space-y-2">
            {token ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="block px-4 py-2 rounded-lg text-center text-green-600 font-semibold hover:bg-green-50 transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="w-full px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                    closeMenu();
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-green-600 text-green-600 font-semibold hover:bg-green-50 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/register");
                    closeMenu();
                  }}
                  className="w-full px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
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
