import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";

export const ListStoresByUser = async (User: string) => {
    try {
        const path = '/store/'
        const response = await AxiosInstance.get(path, {
            params: { User: User}
        })
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}