import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";
import { RegisterPaymentMethod } from "@/pages/Invoice/InvoicePage";

export const CreateInvoice = async (invoiceData: {OrderDocument: string, OrderNumber: number, ConsecutiveCode: string, 
    CustomerId: string, Store: string, PaymentMethodsList: RegisterPaymentMethod[], 
    CashRegisterCode: string, CostCenterCode: string, Seller: string, User: string}) => {
    
    try {
        const path = '/invoice/'
        const response = await AxiosInstance.post(path, invoiceData)
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}