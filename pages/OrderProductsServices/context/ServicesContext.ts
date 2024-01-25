import { createContext, useContext } from "react";
import { OrderServicesListState } from "../hooks/useOrderServices";
import { ServicesModalState } from "../hooks/useServicesModals";

export interface ServicesState {
    orderServicesListState: OrderServicesListState,
    servicesModals: ServicesModalState,
}

const initialServicesServicesState: ServicesState = {
    orderServicesListState: {
        changeList: () => {},
        changeToEmpy: () => {},
        refreshList: () => {},
        orderServicesList: []
    },
    servicesModals: {
        formWindow: {
            isModalVisible: false,
            toggleModal: () => {}
        },
        searchWindow: {
            isModalVisible: false,
            toggleModal: () => {}
        },
        crud: {
            isCreating: false,
            isUpdating: false,
            setToCreate: () => {},
            setToUpdate: () => {},
            setToNone: () => {}
        },
        searchedServices: {
            list: [],
            change: () => {},
            clearList: () => {}
        }
    }
}

export const ServicesContext = createContext<ServicesState>(initialServicesServicesState)

export const useServicesContext = () => useContext(ServicesContext)