import React from 'react';
import { useForm } from 'react-hook-form';
import { signup } from '../../api/auth';

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    // Handle form submission here
    delete data.confirmPassword;
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
    <div className="flex h-screen w-screen items-center justify-center bg-[#FDF7F2] text-black">
      <div className="w-96 p-6 bg-white shadow-lg border border-[#A78B71] rounded-lg text-center">
        <div className="flex flex-col items-center mb-4">
          <img src="models/images/GMSlogo.png" alt="GMS Logo" className="h-16 w-16" />
          <h1 className="text-xl font-bold mt-2 text-[#4A4A4A]">GMS</h1>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-[#4A4A4A]">Sign Up</h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative">
              <input
                type="text"
                placeholder="First Name"
                className="w-4/5 p-2.5 pl-10 border border-[#A78B71] rounded-xl text-sm"
                {...register('firstName', { required: 'First name is required' })}
              />
              {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Last Name"
                className="w-4/5 p-2.5 pl-10 border border-[#A78B71] rounded-xl text-sm"
                {...register('lastName', { required: 'Last name is required' })}
              />
              {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
            </div>

            <div className="relative">
              <img src="/models/images/user-solid.svg" alt="Username" className="w-5 h-5 absolute left-3 top-2" />
              <input
                type="text"
                placeholder="Username"
                className="w-4/5 p-2.5 pl-10 border border-[#A78B71] rounded-xl text-sm"
                {...register('username', { required: 'Username is required' })}
              />
              {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
            </div>
            <div className="relative">
              <img src="/models/images/email.svg" alt="Email" className="w-5 h-5 absolute left-3 top-2" />
              <input
                type="email"
                placeholder="Email"
                className="w-4/5 p-2.5 pl-10 border border-[#A78B71] rounded-xl text-sm"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>
            <div className="relative">
              <img src="/models/images/lock-solid.svg" alt="Password" className="w-5 h-5 absolute left-3 top-2" />
              <input
                type="password"
                placeholder="Password"
                className="w-4/5 p-2.5 pl-10 border border-[#A78B71] rounded-xl text-sm"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>
            <div className="relative">
              <img src="/models/images/lock-solid.svg" alt="Confirm Password" className="w-5 h-5 absolute left-3 top-2" />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-4/5 p-2.5 pl-10 border border-[#A78B71] rounded-xl text-sm"
                {...register('confirmPassword', { required: 'Please confirm your password' })}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
            </div>

            <button className="w-full py-2 bg-[#7C5E4C] text-white text-lg font-semibold rounded-xl cursor-pointer hover:bg-[#C66B3D]">
              Sign Up
            </button>
          </form>
          <div className="mt-4 text-sm text-gray-600">
            <p>
              Already have an account?{' '}
              <a href="/login" className="text-[#10b981] hover:text-black underline">
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
