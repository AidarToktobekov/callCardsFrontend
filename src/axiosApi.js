import axios from "axios";
import {API_URL} from "./constants.js";
import {logout} from "./features/user/userSlice.js";
import {toast} from "react-toastify";

const axiosApi = axios.create({
    baseURL: API_URL,
});

let isToastVisible = false;

export const addInterceptors = (store) => {
    axiosApi.interceptors.request.use((request) => {
        const token = store.getState().user.user?.token;
        if (token) {
            request.headers.set("Authorization", `Bearer ${token}`);
        }
        return request;
    });

    axiosApi.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                store.dispatch(logout());
                if (!isToastVisible) {
                    toast.error("Произошла ошибка пройдите авторизацию");
                    isToastVisible = true;
                }
            }
            return Promise.reject(error);
        },
    );
};

export default axiosApi;