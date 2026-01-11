import React, { useEffect, useState } from "react";
import useAuthStore from "../../library/store/store";
import { Navigate, Outlet, Link } from "react-router-dom";
import api from "../../library/api/api";
import toast from "react-hot-toast";

const DashboardLayout = () => {
  const { user, token, logout } = useAuthStore();
  const [dashboardData, setDashboardData] = useState(null);

  // Redirect if no token
  if (!token) return <Navigate to="/login" />;

  // Fetch dashboard stats for user
  useEffect(() => {
    if (user?.role === "user") {
      const fetchDashboard = async () => {
        try {
          const { data } = await api.get("/dashboard/user");
          setDashboardData(data.dashboard);
        } catch (err) {
          toast.error(err.response?.data?.message || err.message);
        }
      };
      fetchDashboard();
    }
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-green-500 text-white p-4 flex justify-between items-center">
        <h1 className="font-bold">Dashboard - {user?.role || "User"}</h1>
        <div className="flex gap-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <button
            onClick={logout}
            className="bg-white text-green-500 px-3 py-1 rounded hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-56 bg-gray-100 p-4">
          {user?.role === "organizer" ? (
            <ul className="flex flex-col gap-2">
              <li>
                <Link to="my-events" className="text-green-500 hover:underline">
                  My Events
                </Link>
              </li>
              <li>
                <Link to="create-event" className="text-green-500 hover:underline">
                  Create Event
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="flex flex-col gap-2">
              <li>
                <Link to="user" className="text-green-500 hover:underline">
                  Dashboard Home
                </Link>
              </li>
              <li>
                <Link to="user/my-tickets" className="text-green-500 hover:underline">
                  My Tickets
                </Link>
              </li>
              <li>
                <Link to="user/profile" className="text-green-500 hover:underline">
                  My Profile
                </Link>
              </li>
            </ul>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-white">
          {user?.role === "user" && dashboardData && (
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded shadow">
                <p className="text-sm text-gray-500">Total Tickets</p>
                <h2 className="text-2xl font-bold">{dashboardData.totalTickets}</h2>
              </div>
              <div className="p-4 bg-green-50 rounded shadow">
                <p className="text-sm text-gray-500">Total Spent</p>
                <h2 className="text-2xl font-bold">${dashboardData.totalSpent}</h2>
              </div>
              <div className="p-4 bg-green-50 rounded shadow">
                <p className="text-sm text-gray-500">Recent Tickets</p>
                <ul className="mt-2 text-sm">
                  {dashboardData.recentTickets.map((ticket) => (
                    <li key={ticket._id}>
                      {ticket.event.title} - {ticket.status}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
