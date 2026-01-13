import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Discover & Create Amazing Events
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto mb-10">
          Join events, book tickets, or become an organizer and host your own
          events easily.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/events")}
            className="px-6 py-3 rounded-xl bg-white text-green-700 font-bold hover:bg-green-50 transition"
          >
            Explore Events
          </button>

          <button
            onClick={() => navigate("/about")}
            className="px-6 py-3 rounded-xl border-2 border-white font-bold hover:bg-white hover:text-green-700 transition"
          >
            About Us
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="px-6 py-3 rounded-xl border-2 border-white font-bold hover:bg-white hover:text-green-700 transition"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
