import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import {
  FaHome,
  FaChartBar,
  FaMousePointer,
  FaInfoCircle,
  FaLock,
  FaUserCircle,
} from "react-icons/fa";
import Logo from "../../assets/favicon.png";
import avatar from "../../assets/avatar.png";
import { useAuth } from "../Custom/UseAuth";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Detect scroll to add shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`bg-[#1e1e1e] text-white sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-lg" : "shadow-none"
      }`}
    >
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

        {/* Desktop Nav */}
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

        {/* Desktop Auth/Profile */}
        <div className="hidden md:flex items-center space-x-4 font-semibold text-xl relative">
          {!user ? (
            <>
              <Link to="/login" className="hover:text-green-400">
                Login
              </Link>
              <Link
                to="/register"
                className="border border-white px-4 py-1 rounded-full hover:bg-green-500 hover:text-black transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <img
                src={avatar}
                alt="Profile"
                onClick={() => setProfileOpen((prev) => !prev)}
                className="w-12 h-12 rounded-full border-2 border-white hover:border-green-400 transition duration-200 cursor-pointer"
              />
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#2d2d2d] text-white rounded-lg shadow-lg z-50 p-4 transition duration-300 ease-in-out">
                  <div className="flex items-center space-x-3 mb-4 border-b border-gray-600 pb-4">
                    <img
                      src={avatar}
                      alt="User Avatar"
                      className="w-12 h-12 rounded-full bg-gray-500"
                    />
                    <div>
                      <p className="font-bold text-lg">{user.name}</p>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm font-medium">
                    <Link
                      to="/"
                      className="flex items-center space-x-2 hover:text-green-400"
                    >
                      <FaHome />
                      <span>Home</span>
                    </Link>
                    <Link
                      to="/polls"
                      className="flex items-center space-x-2 hover:text-green-400"
                    >
                      <FaChartBar />
                      <span>View Polls</span>
                    </Link>
                    <Link
                      to="/about"
                      className="flex items-center space-x-2 hover:text-green-400"
                    >
                      <FaInfoCircle />
                      <span>About</span>
                    </Link>
                    <Link
                      to="/change-password"
                      className="flex items-center space-x-2 hover:text-green-400"
                    >
                      <FaLock />
                      <span>Reset Password</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 text-left text-red-400 hover:text-red-300 w-full"
                    >
                      <IoMdClose />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => {
            setMenuOpen(!menuOpen);
            setMobileProfileOpen(false);
          }}
        >
          {menuOpen ? <IoMdClose /> : <IoMdMenu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#1c1c1c] text-white p-4 rounded-b-xl shadow-lg space-y-4 text-[16px]">
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

          {!user ? (
            <>
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
            </>
          ) : (
            <>
              <button
                onClick={() => setMobileProfileOpen((prev) => !prev)}
                className="flex items-center space-x-2 font-semibold hover:text-green-400"
              >
                <FaUserCircle className="text-xl" />
                <span>{mobileProfileOpen ? "Hide" : "Show"} Profile</span>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out transform ${
                  mobileProfileOpen
                    ? "opacity-100 max-h-screen mt-4"
                    : "opacity-0 max-h-0 overflow-hidden"
                } bg-[#2a2a2a] text-white p-4 rounded-md space-y-2`}
              >
                <div className="flex items-center space-x-3 border-b border-gray-600 pb-4 mb-3">
                  <img
                    src={avatar}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full border border-white"
                  />
                  <div>
                    <p className="font-bold">{user.name}</p>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                  </div>
                </div>

                <Link
                  to="/polls"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center space-x-2 hover:text-green-600"
                >
                  <FaChartBar />
                  <span>View Polls</span>
                </Link>
                <Link
                  to="/change-password"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center space-x-2 hover:text-green-600"
                >
                  <FaLock />
                  <span>Reset Password</span>
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center space-x-2 text-red-500 hover:text-red-800"
                >
                  <IoMdClose />
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
