import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";
import { AxiosRequestConfig } from "axios";

export const CreateOrderService = async (data: {OrderDocument: string, OrderNumber: number, Code: string, Amount: number, TechnicianCode: string, Note: string, User: string}) => {
    try {
        const path = '/orderservices/'
        const response = await AxiosInstance.post(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListOrderServicesByOrder = async (OrderDocument: string, OrderNumber: number) => {
    try {
        const path = '/orderservices/'
        const config: AxiosRequestConfig = {
            params: { OrderDocument: OrderDocument, 
                OrderNumber: OrderNumber, 
            }
        }
        const response = await AxiosInstance.get(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const UpdateOrderServiceById = async (data: {Id: number, Code: string, Amount: number, TechnicianCode: string, Note: string, User: string}) => {
    try {
        const path = '/orderservices/'
        const response = await AxiosInstance.put(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const DeleteOrderServiceById = async (Id: number) => {
    try {
        const path = '/orderservices/'
        const config: AxiosRequestConfig = { data: {Id: Id} }
        const response = await AxiosInstance.delete(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}