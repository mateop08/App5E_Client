import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";
import { AxiosRequestConfig } from "axios";

export const CreateVehicleMembership = async (Plate: string, ContactId: string, MembershipTypeCode: string) => {
    try {
        const path = '/vehiclememberships/'
        const config: AxiosRequestConfig = {
            data: {
                Plate: Plate,
                ContactId: ContactId,
                MembershipTypeCode: MembershipTypeCode
            } 
        }
        const response = await AxiosInstance.post(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const GetByCardNumber = async (CardNumber: number) => {
    try {
        const path = '/vehiclememberships/byCardnumber/'
        const response = await AxiosInstance.get(path, {
            params: { CardNumber: CardNumber}
        })
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListVehicleMembershipsByPlate = async (Plate: string) => {
    try {
        const path = '/vehiclememberships/byPlate/'
        const response = await AxiosInstance.get(path, {
            params: { Plate: Plate}
        })
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListVehicleMembershipsByContactId = async (ContactId: string) => {
    try {
        const path = '/vehiclememberships/byContactid/'
        const response = await AxiosInstance.get(path, {
            params: { ContactId: ContactId}
        })
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ActivateVehicleMembership = async (CardNumber: number) => {
    try {
        const path = '/vehiclememberships/activate/'
        const config: AxiosRequestConfig = {
            data: {
                CardNumber: CardNumber
            } 
        }
        const response = await AxiosInstance.put(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const DeactivateVehicleMembership = async (CardNumber: number) => {
    try {
        const path = '/vehiclememberships/deactivate/'
        const config: AxiosRequestConfig = {
            data: {
                CardNumber: CardNumber
            } 
        }
        const response = await AxiosInstance.put(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const DeleteVehicleMembership = async (CardNumber: number) => {
    try {
        const path = '/vehiclememberships/'
        const config: AxiosRequestConfig = { data: {CardNumber: CardNumber} }
        const response = await AxiosInstance.delete(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}