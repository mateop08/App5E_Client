import CustomerGestor, { Customer } from "@/models/Customer.model"
import { useState } from "react"

export interface SelectCustomerState {
    selectCustomer: Customer,
    change: (newCustomer: Customer) => void,
    setToEmpty: () => void
}

export const useSelectCustomer = () => {
    const emptyCustomer = CustomerGestor.GetEmpty()
    const [selectedCustomer, setSelectedCustomer] = useState<Customer>(emptyCustomer)

    const change = (newCustomer: Customer) => {
        setSelectedCustomer(newCustomer)
    }

    const setToEmpty = () => {
        setSelectedCustomer(emptyCustomer)
    }
    
    const selectedCustomerState: SelectCustomerState = {
        selectCustomer: selectedCustomer,
        change: change,
        setToEmpty: setToEmpty
    }
    return selectedCustomerState

}