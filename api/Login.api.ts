import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "../helpers/AxiosErrorValidation.ts";


export const LoginWithCredentials = async (data: {User: string, Password: string}) => {
    try {
        const path = '/login/'
        const response = await AxiosInstance.post(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const LoginWithToken = async (token: string) => {
    try {
        const path = '/login/token/'
        const response = await AxiosInstance.post(path,{},{
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}