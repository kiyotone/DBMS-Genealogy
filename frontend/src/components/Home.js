import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { testLoad } from "./testload";

const Home = () => {
  const [familyData, setFamilyData] = useState(null);  // State to hold the fetched data

  useEffect(() => {
    const fetchFamilyData = async () => {
      try {
        const data = await testLoad();  // Assuming testLoad is returning a promise
        setFamilyData(data);  // Set the data to state
      } catch (error) {
        console.error("Error fetching family data:", error);
      }
    };

    fetchFamilyData();
  }, []);  // Empty dependency array to run once when the component mounts

  console.log(familyData);  // Logs the data fetched from the promise

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <img src="models/images/GMSlogo.png" alt="GMS Logo" className={styles.logo} />
        <p><b>Discover your Family Background</b></p>
        <p>Login and find the details about your ancestors and their lives in records.</p>
        <button className={styles.loginButton}>Login</button>
      </div>

      <div className={styles.item}>
        <img src="models/images/familyphoto.jpg" alt="Family photo" className={styles.image} />
        <p>Find out if you are related.</p>
      </div>
    </div>
  );
};

export default Home;
