import AxiosInstance from "@/helpers/AxiosInstance";
import { AxiosErrorValidation } from "@/helpers/AxiosErrorValidation.ts";
import { AxiosRequestConfig } from "axios";

export const CreateContact = async (Identification: string, FullName: string, ContactNumber: string, Email: string, Address: string) => {
    try {
        const path = '/contacts/'
        const data = {
            Identification: Identification,
            FullName: FullName,
            ContactNumber: ContactNumber,
            Email: Email,
            Address: Address
        } 
        const response = await AxiosInstance.post(path, data)
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListContactsByFullName = async (FullName: string) => {
    try {
        const path = '/contacts/byFullName/'
        const response = await AxiosInstance.get(path, {
            params: { FullName: FullName}
        })
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const ListAllContacts = async () => {
    try {
        const path = '/contacts/'
        const response = await AxiosInstance.get(path)
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const UpdateContactByIdentification = async (Identification: string, FullName: string, ContactNumber: string, Email: string, Address: string) => {
    try {
        const path = '/contacts/'
        const data = {
            Identification: Identification,
            FullName: FullName,
            ContactNumber: ContactNumber,
            Email: Email,
            Address: Address
        } 
        const response = await AxiosInstance.put(path, data)
        return response.data
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}

export const DeleteContactByIdentification = async (Identification: string) => {
    try {
        const path = '/contacts/'
        const config: AxiosRequestConfig = { data: {Identification: Identification} }
        const response = await AxiosInstance.delete(path, config)
        return response
    } catch (error) {
        return AxiosErrorValidation(error)
    }
}