import axios from "axios";

export const baseURL = `https://user-management-server-red.vercel.app/api`;

export default axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});
