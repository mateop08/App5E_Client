import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";

export const ListOfimaDocumentTypesByUser = async (User: string) => {
    try {
        const path = '/ofimadocumenttype/'
        const response = await AxiosInstance.get(path, {
            params: { User: User}
        })
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListInvoiceOfimaDocumentTypesByUser = async (User: string) => {
    try {
        const path = '/ofimadocumenttype/invoice/'
        const response = await AxiosInstance.get(path, {
            params: { User: User}
        })
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}