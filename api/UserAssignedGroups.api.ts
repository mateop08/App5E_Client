import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";
import { AxiosRequestConfig } from "axios";

export const CreateUserAssignedGroup = async (UserCode: string, GroupCode: string) => {
    try {
        const path = '/userassignedroups/'
        const config: AxiosRequestConfig = {
            data: {
                UserCode: UserCode,
                GroupCode: GroupCode
            } 
        }
        const response = await AxiosInstance.post(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const CreateUserAssignedGroupByList = async (UserCode: string, GroupsList: {GroupCode: string}[]) => {
    try {
        const path = '/userassignedgroups/byGroupslistandusercode/'
        const data = {
            UserCode: UserCode,
            GroupsList: GroupsList
        }
        const response = await AxiosInstance.post(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListGroupsByUserCode = async (UserCode: string) => {
    try {
        const path = '/userassignedgroups/byUsercode/'
        const response = await AxiosInstance.get(path, {
            params: { UserCode: UserCode}
        })
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListUsersByGroupCode = async (GroupCode: string) => {
    try {
        const path = '/userassignedroups/byAppdocument/'
        const response = await AxiosInstance.get(path, {
            params: { GroupCode: GroupCode}
        })
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const DeleteUserAssignedGroup = async (UserCode: string, GroupCode: string) => {
    try {
        const path = '/userassignedroups/'
        const config: AxiosRequestConfig = {
            data: {
                UserCode: UserCode,
                GroupCode: GroupCode
            } 
        }
        const response = await AxiosInstance.delete(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}
