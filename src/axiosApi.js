import axios from "axios";
import {API_URL} from "./constants.js";

const axiosApi = axios.create({
    baseURL: "http://10.1.4.9:8010",
});

export default axiosApi;