import React from "react";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div class={styles.container}>
      <div class={styles.item}>
         <img src= "models/images/GMSlogo.png" alt="GMS Logo" className={styles.logo}/> 
         <p><b>Discover your Family Background</b></p>
         <p>Login and find the details about your ancestors and their lives in records.</p>
         <button className={styles.loginButton}>Login</button>
      </div>
     
      <div class={styles.item}>
      <img src= "models/images/familyphoto.jpg" alt="Family photo" className={styles.image}/>
         <p>Find out if you are related.</p>
      </div>
</div>

  )
}

export default Home
