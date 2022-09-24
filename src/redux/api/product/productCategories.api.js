import { config } from "../../config";
import { authHeader } from "../../headers";
import axios from "axios";

const tokenObj = JSON.parse(localStorage.getItem("token"));

export const get_categories_with_products = async () => {
  try {
    const response = await axios.get(`${config.rosobon}auth/trproduct-category/trproduct`, {
      headers: authHeader(tokenObj.token),
    });

    const formData = await response.data;
    return { formData }
  } catch(error) {
    const errorObj = await error.response.data;
    return { errorObj };
  }
}
