import CustomerSearchForm from "./CustomerSearchForm"
import { useInvoicesContext } from "../contexts/InvoiceContext"
import { useFormContext } from "react-hook-form"
import { InvoiceForm } from "../InvoicePage"
import { Customer } from "@/models/Customer.model"

const CustomerSection = () => {

    const {searchCustomerWindow, selectCustomerState} = useInvoicesContext()

    const {setValue } = useFormContext<InvoiceForm>()

    const selectCustomer = (data: Customer) => {
        setValue("CustomerId", data.Identification)
    }

    const cancel = () => {
        setValue("CustomerId", '')
    }

    return (
        <>
            <CustomerSearchForm 
                Modal={searchCustomerWindow}
                SelectCustomer={selectCustomerState}
                onSelectCallback={selectCustomer}
                onCancelCallback={cancel}/>
        </>
    )
}

export default CustomerSection