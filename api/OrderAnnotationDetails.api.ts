import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";
import { AxiosRequestConfig } from "axios";

export const CreateOrderAnnotationDetail = async (data: {OrderDocument: string, OrderNumber: string, AnnotationId: string, Note: string, User: string, File: File}) => {
    try {
        const {OrderDocument, OrderNumber, AnnotationId, File, User, Note} = data
        const formData = new FormData()
        formData.append('OrderDocument',OrderDocument)
        formData.append('OrderNumber', OrderNumber)
        formData.append('AnnotationId', AnnotationId)
        formData.append('User', User)
        formData.append('Note', Note)
        formData.append('File',File)

        const path = '/orderannotationdetails/'
        const response = await AxiosInstance.post(path, formData)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListOrderAnnotationDetailsByAnnotationId = async (AnnotationId: number) => {
    try {
        const path = '/orderannotationdetails/'
        const config: AxiosRequestConfig = {
            params: { AnnotationId: AnnotationId }
        }
        const response = await AxiosInstance.get(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const UpdateOrderAnnotationDetailByEvidenceId = async (data: {EvidenceId: string, OrderDocument: string, OrderNumber: string, AnnotationId: string, Note: string, User: string, File: File}) => {
    try {
        const {EvidenceId, OrderDocument, OrderNumber, AnnotationId, File, User, Note} = data
        const formData = new FormData()
        formData.append('EvidenceId',EvidenceId)
        formData.append('OrderDocument',OrderDocument)
        formData.append('OrderNumber', OrderNumber)
        formData.append('AnnotationId', AnnotationId)
        formData.append('User', User)
        formData.append('Note', Note)
        formData.append('File',File)

        const path = '/orderannotationdetails/'
        const response = await AxiosInstance.put(path, formData)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const DeleteOrderAnnotationDetailByEvidenceId = async (EvidenceId: number) => {
    try {
        const path = '/orderannotationdetails/'
        const config: AxiosRequestConfig = { data: {EvidenceId: EvidenceId} }
        const response = await AxiosInstance.delete(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}