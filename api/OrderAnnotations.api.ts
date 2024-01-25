import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";
import { AxiosRequestConfig } from "axios";

export const CreateOrderAnnotation = async (data: {OrderDocument: string, OrderNumber: number, AnnotationCode: string, TechnicianCode: string, Note: string, User: string}) => {
    try {
        const path = '/orderannotations/'
        const response = await AxiosInstance.post(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListOrderAnnotationsByOrder = async (OrderDocument: string, OrderNumber: number) => {
    try {
        const path = '/orderannotations/'
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

export const UpdateOrderAnnotationById = async (data: {Id: number, AnnotationCode: string, TechnicianCode: string, Note: string, User: string}) => {
    try {
        const path = '/orderannotations/'
        const response = await AxiosInstance.put(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const DeleteOrderAnnotationById = async (Id: number) => {
    try {
        const path = '/orderannotations/'
        const config: AxiosRequestConfig = { data: {Id: Id} }
        const response = await AxiosInstance.delete(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}