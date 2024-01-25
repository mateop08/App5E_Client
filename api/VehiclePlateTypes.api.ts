import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";
import { AxiosRequestConfig } from "axios";

export const CreateVehiclePlateType = async (Code: string, Description: string) => {
    try {
        const path = '/vehicleplatetypes/'
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

export const ListAllVehiclePlateTypes = async () => {
    try {
        const path = '/vehicleplatetypes/'
        const response = await AxiosInstance.get(path)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListVehiclePlateTypesByDescription = async (Description: string) => {
    try {
        const path = '/vehicleplatetypes/'
        const response = await AxiosInstance.get(path, {
            params: { Description: Description}
        })
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const UpdateVehiclePlateTypeByCode = async (Code: string, Description: string) => {
    try {
        const path = '/vehicleplatetypes/'
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

export const DeleteVehiclePlateTypeByCode = async (Code: string) => {
    try {
        const path = '/vehicleplatetypes/'
        const config: AxiosRequestConfig = { data: {Code: Code} }
        const response = await AxiosInstance.delete(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}