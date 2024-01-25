import axios from 'axios';
import { configApp } from '@/config';
import TokenGestor from '@/helpers/TokenGestor';

const AxiosInstance = axios.create({
    baseURL: configApp.domain /*+ config.port /*+ config.route*/,
    headers: {
        'Authorization': 'Bearer ' + TokenGestor.getToken()
    },
})

AxiosInstance.interceptors.request.use( (config) => {
    config.headers.Authorization ='Bearer ' + TokenGestor.getToken()
    return config
}
)

export default AxiosInstance