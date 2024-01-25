import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";

export const CreateOrder = async (data: {OrderDocument: string, CardNumber: number, Plate: string, ContactId: string, Mileage: number, 
    Diagnosis: boolean, Lubrication: boolean, Mechanics: boolean, Powertrain: boolean, Warranty: boolean, Quote: boolean, User: string, ReceptionNote: string}) => {
    try {
        const path = '/orders/'
        //console.log(data)
        const response = await AxiosInstance.post(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const GetByOrderDocumentAndOrderNumber = async (OrderDocument: string, OrderNumber: number) => {
    try {
        const path = '/orders/'
        const response = await AxiosInstance.get(path, {
            params: { OrderDocument: OrderDocument, OrderNumber: OrderNumber}
        })
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const CloseOrder = async (OrderDocument: string, OrderNumber: number) => {
    try {
        const path = '/orders/close/'
        const data = { OrderDocument: OrderDocument, 
            OrderNumber: OrderNumber, 
        }
        const response = await AxiosInstance.put(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const AnnullOrder = async (OrderDocument: string, OrderNumber: number, User: string, AnnulledReason: string) => {
    try {
        const path = '/orders/annull/'
        const data = { OrderDocument: OrderDocument, 
            OrderNumber: OrderNumber, 
            User: User,
            AnnulledReason: AnnulledReason
        }
        const response = await AxiosInstance.put(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListOpenOrdersByOrderDocument = async (OrderDocument: string) => {
    try {
        const path = '/orders/open/'
        const response = await AxiosInstance.get(path, {
            params: { OrderDocument: OrderDocument}
        })
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListByFilters = async (data: {OrderDocument: string, PlateSearch: string, Diagnosis: boolean, Lubrication: boolean, Mechanics: boolean, 
    Powertrain: boolean, Warranty: boolean, Quote: boolean, 
    OpenSearch: boolean | null, StateSearch: string | null, 
    InitialDate: string | null, FinalDate: string | null}) => {
    try {
        const path = '/orders/filters/'
        const response = await AxiosInstance.post(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const UpdateOrderById = async (data: {OrderDocument: string, CardNumber: number, Plate: string, ContactId: string, Mileage: number, 
    Diagnosis: boolean, Lubrication: boolean, Mechanics: boolean, Powertrain: boolean, Warranty: boolean, Quote: boolean, State: string, User: string, ReceptionNote: string}) => {
    try {
        const path = '/orders/'
        const response = await AxiosInstance.put(path, data)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}
