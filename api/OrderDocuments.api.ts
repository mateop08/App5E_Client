import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";
import { AxiosRequestConfig } from "axios";

export const CreateOrderDocument = async (data: {OrderDocument: string, OrderNumber: string, DocumentCode: string, User: string, File: File}) => {
    try {
        const {OrderDocument, OrderNumber, DocumentCode, File, User} = data
        const formData = new FormData()
        formData.append('OrderDocument',OrderDocument)
        formData.append('OrderNumber', OrderNumber)
        formData.append('DocumentCode', DocumentCode)
        formData.append('User', User)
        formData.append('File',File)

        const path = '/orderdocuments/'
        const response = await AxiosInstance.post(path, formData)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListOrderDocumentsByOrder = async (OrderDocument: string, OrderNumber: number) => {
    try {
        const path = '/orderdocuments/'
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

export const UpdateOrderDocumentById = async (data: {Id: string, OrderDocument: string, OrderNumber: string, DocumentCode: string, User: string, File: File}) => {
    try {
        const {Id, OrderDocument, OrderNumber, DocumentCode, File, User} = data
        const formData = new FormData()
        formData.append('Id',Id)
        formData.append('OrderDocument',OrderDocument)
        formData.append('OrderNumber', OrderNumber)
        formData.append('DocumentCode', DocumentCode)
        formData.append('User', User)
        formData.append('File',File)

        const path = '/orderdocuments/'
        const response = await AxiosInstance.put(path, formData)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const DeleteOrderDocumentById = async (Id: number) => {
    try {
        const path = '/orderdocuments/'
        const config: AxiosRequestConfig = { data: {Id: Id} }
        const response = await AxiosInstance.delete(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}