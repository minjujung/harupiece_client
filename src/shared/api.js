import axios from "axios";

const instance = axios.create({
  baseURL: "",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
    // Authorization: `bearer ${accessToken}`,
  },
});

export const api = {
  
}

export default instance;
