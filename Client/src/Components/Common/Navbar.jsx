import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import {
  FaHome,
  FaChartBar,
  FaMousePointer,
  FaInfoCircle,
} from "react-icons/fa";
import Logo from "../../assets/favicon.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#1e1e1e] text-white border-none shadow-none">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center relative">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-3xl font-bold">
          <img
            src={Logo}
            alt="PollApp Logo"
            className="w-8 h-8 object-contain"
          />
          <p className="ml-2 select-none">PollApp</p>
        </Link>

        {/* Desktop Menu  */}
        <div className="hidden md:flex justify-center flex-1 space-x-8 font-semibold text-xl">
          <Link to="/" className="hover:text-green-400">
            Home
          </Link>
          <Link to="/create" className="hover:text-green-400">
            Create
          </Link>
          <Link to="/demo" className="hover:text-green-400">
            Demo
          </Link>
          <Link to="/about" className="hover:text-green-400">
            About
                 </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4 font-semibold text-xl">
          <Link to="/login" className="hover:text-green-400">
            Login
          </Link>
          <Link
            to="/register"
            className="border border-white px-4 py-1 rounded-full hover:bg-green-500 hover:text-black transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <IoMdClose /> : <IoMdMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 text-white p-4 rounded-b-xl shadow-lg space-y-4 text-[16px]">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center space-x-2 hover:text-green-400"
          >
            <FaHome />
            <span>Home</span>
          </Link>
          <Link
            to="/create"
            onClick={() => setMenuOpen(false)}
            className="flex items-center space-x-2 hover:text-green-400"
          >
            <FaChartBar />
            <span>Create Poll</span>
          </Link>
          <Link
            to="/demo"
            onClick={() => setMenuOpen(false)}
            className="flex items-center space-x-2 hover:text-green-400"
          >
            <FaMousePointer />
            <span>Demo</span>
          </Link>
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="flex items-center space-x-2 hover:text-green-400"
          >
            <FaInfoCircle />
            <span>About</span>
          </Link>

          <Link
            to="/register"
            onClick={() => setMenuOpen(false)}
            className="block text-center w-full bg-white text-black font-semibold py-2 rounded-md hover:bg-gray-200"
          >
            Sign up
          </Link>
          <div className="text-center text-gray-400 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-green-400 font-bold"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
