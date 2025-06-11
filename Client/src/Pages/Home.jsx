import React from "react";
import { Link } from "react-router-dom";
import HomePic from "../assets/img.png";

const Home = () => {
  return (
    <div className="bg-[#1e1e1e] text-white min-h-screen px-6 py-12 flex items-center justify-center">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="flex-1 flex flex-col text-center lg:text-left order-2 lg:order-1">
          {/* Heading */}
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Let's Create a Poll
            </h1>
            <div className="text-white text-4xl md:text-6xl font-extrabold leading-tight">
              and get the answer you need
            </div>
          </div>

          {/* Description + Buttons */}
          <div className="mt-6">
            <p className="text-lg text-gray-300">
              Make better decisions, get instant feedback, and predict voter
              behavior with the help of Poll.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link to="/create">
                <button className="bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition w-full sm:w-auto">
                  Create a Poll
                </button>
              </Link>
              <Link to="/polls">
                <button className="bg-green-500 text-black font-semibold px-6 py-3 rounded-lg hover:bg-green-400 transition w-full sm:w-auto">
                  View Polls
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 w-full order-3 lg:order-2">
          <img
            src={HomePic}
            alt="Poll Illustration"
            className="w-full max-w-full lg:max-w-xl mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
