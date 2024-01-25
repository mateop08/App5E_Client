import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";
import { AxiosRequestConfig } from "axios";

export const ListProducts = async (OrderDocument: string, Description: string) => {
    try {
        const path = '/products/'
        const config: AxiosRequestConfig = {
            params: {
                OrderDocument: OrderDocument,
                Description: Description
            }
        }
        const response = await AxiosInstance.get(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListBulkProducts = async (OrderDocument: string) => {
    try {
        const path = '/products/bulk/'
        const config: AxiosRequestConfig = {
            params: {
                OrderDocument: OrderDocument
            }
        }
        const response = await AxiosInstance.get(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}