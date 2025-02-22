import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/home" className="flex items-center space-x-3 text-xl font-bold text-black">
      <img
        src="/models/images/GMSlogo.png"
        alt="GMS Logo"
        className="h-16 w-h-16 object-contain rounded-full"
      />
      <span className="px-4 py-2  text-[#4A4A4A] font-bold text-4xl">Genealogy Management System</span>
    </Link>
  );
};

export default Logo;
