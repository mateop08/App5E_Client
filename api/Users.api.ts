import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";
import { AxiosRequestConfig } from "axios";

export const CreateUser = async (UserCode: string, Name: string, Password: string) => {
    try {
        const path = '/users/'
        const data = {
            UserCode: UserCode,
            Name: Name,
            Password: Password
        } 
        const response = await AxiosInstance.post(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const GetUserByUserCode = async (UserCode: string) => {
    try {
        const path = '/users/byUserCode/'
        const response = await AxiosInstance.get(path, {
            params: { UserCode: UserCode}
        })
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListAllUsers = async () => {
    try {
        const path = '/users/'
        const response = await AxiosInstance.get(path)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListUsersByName = async (Name: string) => {
    try {
        const path = '/users/'
        const response = await AxiosInstance.get(path, {
            params: { Name: Name}
        })
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const UpdateUserByUserCode = async (UserCode: string, Name: string, Password: string) => {
    try {
        const path = '/users/'
        const data = {
            UserCode: UserCode,
            Name: Name,
            Password: Password
        } 
        const response = await AxiosInstance.put(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const DeleteUserByUserCode = async (UserCode: string) => {
    try {
        const path = '/users/'
        const config: AxiosRequestConfig = { data: {UserCode: UserCode} }
        const response = await AxiosInstance.delete(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}