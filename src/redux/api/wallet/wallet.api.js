import { config } from "../../config";
import { authHeader } from "../../headers";
import axios from "axios";

const tokenObj = JSON.parse(localStorage.getItem("token"));

export const get_wallet_balance = async () => {
    try {
      const response = await axios.get(`${config.rosobon}auth/wallet-balance`, {
        headers: authHeader(tokenObj.token),
      });
  
      const formData = await response.data;
      return { formData };
    } catch (error) {
      const errorObj = await error.response.data;
      return { errorObj };
    }
};

export const get_wallet_transactions = async () => {
    try {
      const response = await axios.get(`${config.rosobon}auth/wallet-transactions`, {
        headers: authHeader(tokenObj.token),
      });
  
      const formData = await response.data;
      return { formData };
    } catch (error) {
      const errorObj = await error.response.data;
      return { errorObj };
    }
};