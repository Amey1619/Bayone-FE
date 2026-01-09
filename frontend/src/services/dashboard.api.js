import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getDashboardData = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${BASE_URL}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  
  return response.data;
};