import axios from "axios";
const BASE_URL =import.meta.env.VITE_API_BASE_URL;;

export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, data);
    return response.data;
  } catch (error) {
    return error.response?.data || {
      message: "Something went wrong"
    };
  }
};

export const signupUser = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, data);
    return response.data;
  } catch (error) {
    return error.response?.data || {
      message: "Something went wrong"
    };
  }
};
