import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './Login.module.css';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // Remove Key remeber from data
    const response = await login(data.username, data.password);
    
      navigate('/');
    
}

  return (
    <div className={styles.loginpagecontainer}>
      <div className={styles.logincard}>
        <div className={styles.logocontainer}>
          <img src="models/images/gmslogo.png" alt="gms logo" className={styles.logo} />
          <h1 className={styles.apptitle}>gms</h1>
        </div>

        <div className={styles.cardcontent}>
          <h2 className={styles.logintitle}>login</h2>
          <form className={styles.loginform} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputgroup}>
              <img src="/models/images/user-solid.svg" alt="username" className={styles.icon} />
              <input
                type="text"
                placeholder="username"
                {...register('username', { required: 'username is required' })}
                className={styles.inputfield}
              />
              {errors.username && (
                <p className={styles.error}>{errors.username.message}</p>
              )}
            </div>
            <div className={styles.inputgroup}>
              <img src="/models/images/lock-solid.svg" alt="password" className={styles.icon} />
              <input
                type="password"
                placeholder="password"
                {...register('password', { required: 'password is required' })}
                className={styles.inputfield}
              />
              {errors.password && (
                <p className={styles.error}>{errors.password.message}</p>
              )}
            </div>
            <div className={styles.formoptions}>
              <div className={styles.checkboxgroup}>
                <input
                  type="checkbox"
                  id="remember"
                  {...register('remember')}
                />
                <label htmlFor="remember" className={styles.checkboxlabel}>
                  remember me
                </label>
              </div>
              <a href="/forgotpassword" className={styles.forgotpasswordlink}>
                forgot password?
              </a>
            </div>
            <button type="submit" className={styles.loginbutton}>
              login
            </button>
          </form>
          <div className={styles.registerprompt}>
            <p>
              don’t have an account?{' '}
              <a href="/signup" className={styles.registerlink}>
                register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
