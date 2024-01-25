import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";

export const ListPaymentMethodsByUser = async (User: string) => {
    try {
        const path = '/paymentmethods/'
        const response = await AxiosInstance.get(path, {
            params: { User: User}
        })
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}