import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";
import { AxiosRequestConfig } from "axios";

export const CreateVehicleEngine = async (YearId: number, Description: string) => {
    try {
        const path = '/vehicleengines/'
        const data = {
            YearId: YearId,
            Description: Description
        } 
        const response = await AxiosInstance.post(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListVehicleEnginesByYearId = async (YearId: number) => {
    try {
        const path = '/vehicleengines/byYearid/'
        const response = await AxiosInstance.get(path, {
            params: { YearId: YearId}
        })
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const UpdateVehicleEngineByEngineId = async (EngineId: number, YearId: number, Description: string) => {
    try {
        const path = '/vehicleengines/'
        const data = {
            EngineId: EngineId,
            YearId: YearId,
            Description: Description
        } 
        const response = await AxiosInstance.put(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const DeleteVehicleEngineByEngineId = async (EngineId: number) => {
    try {
        const path = '/vehicleengines/'
        const config: AxiosRequestConfig = { data: {EngineId: EngineId} }
        const response = await AxiosInstance.delete(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}