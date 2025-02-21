import React, { useState } from "react";
import Logo from "./Logo";
import Menu from "./Menu";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#a78b71] shadow-md px-30 fixed top-0 w-full z-50 py-6 flex items-center justify-between">
      <Logo />
      <button
        className="text-black text-2xl md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>
      <Menu isOpen={menuOpen} />
    </nav>
  );
};

export default Navbar;
