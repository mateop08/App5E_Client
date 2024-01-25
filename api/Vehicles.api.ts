import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";
import { AxiosRequestConfig } from "axios";

export const CreateVehicle = async (data: {Plate: string, PlateType: string, ManufacterId: number, LineId: number, YearId: number, EngineId: number, FuelType: string}) => {
    try {
        const path = '/vehicles/'
        const response = await AxiosInstance.post(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const GetVehicleByPlate = async (Plate: string) => {
    try {
        const path = '/vehicles/byPlate/'
        const response = await AxiosInstance.get(path, {
            params: { Plate: Plate}
        })
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListVehiclesByDescription = async (Description: string) => {
    try {
        const path = '/vehicles/byDescription/'
        const response = await AxiosInstance.get(path, {
            params: { Description: Description}
        })
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const UpdateVehicleByPlate = async (data: {Plate: string, PlateType: string, ManufacterId: number, LineId: number, YearId: number, EngineId: number, FuelType: string}) => {
    try {
        const path = '/vehicles/'
        const response = await AxiosInstance.put(path, data)
        return response
    } catch (error) {
        console.log(error)
        return AxiosErrorValidation(error)
    }
}

export const DeleteVehicleByPlate = async (Plate: string) => {
    try {
        const path = '/vehicles/'
        const config: AxiosRequestConfig = { data: {Plate: Plate} }
        const response = await AxiosInstance.delete(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}