import axios from "axios";

const instance = axios.create({
    baseURL: "http://192.168.137.1:3000/api",
    //http://192.168.0.125:3000/api
    withCredentials: true
})

export default instance;
