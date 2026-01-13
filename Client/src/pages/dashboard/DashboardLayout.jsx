import { useEffect, useMemo, useState } from "react";
import useAuthStore from "../../library/store/useAuthStore";
import { Navigate, Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Ticket,
  User,
  Calendar,
  PlusCircle,
  LogOut,
  Home,
  Menu,
  X,
} from "lucide-react";

const DashboardLayout = () => {
  const { user, token, logout, setUser } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  //  mobile sidebar toggle
  const [mobileOpen, setMobileOpen] = useState(false);

  //  not logged in → login
  if (!token) return <Navigate to="/login" state={{ from: location }} replace />;

  //  sometimes refresh হলে store এ user null হতে পারে — localStorage থেকে তুলে নাও
  useEffect(() => {
    if (!user) {
      const stored = localStorage.getItem("user");
      if (stored && stored !== "undefined") {
        try {
          setUser(JSON.parse(stored));
        } catch {}
      }
    }
  }, [user, setUser]);

  //  still no user
  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center font-bold text-gray-700">
        Loading profile...
      </div>
    );
  }

  const menuItems = useMemo(() => {
    if (user.role === "organizer") {
      return [
        { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
        { name: "My Events", path: "/dashboard/my-events", icon: <Calendar size={20} /> },
        { name: "Create Event", path: "/dashboard/create-event", icon: <PlusCircle size={20} /> },
        { name: "Ticket Sales", path: "/dashboard/tickets", icon: <Ticket size={20} /> },
        { name: "Profile", path: "/dashboard/user/profile", icon: <User size={20} /> },
      ];
    }

    return [
      { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
      { name: "My Tickets", path: "/dashboard/user/my-tickets", icon: <Ticket size={20} /> },
      { name: "Profile", path: "/dashboard/user/profile", icon: <User size={20} /> },
    ];
  }, [user.role]);

  //  active state for nested routes
  const isActive = (path) => {
    if (path === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* ===== Desktop Sidebar ===== */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6">
          <Link to="/" className="text-xl font-extrabold text-green-600 uppercase tracking-tight">
            Eventify
          </Link>
          <p className="text-xs text-gray-400 font-semibold mt-1">Dashboard Panel</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-green-700 hover:bg-green-50 transition mb-4 border border-green-100"
          >
            <Home size={20} /> Back to Home
          </Link>

          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-2">
            Menu
          </div>

          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${
                isActive(item.path)
                  ? "bg-green-50 text-green-700 border border-green-100"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {item.icon} {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-rose-600 font-bold w-full hover:bg-rose-50 rounded-xl transition"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* ===== Mobile Sidebar Drawer ===== */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div onClick={closeMobile} className="absolute inset-0 bg-black/30" />
          <div className="absolute left-0 top-0 h-full w-72 bg-white border-r border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <Link to="/" onClick={closeMobile} className="text-lg font-extrabold text-green-600">
                Eventify
              </Link>
              <button onClick={closeMobile} className="p-2 rounded-lg hover:bg-gray-50">
                <X />
              </button>
            </div>

            <Link
              to="/"
              onClick={closeMobile}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-green-700 hover:bg-green-50 transition mb-4 border border-green-100"
            >
              <Home size={20} /> Back to Home
            </Link>

            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-2">
              Menu
            </div>

            <div className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobile}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${
                    isActive(item.path)
                      ? "bg-green-50 text-green-700 border border-green-100"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {item.icon} {item.name}
                </Link>
              ))}
            </div>

            <div className="mt-6 border-t pt-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 text-rose-600 font-bold w-full hover:bg-rose-50 rounded-xl transition"
              >
                <LogOut size={20} /> Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Main Content ===== */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10 flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-50"
            aria-label="Open menu"
          >
            <Menu />
          </button>

          <Link to="/" className="md:hidden p-2 text-green-700">
            <Home size={24} />
          </Link>

          <div className="ml-auto flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900 leading-none">{user.name}</p>
              <p className="text-[10px] font-bold text-green-700 uppercase tracking-widest">
                {user.role === "organizer" ? "Organizer" : "User"}
              </p>
            </div>

            <img
              src={user.image || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.name)}
              alt="User avatar"
              className="w-10 h-10 rounded-full object-cover border-2 border-green-100"
            />
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
