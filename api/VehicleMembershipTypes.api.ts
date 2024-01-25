import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";
import { AxiosRequestConfig } from "axios";

export const CreateVehicleMembershipType = async (Code: string, Description: string) => {
    try {
        const path = '/vehiclemembershiptypes/'
        const config: AxiosRequestConfig = {
            data: {
                Code: Code,
                Description: Description
            } 
        }
        const response = await AxiosInstance.post(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListVehicleMembershipTypesByDescription = async (Description: string) => {
    try {
        const path = '/vehiclemembershiptypes/'
        const response = await AxiosInstance.get(path, {
            params: { Description: Description}
        })
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const UpdateVehicleMembershipTypeByCode = async (Code: string, Description: string) => {
    try {
        const path = '/vehiclemembershiptypes/'
        const config: AxiosRequestConfig = {
            data: {
                Code: Code,
                Description: Description
            } 
        }
        const response = await AxiosInstance.put(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const DeleteVehicleMembershipTypeByCode = async (Code: string) => {
    try {
        const path = '/vehiclemembershiptypes/'
        const config: AxiosRequestConfig = { data: {Code: Code} }
        const response = await AxiosInstance.delete(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}