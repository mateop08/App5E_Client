import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";
import { AxiosRequestConfig } from "axios";

export const CreateVehicleYear = async (LineId: number, Year: string) => {
    try {
        const path = '/vehicleyears/'
        const data = {
            LineId: LineId,
            Year: Year
        } 
        const response = await AxiosInstance.post(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListVehicleYearsByLineId = async (LineId: number) => {
    try {
        const path = '/vehicleyears/ByLineid/'
        const response = await AxiosInstance.get(path, {
            params: { LineId: LineId}
        })
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const UpdateVehicleYearByYearId = async (YearId: number, LineId: number, Year: string) => {
    try {
        const path = '/vehicleyears/'
        const data = {
            YearId: YearId,
            LineId: LineId,
            Year: Year
        } 
        const response = await AxiosInstance.put(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const DeleteVehicleYearByYearId = async (LineId: number) => {
    try {
        const path = '/vehicleyears/'
        const config: AxiosRequestConfig = { data: {LineId: LineId} }
        const response = await AxiosInstance.delete(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}