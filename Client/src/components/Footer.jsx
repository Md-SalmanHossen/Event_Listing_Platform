

import { Link } from "react-router-dom";

const Footer=()=>{
  return (
    <footer className="w-full bg-slate-50 text-gray-700">
      <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col gap-10">

        {/* Top */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold text-gray-900">
              Salman Hossen
            </h2>
            <p className="text-sm text-gray-600">
              MERN Stack Developer
            </p>
          </div>

          {/* Navigation */}
          <div className="flex gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-black transition">Home</Link>
            <Link to="/Events" className="hover:text-black transition">Events</Link>
            <Link to="/about" className="hover:text-black transition">About</Link>
            <Link to="/contact" className="hover:text-black transition">Contact</Link>
          </div>
        </div>

        {/* Social */}
        <div className="flex justify-center gap-5 text-indigo-500">
          <a href="https://github.com/Md-SalmanHossen" target="_blank" rel="noreferrer"
             className="hover:-translate-y-1 transition">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/md-salman-hossen/" target="_blank" rel="noreferrer"
             className="hover:-translate-y-1 transition">
            LinkedIn
          </a>
        </div>

        {/* Bottom */}
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Salman Hossen. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

