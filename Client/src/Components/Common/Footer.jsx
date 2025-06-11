import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4">
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Social Icons */}
        <div className="flex space-x-6 text-2xl">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="hover:text-blue-400" />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <FaGithub className="hover:text-gray-400" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:text-pink-400" />
          </a>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 font-semibold">
          <Link to="/" className="hover:text-green-400">Home</Link>
          <Link to="#" className="hover:text-green-400">Create</Link>
          <Link to="#" className="hover:text-green-400">Demo</Link>
          <Link to="#" className="hover:text-green-400">About</Link>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-gray-500 mt-4"></div>

        {/* Copyright */}
        <p className="text-sm text-center mt-4">&copy; 2025 PollApp. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
