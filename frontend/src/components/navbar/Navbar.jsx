import React, { useState } from "react";
import Logo from "./Logo";
import Menu from "./Menu";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#A78B71] shadow-md pr-20 pl-8 fixed top-0 w-full z-50 py-6 flex items-center justify-between">
      <Logo />
      <button
        className="text-3xl font-bold text-[#4A4A4A] mb-6 md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>
      <Menu isOpen={menuOpen} />
    </nav>
  );
};

export default Navbar;
