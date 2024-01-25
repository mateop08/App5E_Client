import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";

export const CreateBulkProductOut = async (data: {ProductCode: string, InitialNumber: number | null, FinalNumber: number | null, 
    Amount: number, WithDigitalDispenser: boolean, ForServiceOrder: boolean, 
    OrderProductId: number | null, User: string}) => {

    const { ProductCode, InitialNumber, FinalNumber, Amount, WithDigitalDispenser, 
    ForServiceOrder, OrderProductId, User} = data

    try {
        const path = '/bulkproductouts/'
        const data = {
            ProductCode: ProductCode,
            InitialNumber: InitialNumber,
            FinalNumber: FinalNumber,
            Amount: Amount,
            WithDigitalDispenser: WithDigitalDispenser,
            ForServiceOrder: ForServiceOrder,
            OrderProductId: OrderProductId,
            User: User
        } 
        
        const response = await AxiosInstance.post(path, data)
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const GetBulkProductOutByOutId = async (OutId: number) => {
    try {
        const path = '/bulkproductouts/byOutId/'
        const response = await AxiosInstance.get(path, {
            params: { OutId: OutId}
        })
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListBulkProductOutsByOpeningId = async (OpeningId: number) => {
    try {
        const path = '/bulkproductouts/byOpeningId/'
        const response = await AxiosInstance.get(path, {
            params: { OpeningId: OpeningId}
        })
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListBulkProductOutsByOrderProductId = async (OrderProductId: number) => {
    try {
        const path = '/bulkproductouts/byOrderProductId/'
        const response = await AxiosInstance.get(path, {
            params: { OrderProductId: OrderProductId}
        })
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}
