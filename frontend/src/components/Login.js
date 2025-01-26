import React from 'react';
import styles from "./Login.module.css";

const Login = () => {
  return (
    <div className={styles.logincontainer}>
      <div className={styles.logincard}>
        <div className={styles.logocontainer}>
          <img src="models/images/GMSlogo.png" alt="GMS Logo" className={styles.logo} />
          <h1 className={styles.apptitle}>GMS</h1>
        </div>

        <div className={styles.cardcontent}>
          <h2 className={styles.logintitle}>Login</h2>
          <form className={styles.loginform}>
            <div className={styles.inputgroup}>
              <span className="icon user-icon"></span>
              <img src="/models/images/user-solid.svg" alt="Username" className={styles.icon} />
              <input
                type="text"
                placeholder="Username"
                className={styles.inputfield}
              />
            </div>
            <div className={styles.inputgroup}>
              <span className="icon mail-icon"></span>
              <img src="/models/images/lock-solid.svg" alt="Password" className={styles.icon} />
              <input
                type="password"
                placeholder="Password"
                className={styles.inputfield}
              />
            </div>
            <div className={styles.formoptions}>
              <div className={styles.checkboxgroup}>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember" className={styles.checkboxlabel}>
                  Remember Me
                </label>
              </div>
              <a href="/forgotpassword" className={styles.forgotpasswordlink}>
                Forgot password?
              </a>
            </div>
            <button className={styles.loginbutton}>Login</button>
          </form>
          <div className={styles.register - prompt}>
            <p>
              Don’t have an account?{' '}
              <a href="/signup" className={styles.registerlink}>
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>

  );
}
export default Login;
