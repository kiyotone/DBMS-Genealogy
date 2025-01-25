import axios,{ AxiosInstance} from "axios";
import Cookies from 'js-cookie';

export const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    timeout:  5* 60 * 1000,
    headers: {
        accept: 'application/json',
        'Content-Type': 'multipart/form-data',
    },
})

export const authenticated = (apiInstance) => {
    const token = Cookies.get('token');
    if(!token) return apiInstance;
    // if (process.env.NODE_ENV === 'development') {
    //     apiInstance.defaults.headers.common.Authorization = `Token ${token}`;
    //   } else {
    //     apiInstance.defaults.headers.common.Authorization = `Token ${token}`;
    //     apiInstance.defaults.withCredentials = false;
    //   }

    // no .env file

        apiInstance.defaults.headers.common.Authorization = `Token ${token}`;
        apiInstance.defaults.withCredentials = false;
    

      return apiInstance;
}