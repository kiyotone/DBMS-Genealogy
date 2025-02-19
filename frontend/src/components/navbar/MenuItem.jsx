import React from "react";
import { Link } from "react-router-dom";

const MenuItem = ({ to, label }) => {
  return (
    <li>
      <Link
        to={to}
        className="text-black text-2xl  font-bold hover:text-[#00bcd4] hover:scale-75 ease-in-out duration-400"
      >
        {label}
      </Link>
    </li>
  );
};

export default MenuItem;
