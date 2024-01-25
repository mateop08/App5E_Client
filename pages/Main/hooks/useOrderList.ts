
import { Order } from "@/models/Orders.model"
import { useState } from "react"

export interface OrderListState {
    ordersList: Order[],
    changeToEmpy: () => void,
    changeList: (newList: Order[]) =>  void
}

export const useOrderList = () => {
    const [ordersList, setOrderList] = useState<Order[]>([])

    const changeToEmpy = () => {
        setOrderList([])
    }
    
    const changeList = (newList: Order[]) => {
        setOrderList(newList)
    }
    const orderListState: OrderListState = {
        ordersList: ordersList,
        changeToEmpy: changeToEmpy,
        changeList: changeList
    }
    
    return orderListState
}