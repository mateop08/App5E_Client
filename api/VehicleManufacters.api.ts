import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";
import { AxiosRequestConfig } from "axios";

export const CreateVehicleManufacter = async (Description: string) => {
    try {
        const path = '/vehiclemanufacters/'
        const data = {
            Description: Description
        } 
        const response = await AxiosInstance.post(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListAllVehicleManufacters = async () => {
    try {
        const path = '/vehiclemanufacters/'
        const response = await AxiosInstance.get(path)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListVehicleManufactersByDescription = async (Description: string) => {
    try {
        const path = '/vehiclemanufacters/ByManufacterid/'
        const response = await AxiosInstance.get(path, {
            params: { Description: Description}
        })
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const UpdateVehicleManufacterByManufacterId = async (ManufacterId: number, Description: string) => {
    try {
        const path = '/vehiclemanufacters/'
        const config: AxiosRequestConfig = {
            data: {
                ManufacterId: ManufacterId,
                Description: Description
            } 
        }
        const response = await AxiosInstance.put(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const DeleteVehicleManufacterByManufacterId = async (ManufacterId: number) => {
    try {
        const path = '/vehiclemanufacters/'
        const config: AxiosRequestConfig = { data: {ManufacterId: ManufacterId} }
        const response = await AxiosInstance.delete(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}