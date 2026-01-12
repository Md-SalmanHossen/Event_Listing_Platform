import { Routes, Route } from "react-router-dom";
import Layout from "../pages/Layout";

// Public pages
import HomePage from "../pages/HomePage";
import Events from "../pages/Events";
import EventDetails from "../pages/EventDetails";
import BookingTicket from "../pages/BookingTicket";
import About from "../pages/About";
import Contact from "../pages/Contact";

// Auth pages
import Login from "../pages/Login";
import Register from "../pages/Register";

// Dashboard pages
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import UserDashboard from "../pages/dashboard/UserDashboard";
import MyTickets from "../pages/dashboard/MyTickets";
import Profile from "../pages/dashboard/Profile";
import MyEvents from "../pages/dashboard/MyEvent";
import CreateEvent from "../pages/dashboard/CreateEvent";
import Tickets from "../pages/dashboard/Ticket";

const AppRouter = () => {
  return (
    <Routes>
      {/* ===== Public (with Navbar + Footer) ===== */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path="events" element={<Events />} />
        <Route path="events/:id" element={<EventDetails />} />

        {/* Booking (optional, later implement) */}
        <Route path="ticket-book/:id" element={<BookingTicket />} />

        {/* Static pages */}
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* ===== Auth (no Layout) ===== */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ===== Dashboard (protected by DashboardLayout) ===== */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* Default dashboard */}
        <Route index element={<UserDashboard />} />

        {/* User routes */}
        <Route path="user/my-tickets" element={<MyTickets />} />
        <Route path="user/profile" element={<Profile />} />

        {/* Organizer routes */}
        <Route path="my-events" element={<MyEvents />} />
        <Route path="create-event" element={<CreateEvent />} />
        <Route path="tickets" element={<Tickets />} />
      </Route>

      {/* ===== 404 ===== */}
      <Route
        path="*"
        element={<div className="p-10 text-center font-bold">404 Not Found</div>}
      />
    </Routes>
  );
};

export default AppRouter;
