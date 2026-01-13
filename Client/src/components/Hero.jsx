import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-green-600 mt-10  text-white">
      <div className="max-w-6xl mx-auto px-6 py-24 text-center">
        
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Discover Amazing Events Near You
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl mb-8">
          Book tickets, join events, and create unforgettable memories.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/events")}
          className="bg-white text-green-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition"
        >
          Explore Events
        </button>

      </div>
    </div>
  );
};

export default Hero;
