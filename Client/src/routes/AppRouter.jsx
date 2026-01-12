import { Routes, Route } from "react-router-dom";
import Layout from "../pages/Layout";

import HomePage from "../pages/HomePage";
import Events from "../pages/Events";
import EventDetails from "../pages/EventDetails";
import BookingTicket from "../pages/BookingTicket";
import About from "../pages/About";
import Contact from "../pages/Contact";

import Login from "../pages/Login";
import Register from "../pages/Register";

// Dashboard
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
      {/* Main Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path="events" element={<Events />} />
        <Route path="events/:id" element={<EventDetails />} />

        {/* booking */}
        <Route path="ticket-book/:id" element={<BookingTicket />} />

        {/* ✅ Added */}
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<UserDashboard />} />

        {/* User */}
        <Route path="user/my-tickets" element={<MyTickets />} />
        <Route path="user/profile" element={<Profile />} />

        {/* Organizer */}
        <Route path="my-events" element={<MyEvents />} />
        <Route path="create-event" element={<CreateEvent />} />
        <Route path="tickets" element={<Tickets />} />
      </Route>

      {/* Optional 404 */}
      {/* <Route path="*" element={<div className="p-10 text-center">404 Not Found</div>} /> */}
    </Routes>
  );
};

export default AppRouter;
