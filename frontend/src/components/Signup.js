import React from 'react';
import { useForm } from 'react-hook-form';
import styles from "./Signup.module.css";
import { signup } from '../api/auth';

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    // Handle form submission here
    // Remove confirm password from data
    delete data.confirmPassword;
    // Add role to data
    data.role = 'User';
    console.log(data);

    const lowerCasedData = Object.keys(data).reduce((acc, key) => {
      acc[key.toLowerCase()] = data[key];
      return acc;
    }, {});

    const response = await signup(lowerCasedData);
    console.log(response);
    

  };

  return (
    <div className={styles.signupcontainer}>
      <div className={styles.signupcard}>
        <div className={styles.logocontainer}>
          <img src="models/images/GMSlogo.png" alt="GMS Logo" className={styles.logo} />
          <h1 className={styles.apptitle}>GMS</h1>
        </div>

        <div className={styles.cardcontent}>
          <h2 className={styles.signuptitle}>Sign Up</h2>
          <form className={styles.signupform} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputgroup}>
              <input
                type="text"
                placeholder="FirstName"
                className={styles.inputfield}
                {...register('firstName', { required: 'First name is required' })}
              />
              {errors.firstName && <p className={styles.error}>{errors.firstName.message}</p>}
            </div>
            <div className={styles.inputgroup}>
              <input
                type="text"
                placeholder="LastName"
                className={styles.inputfield}
                {...register('lastName', { required: 'Last name is required' })}
              />
              {errors.lastName && <p className={styles.error}>{errors.lastName.message}</p>}
            </div>

            <div className={styles.inputgroup}>
              <img src="/models/images/user-solid.svg" alt="Username" className={styles.icon} />
              <input
                type="text"
                placeholder="Username"
                className={styles.inputfield}
                {...register('username', { required: 'Username is required' })}
              />
              {errors.username && <p className={styles.error}>{errors.username.message}</p>}
            </div>
            <div className={styles.inputgroup}>
              <img src="/models/images/email.svg" alt="Email" className={styles.icon} />
              <input
                type="email"
                placeholder="Email"
                className={styles.inputfield}
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <p className={styles.error}>{errors.email.message}</p>}
            </div>
            <div className={styles.inputgroup}>
              <img src="/models/images/lock-solid.svg" alt="Password" className={styles.icon} />
              <input
                type="password"
                placeholder="Password"
                className={styles.inputfield}
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <p className={styles.error}>{errors.password.message}</p>}
            </div>
            <div className={styles.inputgroup}>
              <img src="/models/images/lock-solid.svg" alt="Confirm Password" className={styles.icon} />
              <input
                type="password"
                placeholder="Confirm Password"
                className={styles.inputfield}
                {...register('confirmPassword', { required: 'Please confirm your password' })}
              />
              {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
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
