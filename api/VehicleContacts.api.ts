import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";
import { AxiosRequestConfig } from "axios";

export const CreateVehicleContact = async (VehiclePlate: string, ContactId: string) => {
    try {
        const path = '/vehiclecontacts/'
        const data = {
            VehiclePlate: VehiclePlate,
            ContactId: ContactId
        } 
        const response = await AxiosInstance.post(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ExistsVehicleContact = async (VehiclePlate: string, ContactId: string) => {
    try {
        const path = '/vehiclecontacts/exists/'
        const data = {
            VehiclePlate: VehiclePlate,
            ContactId: ContactId
        }
        const response = await AxiosInstance.post(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListVehicleContactsByContactId = async (ContactId: string) => {
    try {
        const path = '/vehiclecontacts/byContactid/'
        const response = await AxiosInstance.get(path, {
            params: { ContactId: ContactId}
        })
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListVehicleContactsByVehiclePlate = async (VehiclePlate: string) => {
    try {
        const path = '/vehiclecontacts/byVehicleplate/'
        const response = await AxiosInstance.get(path, {
            params: { VehiclePlate: VehiclePlate}
        })
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const DeleteVehicleContactByCode = async (VehiclePlate: string, ContactId: string) => {
    try {
        const path = '/vehiclecontacts/'
        const config: AxiosRequestConfig = {
            data: {
                VehiclePlate: VehiclePlate,
                ContactId: ContactId
            } 
        }
        const response = await AxiosInstance.delete(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}