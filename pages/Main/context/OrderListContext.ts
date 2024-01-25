import { createContext, useContext } from "react"

import { OrderListState } from "../hooks/useOrderList"

const initialOrderListState: OrderListState = {
    ordersList: [],
    changeList: () => {},
    changeToEmpy: () => {},
}

export const OrderListContext = createContext<OrderListState>(initialOrderListState)

export const useOrderListContext = () => useContext(OrderListContext)
