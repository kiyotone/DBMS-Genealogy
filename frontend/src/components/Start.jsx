import React from "react";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();

  // Handle navigation for Login and Sign Up buttons
  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-[#FDF7F2] px-4 py-10">

      {/* Title */}
      <h1 className="text-3xl font-bold text-[#4A4A4A] mb-6">
        Welcome to Our Family Tree Management!
      </h1>

      {/* Buttons for Login & Sign Up */}
      <div className="flex flex-col space-y-6">
        <button
          onClick={handleLogin}
          className="px-6 py-3 bg-[#A78B71] text-white font-semibold text-2xl rounded-lg shadow-md hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          Login
        </button>
        <button
          onClick={handleSignUp}
          className="px-6 py-3 bg-[#7C5E4C] text-white font-semibold text-2xl rounded-lg shadow-md hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default StartPage;
