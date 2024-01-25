import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";
import { AxiosRequestConfig } from "axios";

export const CreateVehicleLine = async (ManufacterId: number, Description: string) => {
    try {
        const path = '/vehiclelines/'
        const data = {
            ManufacterId: ManufacterId,
            Description: Description
        }
    
        const response = await AxiosInstance.post(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListVehicleLinesByManufacterId = async (ManufacterId: number) => {
    try {
        const path = '/vehiclelines/ByManufacterid/'
        const response = await AxiosInstance.get(path, {
            params: { ManufacterId: ManufacterId}
        })
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const UpdateVehicleLineByLineId = async (LineId: number, ManufacterId: number, Description: string) => {
    try {
        const path = '/vehiclelines/'
        const data = {
            LineId: LineId,
            ManufacterId: ManufacterId,
            Description: Description
        } 
        const response = await AxiosInstance.put(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const DeleteVehicleLineByLineId = async (LineId: number) => {
    try {
        const path = '/vehiclelines/'
        const config: AxiosRequestConfig = { data: {LineId: LineId} }
        const response = await AxiosInstance.delete(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}