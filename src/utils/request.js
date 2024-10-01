import axios from "axios";

const request = axios.create({
  // baseURL: "https://immo-server-xfkn.onrender.com",
  baseURL: "http://localhost:2000" 
});
export default request;
