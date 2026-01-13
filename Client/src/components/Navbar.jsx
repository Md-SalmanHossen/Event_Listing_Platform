import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../library/store/useAuthStore";
import { useEffect, useState } from "react";

const NavItem = ({ to, children, onClick }) => {
  const location = useLocation();

  // ✅ active also works for nested routes (events/:id etc.)
  const active = to === "/"
    ? location.pathname === "/"
    : location.pathname === to || location.pathname.startsWith(to + "/");

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`px-3 py-2 rounded-lg transition ${
        active
          ? "text-green-700 bg-green-50 font-semibold"
          : "text-gray-700 hover:text-green-700 hover:bg-green-50"
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
  const location = useLocation();

  const closeMenu = () => setOpen(false);

  // ✅ route change হলে mobile menu auto close
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="w-full bg-white/90 backdrop-blur border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-10 flex items-center justify-between h-16 min-w-0">
        {/* Logo */}
        <Link to="/" className="text-xl sm:text-2xl font-extrabold text-green-600 whitespace-nowrap">
          Eventify
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/events">Events</NavItem>
          <NavItem to="/about">About</NavItem>
          <NavItem to="/contact">Contact</NavItem>
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-3">
          {token ? (
            <>
              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-lg text-green-700 font-semibold hover:bg-green-50 transition"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 active:scale-[0.98] transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-lg border border-green-600 text-green-700 font-semibold hover:bg-green-50 transition"
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
          onClick={() => setOpen((v) => !v)}
          className="md:hidden px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
  <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4">
    {/* ✅ links stacked */}
    <div className="flex flex-col gap-2">
      <NavItem to="/" onClick={closeMenu}>Home</NavItem>
      <NavItem to="/events" onClick={closeMenu}>Events</NavItem>
      <NavItem to="/about" onClick={closeMenu}>About</NavItem>
      <NavItem to="/contact" onClick={closeMenu}>Contact</NavItem>
    </div>

    {/* ✅ auth buttons stacked */}
    <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
      {token ? (
        <>
          <Link
            to="/dashboard"
            className="block px-4 py-2 rounded-lg text-center text-green-700 font-semibold hover:bg-green-50 transition"
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => navigate("/login")}
            className="w-full px-4 py-2 rounded-lg border border-green-600 text-green-700 font-semibold hover:bg-green-50 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
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
