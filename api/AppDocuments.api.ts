import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";
import { AxiosRequestConfig } from "axios";

export const CreateAppDocument = async (data: {Code: string, Description: string, Consecutive: number, Store: string, PriceCode: string
    InventoryType: string, ServicesLine: string}) => {
    try {
        const path = '/appdocuments/'
        const response = await AxiosInstance.post(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListAllAppDocuments = async () => {
    try {
        const path = '/appdocuments/'
        const response = await AxiosInstance.get(path)
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListAppDocumentsByDescription = async (Description: string) => {
    try {
        const path = '/appdocuments/byDescription/'
        const response = await AxiosInstance.get(path, {
            params: { Description: Description}
        })
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const UpdateAppDocumentByCode = async (data: {Code: string, Description: string, Consecutive: number, Store: string, PriceCode: string
    InventoryType: string, ServicesLine: string}) => {
    try {
        const path = '/appdocuments/'
        const response = await AxiosInstance.put(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const DeleteAppDocumentByCode = async (Code: string) => {
    try {
        const path = '/appdocuments/'
        const config: AxiosRequestConfig = { data: {Code: Code} }
        const response = await AxiosInstance.delete(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}