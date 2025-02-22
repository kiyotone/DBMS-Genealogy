import React from "react";
import { useForm } from "react-hook-form";
import { login } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginStart, loginFailure, loginSuccess } from "../../redux/userSlice";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const response = await login(data.username, data.password);
    dispatch(loginStart());

    console.log("response", response);

    if (response?.status === 200) {
      dispatch(loginSuccess(response.data));
      navigate("/home");
    } else {
      dispatch(loginFailure(response?.data));
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#FDF7F2]">
      <div className="w-96 p-6 bg-white shadow-lg border border-[#A78B71] rounded-lg text-center">
        <div className="flex flex-col items-center mb-4">
          <img
            src="models/images/GMSlogo.png"
            alt="GMS Logo"
            className="h-16 w-16"
          />
          <h1 className="text-xl font-bold mt-2 text-[#4A4A4A]">GMS</h1>
        </div>

        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-6 text-[#4A4A4A] font-serif">
            Login
          </h2>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="relative">
              <img
                src="/models/images/user-solid.svg"
                alt="Username"
                className="w-5 h-5 absolute left-3 top-2"
              />
              <input
                type="text"
                placeholder="Username"
                {...register("username", { required: "Username is required" })}
                className="w-4/5 pl-10 pr-4 py-2 border border-[#A78B71] rounded-lg text-[#4A4A4A] text-sm"
              />
              {errors.username && (
                <p className="text-red-500 text-xs">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="relative">
              <img
                src="/models/images/lock-solid.svg"
                alt="Confirm Password"
                className="w-5 h-5 absolute left-3 top-2"
              />
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className="w-4/5 pl-10 pr-4 py-2 border border-[#A78B71] rounded-lg text-[#4A4A4A] text-sm"
              />
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center text-sm text-[#4A4A4A]">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  {...register("remember")}
                  className="mr-2"
                />
                <label htmlFor="remember" className="text-[#4A4A4A]">
                  Remember Me
                </label>
              </div>
              <a
                href="/forgotpassword"
                className="text-[#10b981] hover:text-black hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#7C5E4C] text-white font-semibold rounded-lg mt-4 hover:bg-[#C66B3D]"
            >
              Login
            </button>
          </form>

          <div className="mt-4 text-sm text-[#4A4A4A]">
            <p>
              Don’t have an account?{" "}
              <a
                href="/signup"
                className="text-[#10b981] hover:underline hover:text-black"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
