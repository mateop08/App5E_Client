import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";
import { AxiosRequestConfig } from "axios";

export const ListServices = async (OrderDocument: string, Description: string) => {
    try {
        const path = '/services/'
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