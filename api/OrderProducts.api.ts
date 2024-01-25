import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";
import { AxiosRequestConfig } from "axios";

export const CreateOrderProduct = async (data: {OrderDocument: string, OrderNumber: number, Code: string, Amount: number, User: string}) => {
    try {
        const path = '/orderproducts/'
        const response = await AxiosInstance.post(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListOrderProductsByOrder = async (OrderDocument: string, OrderNumber: number) => {
    try {
        const path = '/orderproducts/'
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

export const UpdateOrderProductById = async (data: {Id: number, Code: string, Amount: number, User: string}) => {
    try {
        const path = '/orderproducts/'
        const response = await AxiosInstance.put(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const DeleteOrderProductById = async (Id: number) => {
    try {
        const path = '/orderproducts/'
        const config: AxiosRequestConfig = { data: {Id: Id} }
        const response = await AxiosInstance.delete(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}