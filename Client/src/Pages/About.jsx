import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../assets/avatar.png";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const About = () => {
  const navigate = useNavigate();

  const handleRedirect = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white flex items-center justify-center px-4 py-10">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between bg-[#2c2c2c] p-6 md:p-10 rounded-2xl shadow-lg gap-8">
        {/* Left Section */}
        <div className="w-full md:w-2/3">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            PollApp is a platform used to gather opinions or collect data from a
            group of people...
          </p>
          <h3 className="text-2xl font-bold mb-3">Tech Stack</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            <li>
              <span className="font-semibold text-white">Frontend:</span> HTML5,
              CSS3, Javascript
            </li>
            <li>
              <span className="font-semibold text-white">Backend:</span> Node.js
            </li>
            <li>
              <span className="font-semibold text-white">Web Framework:</span>{" "}
              React.js{" "}
            </li>
            <li>
              <span className="font-semibold text-white">Database:</span>{" "}
              MongoDB
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/3 bg-[#1e1e1e] border border-gray-500 rounded-xl p-6 flex flex-col items-center">
          <img
            src={Avatar}
            alt="Developer"
            className="w-32 h-32 rounded-full border-4 border-gray-700 hover:border-green-400 transform hover:scale-105 transition duration-300 mb-4"
          />
          <h4 className="text-xl font-bold">Adarsh M</h4>
          <p className="text-green-400 text-lg font-semibold mb-4">
            Web Developer
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => handleRedirect("https://linkedin.com")}
              className="text-black bg-green-400 p-2 rounded-full hover:scale-110 transition"
            >
              <FaLinkedin size={20} />
            </button>
            <button
              onClick={() => handleRedirect("https://github.com")}
              className="text-black bg-green-400 p-2 rounded-full hover:scale-110 transition"
            >
              <FaGithub size={20} />
            </button>
            <button
              onClick={() => handleRedirect("https://instagram.com")}
              className="text-black bg-green-400 p-2 rounded-full hover:scale-110 transition"
            >
              <FaInstagram size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
