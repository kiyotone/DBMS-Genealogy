import React from 'react';
import styles from "./Signup.module.css";

const Signup = () => {
  return (
    <div className={styles.signupcontainer}>
      <div className={styles.signupcard}>
        <div className={styles.logocontainer}>
          <img src="models/images/GMSlogo.png" alt="GMS Logo" className={styles.logo} />
          <h1 className={styles.apptitle}>GMS</h1>
        </div>

        <div className={styles.cardcontent}>
          <h2 className={styles.signuptitle}>Sign Up</h2>
          <form className={styles.signupform}>
            <div className={styles.inputgroup}>
              <input
                type="text"
                placeholder="FirstName"
                className={styles.inputfield}
              />
            </div>
            <div className={styles.inputgroup}>
              <input
                type="text"
                placeholder="LastName"
                className={styles.inputfield}
              />
            </div>

            <div className={styles.inputgroup}>
              <img src="/models/images/user-solid.svg" alt="Username" className={styles.icon} />
              <input
                type="text"
                placeholder="Username"
                className={styles.inputfield}
              />
            </div>
            <div className={styles.inputgroup}>
              <img src="/models/images/email.svg" alt="Email" className={styles.icon} />
              <input
                type="email"
                placeholder="Email"
                className={styles.inputfield}
              />
            </div>
            <div className={styles.inputgroup}>
              <img src="/models/images/lock-solid.svg" alt="Password" className={styles.icon} />
              <input
                type="password"
                placeholder="Password"
                className={styles.inputfield}
              />
            </div>
            <div className={styles.inputgroup}>
              <img src="/models/images/lock-solid.svg" alt="Confirm Password" className={styles.icon} />
              <input
                type="password"
                placeholder="Confirm Password"
                className={styles.inputfield}
              />
            </div>

            <button className={styles.signupbutton}>Sign Up</button>
          </form>
          <div className={styles.loginprompt}>
            <p>
              Already have an account?{' '}
              <a href="/login" className={styles.loginlink}>
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
