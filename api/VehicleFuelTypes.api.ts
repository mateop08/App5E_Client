import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";
import { AxiosRequestConfig } from "axios";

export const CreateVehicleFuelType = async (Code: string, Description: string) => {
    try {
        const path = '/vehiclefueltypes/'
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

export const ListAllVehicleFuelTypes = async () => {
    try {
        const path = '/vehiclefueltypes/'
        const response = await AxiosInstance.get(path)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListVehicleFuelTypesByDescription = async (Description: string) => {
    try {
        const path = '/vehiclefueltypes/'
        const response = await AxiosInstance.get(path, {
            params: { Description: Description}
        })
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const UpdateVehicleFuelTypeByCode = async (Code: string, Description: string) => {
    try {
        const path = '/vehiclefueltypes/'
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

export const DeleteVehicleFuelTypeByCode = async (Code: string) => {
    try {
        const path = '/vehiclefueltypes/'
        const config: AxiosRequestConfig = { data: {Code: Code} }
        const response = await AxiosInstance.delete(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}