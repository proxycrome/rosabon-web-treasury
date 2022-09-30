import { config } from "../../config";
import { authHeader } from "../../headers";
import axios from "axios";

const tokenObj = JSON.parse(localStorage.getItem("token"));

// get exchange rates
export const get_contrib_val = async () => {
  try {
    const response = await axios.get(`${config.rosobon}trcontrib-value`, {
      headers: authHeader(tokenObj.token),
    });

    const formData = await response.data;
    return { formData };
  } catch(error) {
    const errorObj = await error.response.data
    return { errorObj }
  }
}