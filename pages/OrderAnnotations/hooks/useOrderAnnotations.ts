
import OrderAnnotationGestor, { OrderAnnotation } from "@/models/OrderAnnotations.model"
import { useState } from "react"

export interface OrderAnnotationsListState {
    orderAnnotationsList: OrderAnnotation[],
    changeToEmpy: () => void,
    changeList: (newList: OrderAnnotation[]) =>  void,
    refreshList:  (OrderDocument: string, OrderNumber: number) => void
}

export const useOrderAnnotationsList = () => {
    const [orderAnnotationsList, setOrderAnnotationsList] = useState<OrderAnnotation[]>([])

    const changeToEmpy = () => {
        setOrderAnnotationsList([])
    }
    
    const changeList = (newList: OrderAnnotation[]) => {
        setOrderAnnotationsList(newList)
    }

    const refreshList = async (OrderDocument: string, OrderNumber: number) => {
        OrderAnnotationGestor.List(OrderDocument, OrderNumber)
        .then( (data) => {
            return setOrderAnnotationsList(data)
        }) 
    }

    const orderAnnotationsListState: OrderAnnotationsListState = {
        orderAnnotationsList: orderAnnotationsList,
        changeToEmpy: changeToEmpy,
        changeList: changeList,
        refreshList: refreshList
    }
    
    return orderAnnotationsListState

}