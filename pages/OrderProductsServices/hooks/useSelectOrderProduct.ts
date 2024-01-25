import OrderProductGestor, { OrderProduct } from "@/models/OrderProducts.model"
import { useState } from "react"

export interface SelectOrderProductState {
    selectOrderProduct: OrderProduct,
    change: (newOrderProduct: OrderProduct) => void,
    setToEmpty: () => void
}

export const useSelectOrderProduct = () => {
    const emptyOrderProduct = OrderProductGestor.GetEmpty()
    const [selectedOrderProduct, setSelectedOrderProduct] = useState<OrderProduct>(emptyOrderProduct)

    const change = (newOrderProduct: OrderProduct) => {
        setSelectedOrderProduct(newOrderProduct)
    }

    const setToEmpty = () => {
        setSelectedOrderProduct(emptyOrderProduct)
    }
    
    const selectedOrderProductState: SelectOrderProductState = {
        selectOrderProduct: selectedOrderProduct,
        change: change,
        setToEmpty: setToEmpty
    }
    return selectedOrderProductState

}