import useAuthStore from '../../library/store/store'
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Ticket, User, Calendar, PlusCircle, LogOut, Home } from 'lucide-react';

const DashboardLayout = () => {
  const { user, token, logout } = useAuthStore();
  const location = useLocation();

  if (!token) return <Navigate to='/login' />;
  if (!user) return <div className="p-10 text-center font-bold">Loading...</div>;

  const menuItems = user.role === 'organizer' 
    ? [
        { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20}/> },
        { name: 'My Events', path: '/dashboard/my-events', icon: <Calendar size={20}/> },
        { name: 'Create Event', path: '/dashboard/create-event', icon: <PlusCircle size={20}/> },
        { name: 'Ticket Sales', path: '/dashboard/tickets', icon: <Ticket size={20}/> },
        { name: 'Profile', path: '/dashboard/user/profile', icon: <User size={20}/> },
      ]
    : [
        { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20}/> },
        { name: 'My Tickets', path: '/dashboard/user/my-tickets', icon: <Ticket size={20}/> },
        { name: 'Profile', path: '/dashboard/user/profile', icon: <User size={20}/> },
      ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6">
          <Link to="/" className="text-xl font-black text-indigo-600 uppercase tracking-tighter">
            EventCloud
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {/* Back to Home Button (Extra add kora holo) */}
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-emerald-600 hover:bg-emerald-50 transition-all mb-4 border border-emerald-100"
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
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                location.pathname === item.path 
                ? "bg-indigo-50 text-indigo-600" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {item.icon} {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t">
          <button onClick={logout} className="flex items-center gap-3 px-4 py-3 text-red-500 font-bold w-full hover:bg-red-50 rounded-xl transition-all">
            <LogOut size={20}/> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10 flex justify-between items-center">
          {/* Mobile Home Link */}
          <Link to="/" className="md:hidden p-2 text-indigo-600">
            <Home size={24} />
          </Link>

          <div className="flex items-center gap-3 ml-auto">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900 leading-none">{user.name}</p>
              <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{user.role}</p>
            </div>
            <img src={user.image || "https://via.placeholder.com/40"} className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100" />
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