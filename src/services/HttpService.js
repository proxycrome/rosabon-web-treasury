import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';
// import { getAccessToken, verifyToken } from '../utils/utilities';

class HttpService {
  constructor() {
    this.baseUrl = process.env.REACT_APP_BASE_URL;
  }

  postData = async (payload, url) => {
    return axios.post(this.baseUrl + url, payload);
  };

  postDataWithToken = async (formData, url) => {
    return axiosInstance.post(url, formData);
  };

  getData = async (url) => {
    return axiosInstance.get(url);
  };

  getDataWithoutToken = async (url) => {
    return axios.get(this.baseUrl + url);
  };

  putData = async (formData, url) => {
    return axiosInstance.put(url, formData);
  };

  putDataWithoutToken = async (formData, url) => {
    return axios.put(this.baseUrl + url, formData);
  };

  deleteData = async (url) => {
    return axiosInstance.delete(url);
  };
}
export default HttpService;