import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";
import { AxiosRequestConfig } from "axios";

export const CreateAppFunction = async (data: {Code: string, Description: string, Method: string, Route: string, RequiresAuth: boolean}) => {
    try {
        const path = '/appfunctions/'
        const response = await AxiosInstance.post(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListAllAppFunctions = async () => {
    try {
        const path = '/appfunctions/'
        const response = await AxiosInstance.get(path)
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListAppFunctionsByDescription = async (Description: string) => {
    try {
        const path = '/appfunctions/byDescription/'
        const response = await AxiosInstance.get(path, {
            params: { Description: Description}
        })
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const UpdateAppFunctionByCode = async (data: {Code: string, Description: string, Method: string, Route: string, RequiresAuth: boolean}) => {
    try {
        const path = '/appfunctions/'
        const response = await AxiosInstance.put(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const DeleteAppFunctionByCode = async (Code: string) => {
    try {
        const path = '/appfunctions/'
        const config: AxiosRequestConfig = { data: {Code: Code} }
        const response = await AxiosInstance.delete(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}