import { GetCustomersByIdentification, ListCustomersBySearchText } from "@/api/Customer.api"

export interface Customer {
    Identification: string,
    FullName: string,
    City: string,
    Address: string,
    PersonType: string
}

export const CustomerGestor = {
    Construct: (Identification: string, FullName: string, City: string, Address: string, PersonType: string) => {
        const Customer: Customer = {
            Identification: Identification,
            FullName: FullName,
            City: City,
            Address: Address,
            PersonType: PersonType
        }
        return Customer
    },

    GetEmpty () {
        return this.Construct('','','','','')
    },

    GetByIdentification: async (Identification: string) => {
        const data = await GetCustomersByIdentification(Identification) as Customer[]
        return data
    },

    Search: async( SearchText: string ) => {
        const data = await ListCustomersBySearchText(SearchText) as Customer[]
        return data
    }
}

export default CustomerGestor