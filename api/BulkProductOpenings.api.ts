import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";

export const CreateBulkProductOpening = async (ProductCode: string, User: string) => {

    try {
        const path = '/bulkproductopenings/'
        const data = {
            ProductCode: ProductCode,
            User: User
        } 
        
        const response = await AxiosInstance.post(path, data)
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const CloseBulkProductOpening = async (OpeningId: number, LeftOverAmount: number, User: string) => {
    try {
        const path = '/bulkproductopenings/close/'
        const data = { OpeningId: OpeningId, 
            LeftOverAmount: LeftOverAmount,
            User: User
        }
        const response = await AxiosInstance.put(path, data)
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const GetBulkProductOpeningByOpeningId = async (OpeningId: number) => {
    try {
        const path = '/bulkproductopenings/byOpeningid/'
        const response = await AxiosInstance.get(path, {
            params: { OpeningId: OpeningId}
        })
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListActiveBulkProductOpenings = async () => {
    try {
        const path = '/bulkproductopenings/active/'
        const response = await AxiosInstance.get(path)
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListAllBulkProductOpenings = async () => {
    try {
        const path = '/bulkproductopenings/'
        const response = await AxiosInstance.get(path)
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}