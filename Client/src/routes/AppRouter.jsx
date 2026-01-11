import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Events from "../pages/Events";
import EventDetails from "../pages/EventDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Layout from "../pages/Layout";
import BookingTicket from "../pages/BookingTicket";

// Dashboard imports
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import UserDashboard from "../pages/dashboard/UserDashboard";
import OrganizerDashboard from "../pages/dashboard/OrganizerDashboard";
import MyTickets from "../pages/dashboard/MyTickets";
import Profile from "../pages/dashboard/Profile";
import MyEvents from "../pages/dashboard/MyEvent";
import CreateEvent from "../pages/dashboard/CreateEvent";

const AppRouter = () => {
  return (
    <Routes>
      {/* Main Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="events" element={<Events />} />
        <Route path="events/:id" element={<EventDetails />} />
        <Route path="ticket-book/:id" element={<BookingTicket />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<UserDashboard />} />
        <Route path="user" element={<UserDashboard />} />
        <Route path="user/my-tickets" element={<MyTickets />} />
        <Route path="user/profile" element={<Profile />} />

        <Route path="organizer" element={<OrganizerDashboard />} />
        <Route path="organizer/my-events" element={<MyEvents />} />
        <Route path="organizer/create-event" element={<CreateEvent />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
