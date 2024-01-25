import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";
import { AxiosRequestConfig } from "axios";

export const CreateAnnotationType = async (Code: string, Description: string) => {
    try {
        const path = '/annotationtypes/'
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
export const ListAllAnnotationTypes = async () => {
    try {
        const path = '/annotationtypes/'
        const response = await AxiosInstance.get(path)
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListAnnotationTypesByDescription = async (Description: string) => {
    try {
        const path = '/annotationtypes/byDescription/'
        const response = await AxiosInstance.get(path, {
            params: { Description: Description}
        })
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const UpdateAnnotationTypeByCode = async (Code: string, Description: string) => {
    try {
        const path = '/annotationtypes/'
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

export const DeleteAnnotationTypeByCode = async (Code: string) => {
    try {
        const path = '/annotationtypes/'
        const config: AxiosRequestConfig = { data: {Code: Code} }
        const response = await AxiosInstance.delete(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}