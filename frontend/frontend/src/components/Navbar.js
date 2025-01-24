import React from "react";
import styles from "./Navbar.module.css";


const Navbar = () => {
  return (
     <nav className ={styles.Navbar}>
       <a className={styles.title} >
        <div className={styles.container}> 
        <img src= "models/images/GMSlogo.png" alt="GMS Logo" className={styles.logo}/> Geneology Management System
       </div>
       </a>
       <div className ={styles.menu}>
         <ul className =
         {styles.menuItems}>
           <li>
             <a href ="#Home"> Home </a>
           </li>
           <li>
             <a href ="#Search">Search</a>
           </li>
           <li>
             <a href ="#About"> About</a>
           </li>
           <li>
             <button className={styles.signUpButton}>Sign Up</button>
           </li>
         </ul>
         <br/>
       </div>
     </nav>
  );
};

export default Navbar;
