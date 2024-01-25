import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";
import { AxiosRequestConfig } from "axios";

export const CreateGroup = async (Code: string, Description: string) => {
    try {
        const path = '/groups/'
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

export const GetGroupByCode = async (Code: string) => {
    try {
        const path = '/groups/byCode/'
        const response = await AxiosInstance.get(path, {
            params: { Code: Code}
        })
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListGroupsByDescription = async (Description: string) => {
    try {
        const path = '/groups/'
        const response = await AxiosInstance.get(path, {
            params: { Description: Description}
        })
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListAllGroups = async () => {
    try {
        const path = '/groups/'
        const response = await AxiosInstance.get(path)
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const UpdateGroupByCode = async (Code: string, Description: string) => {
    try {
        const path = '/groups/'
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

export const DeleteGroupByCode = async (Code: string) => {
    try {
        const path = '/groups/'
        const config: AxiosRequestConfig = { data: {Code: Code} }
        const response = await AxiosInstance.delete(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}