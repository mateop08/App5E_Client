
import OrderServiceGestor, { OrderService } from "@/models/OrderServices.model"
import { useState } from "react"

export interface OrderServicesListState {
    orderServicesList: OrderService[],
    changeToEmpy: () => void,
    changeList: (newList: OrderService[]) =>  void,
    refreshList: (OrderDocument: string, OrderNumber: number) => void
}

export const useOrderServicesList = () => {
    const [orderServicesList, setOrderServicesList] = useState<OrderService[]>([])

    const changeToEmpy = () => {
        setOrderServicesList([])
    }
    
    const changeList = (newList: OrderService[]) => {
        setOrderServicesList(newList)
    }

    const refreshList = async (OrderDocument: string, OrderNumber: number) => {
        OrderServiceGestor.List(OrderDocument, OrderNumber)
        .then( (data) => setOrderServicesList(data)) 
    }
    
    const orderListState: OrderServicesListState = {
        orderServicesList: orderServicesList,
        changeToEmpy: changeToEmpy,
        changeList: changeList,
        refreshList: refreshList
    }
    
    return orderListState
}