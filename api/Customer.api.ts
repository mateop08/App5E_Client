import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";

export const ListCustomersBySearchText = async (SearchText: string) => {
    try {
        const path = '/customer/search/'
        const response = await AxiosInstance.get(path, {
            params: { SearchText: SearchText}
        })
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const GetCustomersByIdentification = async (Identification: string) => {
    try {
        const path = '/customer/byIdentification/'
        const response = await AxiosInstance.get(path, {
            params: { Identification: Identification}
        })
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}