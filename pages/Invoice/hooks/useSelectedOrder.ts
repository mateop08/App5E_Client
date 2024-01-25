import OrderGestor, { Order } from "@/models/Orders.model"
import { useState } from "react"

export interface SelectOrderState {
    order: Order,
    change: (newOrder: Order) => void,
    setToEmpty: () => void
}

export const useSelectOrder = () => {
    const emptyOrder = OrderGestor.GetEmpty()
    const [selectedOrder, setSelectedOrder] = useState<Order>(emptyOrder)
    const change = (newOrder: Order) => {
        setSelectedOrder(newOrder)
    }

    const setToEmpty = () => {
        setSelectedOrder(emptyOrder)
    }
    const selectedOrderState: SelectOrderState = {
        order: selectedOrder,
        change: change,
        setToEmpty: setToEmpty
    }
    return selectedOrderState

}