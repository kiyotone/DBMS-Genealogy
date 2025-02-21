import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-3 text-xl font-bold text-black">
      <img
        src="/models/images/GMSlogo.png"
        alt="GMS Logo"
        className="h-16 w-h-16 object-contain rounded-full"
      />
      <span className="text-black text-3xl font-normal">Genealogy Management System</span>
    </Link>
  );
};

export default Logo;
