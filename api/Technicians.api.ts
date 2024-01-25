import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";
import { AxiosRequestConfig } from "axios";

export const CreateTechnician = async (Code: string, Description: string) => {
    try {
        const path = '/technicians/'
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

export const ListAllTechnicians = async () => {
    try {
        const path = '/technicians/'
        const response = await AxiosInstance.get(path)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListTechniciansByDescription = async (Description: string) => {
    try {
        const path = '/technicians/'
        const response = await AxiosInstance.get(path, {
            params: { Description: Description}
        })
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const UpdateTechnicianByCode = async (Code: string, Description: string) => {
    try {
        const path = '/technicians/'
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

export const DeleteTechnicianByCode = async (Code: string) => {
    try {
        const path = '/technicians/'
        const config: AxiosRequestConfig = { data: {Code: Code} }
        const response = await AxiosInstance.delete(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}