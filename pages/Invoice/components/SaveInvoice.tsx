import { Button } from "reactstrap"
import { InvoiceForm } from "../InvoicePage"
import { useFormContext } from "react-hook-form"
import InvoiceGestor from "@/models/Invoice.model"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

const SaveInvoice = () => {

    const User = useSelector((state: RootState) => state.userReducer.User)
    const {handleSubmit} = useFormContext<InvoiceForm>()

    const OnSaveInvoice = async (data: InvoiceForm) => {
        try {
            if (User === null) throw("No es posible guardar la factura si el usuario es NULL.")

            const {OrderDocument, OrderNumber, ConsecutiveCode, 
                CustomerId, Store, PaymentMethodsList, CashRegisterCode, CostCenterCode} = data

            const seller = '0'

            const response = await InvoiceGestor.CreateInvoice(OrderDocument, OrderNumber, ConsecutiveCode, 
                CustomerId, Store, PaymentMethodsList, 
                CashRegisterCode, CostCenterCode, seller, User)

            window.alert(response)
            location.reload()
        } catch (error) {
            window.alert(error)
        }
    }

    return (
        <div className="text-center">
            <br />
            <Button color="primary" onClick={handleSubmit(OnSaveInvoice)}>Guardar factura</Button>
        </div>
    )
}

export default SaveInvoice