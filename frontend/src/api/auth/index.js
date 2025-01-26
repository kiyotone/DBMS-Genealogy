import { api } from "../config";

export const login = async (username, password) => {
    const data = JSON.stringify({
      email: username,
      password: password,
    });
    console.log(data);
    try {
      const response = await api.post("auth/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      localStorage.setItem("token", response.data.access_token);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  

export const signup = async (data) => {
    try {
        const response = await api.post("auth/signup/", data);
        return response;
    } catch (error) {
        return error.response;
    }
    }
