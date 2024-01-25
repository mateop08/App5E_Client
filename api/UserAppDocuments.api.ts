import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";
import { AxiosRequestConfig } from "axios";


export const CreateUserAppDocument = async (UserCode: string, DocumentCode: string) => {
    try {
        const path = '/userappdocuments/'
        const config: AxiosRequestConfig = {
            data: {
                UserCode: UserCode,
                DocumentCode: DocumentCode
            } 
        }
        const response = await AxiosInstance.post(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const CreateUserAppDocumentByList = async (UserCode: string, AppDocumentsList: {AppDocumentCode: string}[]) => {
    try {
        const path = '/userappdocuments/byAppdocumentslistandusercode/'
        const data = {
            UserCode: UserCode,
            AppDocumentsList: AppDocumentsList
        }
        const response = await AxiosInstance.post(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListAppDocumentsByUserCode = async (UserCode: string) => {
    try {
        const path = '/userappdocuments/byUsercode/'
        const response = await AxiosInstance.get(path, {
            params: { UserCode: UserCode}
        })
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListUsersByAppDocument = async (AppDocument: string) => {
    try {
        const path = '/userappdocuments/byAppdocument/'
        const response = await AxiosInstance.get(path, {
            params: { AppDocument: AppDocument}
        })
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const DeleteUserAppDocument = async (UserCode: string, DocumentCode: string) => {
    try {
        const path = '/userappdocuments/'
        const config: AxiosRequestConfig = {
            data: {
                UserCode: UserCode,
                DocumentCode: DocumentCode
            } 
        }
        const response = await AxiosInstance.delete(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}
