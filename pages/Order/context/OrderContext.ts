import { createContext, useContext } from "react";

import { OrderState } from "../hooks/useOrderState";
import OrderGestor from "@/models/Orders.model";
import { ActiveState } from "@/hooks/useActive";
import { ModalGestor } from "@/hooks/useModal.hook";

export interface OrderPageState {
    orderState: OrderState,
    editingState: ActiveState,
    annullationWindow: ModalGestor
}

const initialOrderState: OrderPageState = {
    orderState: {
        change: () => {},
        changeToEmpy: () => {},
        order: OrderGestor.GetEmpty(),
        refreshOrder: () => {}
    },
    editingState: {
        active: false,
        activate: () => {},
        deactivate: () => {}
    },
    annullationWindow: {
        isModalVisible: false,
        toggleModal: () => {}
    }
    
}

export const OrderContext = createContext<OrderPageState>(initialOrderState)

export const useOrderContext = () => useContext(OrderContext)