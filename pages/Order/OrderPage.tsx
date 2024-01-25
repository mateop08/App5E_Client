import { useEffect } from "react"
import { Outlet,  useParams } from "react-router-dom"
import { OrderContext, OrderPageState } from "./context/OrderContext"
import { useOrderState } from "./hooks/useOrderState"
import OrderForm from "./components/OrderForm"
import useActive from "@/hooks/useActive"
import useModal from "@/hooks/useModal.hook"
import AnnullationForm from "./components/AnnullationForm"

const OrderPage = () => {

    const OrderState = useOrderState()
    const ActiveState = useActive()
    const AnnullationModal = useModal()
    const orderPageState: OrderPageState = {
        orderState: OrderState,
        editingState: ActiveState,
        annullationWindow: AnnullationModal
    }

    const {OrderDocument, OrderNumber} = useParams()
    const {refreshOrder} = OrderState
    
    const loadOrder = () => {
        if (OrderDocument === undefined || OrderNumber === undefined) throw("Error documento no definido en la ruta")
        refreshOrder(OrderDocument, Number(OrderNumber))
    }

    useEffect(() => {
        loadOrder()
    // eslint-disable-next-line
    },[])

    return (
        <OrderContext.Provider value={orderPageState}>
            <OrderForm />
            <AnnullationForm />
            <Outlet />
        </OrderContext.Provider>
    )
}

export default OrderPage