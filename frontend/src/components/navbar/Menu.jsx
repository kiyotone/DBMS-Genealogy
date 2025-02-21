import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";

const Menu = ({ isOpen }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  console.log(user);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    logout();
    // Refresh the page
    window.location.reload();
  };

  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } md:flex flex-col md:flex-row md:items-center md:space-x-12`}
    >
      {/* Home Button */}
      <button
        onClick={()=> navigate("/home")}
        className="  text-[#4A4A4A] font-bold text-2xl hover:scale-115 duration-400 ease-in-out cursor-pointer transition"
      >
        Home
      </button>
      {/* About Button */}
      <button
        onClick={()=> navigate("/about")}
        className="  text-[#4A4A4A] font-bold text-2xl hover:scale-115 duration-400 ease-in-out cursor-pointer transition"
      >
        About
      </button>
      
      {user ? (
        <button
          className="py-4  text-[#4A4A4A] font-bold text-2xl hover:scale-115 duration-400 ease-in-out cursor-pointer transition"
          onClick={() => logoutHandler()}
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="py-4 text-[#4A4A4A] font-bold text-2xl hover:scale-115 duration-400 ease-in-out cursor-pointer transition"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Menu;
