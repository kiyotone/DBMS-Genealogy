import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './Signup.module.css';

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('Signup Data:', data);
  };

  const password = watch('password'); // Watch password for confirmation validation

  return (
    <div className={styles.signupcontainer}>
      <div className={styles.signupcard}>
        <div className={styles.logocontainer}>
          <img src="models/images/gmslogo.png" alt="gms logo" className={styles.logo} />
          <h1 className={styles.apptitle}>GMS</h1>
        </div>

        <div className={styles.cardcontent}>
          <h2 className={styles.signuptitle}>Sign Up</h2>
          <form className={styles.signupform} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputgroup}>
              <input
                type="text"
                placeholder="First Name"
                {...register('firstname', { required: 'First Name is required' })}
                className={styles.inputfield}
              />
              {errors.firstname && (
                <p className={styles.error}>{errors.firstname.message}</p>
              )}
            </div>
            <div className={styles.inputgroup}>
              <input
                type="text"
                placeholder="Last Name"
                {...register('lastname', { required: 'Last Name is required' })}
                className={styles.inputfield}
              />
              {errors.lastname && (
                <p className={styles.error}>{errors.lastname.message}</p>
              )}
            </div>
            <div className={styles.inputgroup}>
              <img src="/models/images/user-solid.svg" alt="username" className={styles.icon} />
              <input
                type="text"
                placeholder="Username"
                {...register('username', { required: 'Username is required' })}
                className={styles.inputfield}
              />
              {errors.username && (
                <p className={styles.error}>{errors.username.message}</p>
              )}
            </div>
            <div className={styles.inputgroup}>
              <img src="/models/images/email.svg" alt="email" className={styles.icon} />
              <input
                type="email"
                placeholder="email"
                {...register('email', {
                  required: 'email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'invalid email address',
                  },
                })}
                className={styles.inputfield}
              />
              {errors.email && (
                <p className={styles.error}>{errors.email.message}</p>
              )}
            </div>
            <div className={styles.inputgroup}>
              <img src="/models/images/lock-solid.svg" alt="password" className={styles.icon} />
              <input
                type="password"
                placeholder="Password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                className={styles.inputfield}
              />
              {errors.password && (
                <p className={styles.error}>{errors.password.message}</p>
              )}
            </div>
            <div className={styles.inputgroup}>
              <img src="/models/images/lock-solid.svg" alt="confirm password" className={styles.icon} />
              <input
                type="password"
                placeholder="Confirm Password"
                {...register('confirmPassword', {
                  required: 'Confirm Password is required',
                  validate: (value) =>
                    value === password || 'Passwords do not match',
                })}
                className={styles.inputfield}
              />
              {errors.confirmPassword && (
                <p className={styles.error}>{errors.confirmPassword.message}</p>
              )}
            </div>
            <button type="submit" className={styles.signupbutton}>
              Sign Up
            </button>
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
