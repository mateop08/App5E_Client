import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";

export const CreateBulkProductOutAnnullation = async (ProductCode: string, Amount: number, OutId: number, AnnulledReason: string, User: string) => {

    try {
        const path = '/bulkproductoutannullations/'
        const data = {
            ProductCode: ProductCode,
            Amount: Amount,
            OutId: OutId,
            AnnulledReason: AnnulledReason,
            User: User
        } 
        
        const response = await AxiosInstance.post(path, data)
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const GetBulkProductOutAnnullationByAnnullationId = async (AnnullationId: number) => {
    try {
        const path = '/bulkproductoutannullations/byAnnullationId/'
        const response = await AxiosInstance.get(path, {
            params: { AnnullationId: AnnullationId}
        })
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListBulkProductOutAnnullationByOutId = async (OutId: number) => {
    try {
        const path = '/bulkproductoutannullations/byOutId/'
        const response = await AxiosInstance.get(path, {
            params: { OutId: OutId}
        })
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}
