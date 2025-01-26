import React from "react";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate(); // Initialize the navigation hook

  const handleSignUpClick = () => {
    navigate("/signup"); // Navigate to the /signup page
  };

  return (
    <nav className={styles.Navbar}>
      <Link to="/" className={styles.title}>
        <div className={styles.container}>
          <img src="models/images/GMSlogo.png" alt="GMS Logo" className={styles.logo} />
          Geneology Management System
        </div>
      </Link>
      <div className={styles.menu}>
        <ul className={styles.menuItems}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/search">Search</Link></li>
          <li><Link to="/about">About</Link></li>
          <li>
            <button
              className={styles.signUpButton}
              onClick={handleSignUpClick} // Add click handler for navigation
            >
              Sign Up
            </button>
          </li>
        </ul>
        <br />
      </div>
    </nav>
  );
};

export default Navbar;