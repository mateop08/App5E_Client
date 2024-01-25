import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";
import { AxiosRequestConfig } from "axios";

export const CreateOrderState = async (Code: string, Description: string, Default: boolean) => {
    try {
        const path = '/orderstates/'
        const data = {
            Code: Code,
            Description: Description,
            Default: Default
        } 
        const response = await AxiosInstance.post(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}
export const ListAllOrderStates = async () => {
    try {
        const path = '/orderstates/'
        const response = await AxiosInstance.get(path)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListOrderStatesByDescription = async (Description: string) => {
    try {
        const path = '/orderstates/byDescription/'
        const response = await AxiosInstance.get(path, {
            params: { Description: Description}
        })
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const UpdateOrderStateByCode = async (Code: string, Description: string, Default: boolean) => {
    try {
        const path = '/orderstates/'
        const data = {
            Code: Code,
            Description: Description,
            Default: Default
        } 
        const response = await AxiosInstance.put(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const DeleteOrderStateByCode = async (Code: string) => {
    try {
        const path = '/orderstates/'
        const config: AxiosRequestConfig = { data: {Code: Code} }
        const response = await AxiosInstance.delete(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}