import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";
import { AxiosRequestConfig } from "axios";

export const CreateDocumentType = async (Code: string, Description: string) => {
    try {
        const path = '/documenttypes/'
        const data = {
            Code: Code,
            Description: Description
        }
        const response = await AxiosInstance.post(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListDocumentTypesByDescription = async (Description: string) => {
    try {
        const path = '/documenttypes/byDescription/'
        const response = await AxiosInstance.get(path, {
            params: { Description: Description}
        })
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListAllDocumentTypes = async () => {
    try {
        const path = '/documenttypes/'
        const response = await AxiosInstance.get(path)
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const UpdateDocumentTypeByCode = async (Code: string, Description: string) => {
    try {
        const path = '/documenttypes/'
        const data = {
            Code: Code,
            Description: Description
        }
        const response = await AxiosInstance.put(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const DeleteDocumentTypeByCode = async (Code: string) => {
    try {
        const path = '/documenttypes/'
        const config: AxiosRequestConfig = { data: {Code: Code} }
        const response = await AxiosInstance.delete(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}