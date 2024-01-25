
import OrderProductGestor, { OrderProduct } from "@/models/OrderProducts.model"
import { useState } from "react"

export interface OrderProductsListState {
    orderProductsList: OrderProduct[],
    changeToEmpy: () => void,
    changeList: (newList: OrderProduct[]) =>  void,
    refreshList:  (OrderDocument: string, OrderNumber: number) => void
}

export const useOrderProductsList = () => {
    const [orderProductsList, setOrderProductsList] = useState<OrderProduct[]>([])

    const changeToEmpy = () => {
        setOrderProductsList([])
    }
    
    const changeList = (newList: OrderProduct[]) => {
        setOrderProductsList(newList)
    }

    const refreshList = async (OrderDocument: string, OrderNumber: number) => {
        OrderProductGestor.List(OrderDocument, OrderNumber)
        .then( (data) => setOrderProductsList(data)) 
    }

    const orderProductsListState: OrderProductsListState = {
        orderProductsList: orderProductsList,
        changeToEmpy: changeToEmpy,
        changeList: changeList,
        refreshList: refreshList
    }
    
    return orderProductsListState
}