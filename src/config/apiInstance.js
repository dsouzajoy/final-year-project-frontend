import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://blockchain-project-api.herokuapp.com"
});
