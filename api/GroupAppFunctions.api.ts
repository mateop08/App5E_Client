import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";
import { AxiosRequestConfig } from "axios";

export const CreateGroupAppFunction = async (AppFunctionCode: string, GroupCode: string) => {
    try {
        const path = '/groupappfunctions/'
        const data = {
            AppFunctionCode: AppFunctionCode,
            GroupCode: GroupCode
        } 
        
        const response = await AxiosInstance.post(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const CreateGroupAppFunctionByList = async (GroupCode: string, AppFunctions: {AppFunctionCode: string}[]) => {
    try {
        const path = '/groupappfunctions/byAppfunctionlistandgroupcode/'
        const data = {
            GroupCode: GroupCode,
            AppFunctionList: AppFunctions
        }
        const response = await AxiosInstance.post(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListGroupAppFunctionsByGroupCode = async (GroupCode: string) => {
    try {
        const path = '/groupappfunctions/byGroupcode/'
        const response = await AxiosInstance.get(path, {
            params: { GroupCode: GroupCode}
        })
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListGroupAppFunctionsByAppFunctionCode = async (AppFunctionCode: string) => {
    try {
        const path = '/groupappfunctions/byAppfunctioncode/'
        const response = await AxiosInstance.get(path, {
            params: { AppFunctionCode: AppFunctionCode}
        })
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const DeleteGroupAppFunction = async (AppFunctionCode: string, GroupCode: string) => {
    try {
        const path = '/groupappfunctions/'
        const config: AxiosRequestConfig = {
            data: {
                AppFunctionCode: AppFunctionCode,
                GroupCode: GroupCode
            } 
        }
        const response = await AxiosInstance.delete(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}