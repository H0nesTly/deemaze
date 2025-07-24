import axios from "axios"; 

const instance = axios.create({
  baseURL : 'http://localhost:3000/',
  headers: {
    ContentType: "application/json",
    timeout : 1000,
  }, 
  // .. other options
});

export default instance;
