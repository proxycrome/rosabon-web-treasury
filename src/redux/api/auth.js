import { config } from "../config";
import axios from "axios";
import { Route, useNavigate } from "react-router-dom";

export const register_company = async (obj) => {
  const response = await axios.post(`${config.rosobon}users`, obj, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const formData = await response.data;
  return { formData };
  // .then((res) => {
  //   const formData = res.data;
  //   console.log(formData)
  //   return { formData, loading: true };
  // })
  // .catch((err) => console.log(err.response.data.message));
};

export const login_user = async (obj) => {
  const response = await axios.post(`${config.rosobon}login`, obj, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const formData = await response.data;
  return { formData };
};
