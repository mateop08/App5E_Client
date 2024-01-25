import { createContext, useContext } from "react";
import { SelectOrderState } from "../hooks/useSelectedOrder";
import { ModalGestor } from "@/hooks/useModal.hook";
import OrderGestor from "@/models/Orders.model";
import { SelectCustomerState } from "@/hooks/useSelectCustomer.hooks";
import CustomerGestor from "@/models/Customer.model";
import { TotalOrderState } from "../hooks/useTotal";

export interface InvoiceState {
    selectOrderState: SelectOrderState,
    selectCustomerState: SelectCustomerState,
    configurationWindow: ModalGestor,
    searchCustomerWindow: ModalGestor,
    totalOrderState: TotalOrderState
    
}

const initialInvoiceState: InvoiceState = {
    selectOrderState: {
        order: OrderGestor.GetEmpty(),
        setToEmpty: () => {},
        change: () => {}
    },
    selectCustomerState: {
        selectCustomer: CustomerGestor.GetEmpty(),
        change: () => {},
        setToEmpty: () => {}
    },
    configurationWindow: {
        isModalVisible: false,
        toggleModal: () => {}
    },
    searchCustomerWindow: {
        isModalVisible: false,
        toggleModal: () => {}
    },
    totalOrderState: {
        total: 0,
        change: () => {},
        setToEmpty: () => {}
    }
}

export const InvoiceContext = createContext<InvoiceState>(initialInvoiceState)

export const useInvoicesContext = () => useContext(InvoiceContext)