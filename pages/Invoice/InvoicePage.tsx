
import { InvoiceContext, InvoiceState } from "./contexts/InvoiceContext"
import useModal from "@/hooks/useModal.hook"
import { useSelectOrder } from "./hooks/useSelectedOrder"
import OrderSection from "./components/OrderSection"
import InvoiceConfiguration from "./components/InvoiceConfiguration"
import { FormProvider, useForm } from "react-hook-form"
import { useSelectCustomer } from "@/hooks/useSelectCustomer.hooks"
import CustomerSection from "./components/CustomerSection"
import InvoiceTable from "./components/InvoiceTable"
import PaymentMethodSection from "./components/PaymentMethodSection"
import { PaymentMethod } from "@/models/PaymentMethod.model"
import SaveInvoice from "./components/SaveInvoice"
import { useTotalOrderState } from "./hooks/useTotal"

export interface InvoiceForm {
    OrderDocument: string,
    OrderNumber: number,
    ConsecutiveCode: string,
    CustomerId: string,
    Store: string,
    CashRegisterCode: string,
    CostCenterCode: string,
    Seller: string,
    PaymentMethodsList: RegisterPaymentMethod[]
}

export interface RegisterPaymentMethod {
    PaymentMethod: PaymentMethod,
    Value: number,
    Note: string,
}

const InvoicePage = () => {

    const initialInvoiceState: InvoiceForm = {
        OrderDocument: '',
        OrderNumber: 0,
        ConsecutiveCode: '',
        CustomerId: '',
        Store: '',
        CashRegisterCode: '',
        CostCenterCode: '',
        Seller: '',
        PaymentMethodsList: []
    }
    const configurationModal = useModal()
    const customerSearchModal = useModal()

    const methods = useForm<InvoiceForm>({defaultValues: initialInvoiceState})
    const invoiceState: InvoiceState =  {
        configurationWindow: configurationModal,
        searchCustomerWindow: customerSearchModal,
        selectOrderState: useSelectOrder(),
        selectCustomerState: useSelectCustomer(),
        totalOrderState: useTotalOrderState()
    }

    return(
        <InvoiceContext.Provider value = {invoiceState} >
            <FormProvider {...methods}>
                <h1>Facturación de ordenes</h1>
                <OrderSection />
                <InvoiceConfiguration />
                <CustomerSection />
                <InvoiceTable />
                <PaymentMethodSection />
                <SaveInvoice />
            </FormProvider>
        </InvoiceContext.Provider>
    )
}

export default InvoicePage