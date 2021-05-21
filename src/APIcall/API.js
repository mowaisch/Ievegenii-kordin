import axios from 'axios';
import { BASE_URL } from '../strings';

axios.defaults.baseURL = BASE_URL;

const API = axios.create()

API.interceptors.request.use(
    async config => {
        /* .............NOTE.................
        use this for Authenticated Call
        accessTokenType : is type of the token like  "Bearer"
        token : is authenticated user token
        
        if (token) {
            config.headers.Authorization = accessTokenType + ' ' + token;
            config.headers.post['Content-Type'] = 'multipart/form-data';
        }
        */
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

export default API;