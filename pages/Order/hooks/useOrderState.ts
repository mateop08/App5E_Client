import OrderGestor, { Order } from "@/models/Orders.model"
import { useState } from "react"

export interface OrderState {
    order: Order,
    changeToEmpy: () => void,
    change: (newList: Order) =>  void,
    refreshOrder: (OrderDocument: string, OrderNumber: number) => void
}

export const useOrderState = () => {

    const emptyOrder: Order = OrderGestor.GetEmpty()

    const [order, setOrder] = useState<Order>(emptyOrder)
    const changeToEmpy = () => {
        setOrder(emptyOrder)
    }
    
    const change = (newOrder: Order) => {
        setOrder(newOrder)
    }

    const refreshOrder = (OrderDocument: string, OrderNumber: number) => {
        OrderGestor.GetByOrderDocumentAndOrderNumber(OrderDocument, Number(OrderNumber))
            .then((data) => setOrder(data),
            (error) => console.log(error))
    }

    const orderState: OrderState = {
        order: order,
        changeToEmpy: changeToEmpy,
        change: change,
        refreshOrder: refreshOrder
    }

    
    
    return orderState
}