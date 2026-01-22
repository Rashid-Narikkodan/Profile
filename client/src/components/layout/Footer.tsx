import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram, FaXingSquare } from "react-icons/fa";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto border-t border-purple-800/40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 py-6 space-y-4 md:space-y-0">

        {/* Left */}
        <div className="text-sm md:text-base">
          &copy; {currentYear} Profile.io. All rights reserved.
        </div>

        {/* Center */}
        <div className="flex flex-wrap space-x-6 text-sm md:text-base">
          <Link to="/privacy" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-white transition-colors">
            Terms
          </Link>
          <Link to="/support" className="hover:text-white transition-colors">
            Support
          </Link>
        </div>

        {/* Right */}
        <div className="flex space-x-5 text-lg">
          <a
            href="https://github.com/Rashid-Narikkodan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/rashidnarikkodan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://instagram.com/rashid_narikkodan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <FaInstagram />
          </a>
          <a
            href="https://x.com/rashidnarikodan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <FaXingSquare />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
