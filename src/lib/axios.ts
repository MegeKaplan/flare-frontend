import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // withCredentials: true,
});

api.interceptors.request.use((config) => {
  config.headers = config.headers || {};

  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  config.headers["X-Client-Id"] = "flare";

  return config;
});

export default api;
