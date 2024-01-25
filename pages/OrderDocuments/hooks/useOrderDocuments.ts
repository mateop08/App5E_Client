
import OrderDocumentGestor, { OrderDocument } from "@/models/OrderDocuments.model"
import { useState } from "react"

export interface OrderDocumentsListState {
    orderDocumentsList: OrderDocument[],
    changeToEmpy: () => void,
    changeList: (newList: OrderDocument[]) =>  void,
    refreshList:  (OrderDocument: string, OrderNumber: number) => void
}

export const useOrderDocumentsList = () => {
    const [orderDocumentsList, setOrderDocumentsList] = useState<OrderDocument[]>([])

    const changeToEmpy = () => {
        setOrderDocumentsList([])
    }
    
    const changeList = (newList: OrderDocument[]) => {
        setOrderDocumentsList(newList)
    }

    const refreshList = async (OrderDocument: string, OrderNumber: number) => {
        OrderDocumentGestor.List(OrderDocument, OrderNumber)
        .then( (data) => setOrderDocumentsList(data)) 
    }

    const orderDocumentsListState: OrderDocumentsListState = {
        orderDocumentsList: orderDocumentsList,
        changeToEmpy: changeToEmpy,
        changeList: changeList,
        refreshList: refreshList
    }
    
    return orderDocumentsListState
}