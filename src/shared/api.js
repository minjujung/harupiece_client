import axios from "axios";

const instance = axios.create({
  baseURL: "http://54.180.141.39/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
    // Authorization: `bearer ${accessToken}`,
  },
});

export default instance;

// "http://54.180.141.39/"
