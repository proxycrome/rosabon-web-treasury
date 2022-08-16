import { config } from "../config";
import axios from "axios";
import { authHeader, headers } from "../headers";


export const get_lgs = async () => {
    try {
        const response = await axios.post(
          `${config.rosobon}users`,
          headers
        );
    } catch (error) {
        
    }
}