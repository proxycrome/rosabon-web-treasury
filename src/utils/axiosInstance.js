import axios from "axios";

const checkAuthTokens = () => {
  let authTokens = localStorage.getItem("token")
    ? `Bearer ${localStorage.getItem("token")}`
    : null;
  return authTokens;
};

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_BASE_URL_DEV
      : process.env.REACT_APP_BASE_URL_PROD,
  headers: {
    Authorization: checkAuthTokens(),
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (checkAuthTokens()) {
    req.headers.Authorization = checkAuthTokens();
  }
  return req;
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
