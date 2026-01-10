import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Events from "../pages/Events";
import EventDetails from "../pages/EventDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Contact from "../pages/Contact";
import Layout from "../pages/Layout";

const AppRouter = () => {
  return (
    <Routes>
      {/* Layout Route */}
      <Route path="/" element={<Layout/>}>
        <Route index element={<HomePage />} />
        <Route path="events" element={<Events />} />
        <Route path="events/:id" element={<EventDetails />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRouter;
