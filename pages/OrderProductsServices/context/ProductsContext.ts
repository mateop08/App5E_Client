import { createContext, useContext } from "react";
import { OrderProductsListState } from "../hooks/useOrderProducts";
import { ProductsModalState } from "../hooks/useProductsModals";
import { SelectOrderProductState } from "../hooks/useSelectOrderProduct";
import OrderProductGestor from "@/models/OrderProducts.model";
import { SelectBulkProductOutState } from "../hooks/useSelectBulkProductOut";
import BulkProductOutGestor from "@/models/BulkProductOuts.model";

export interface ProductsState {
    orderProductsListState: OrderProductsListState,
    productsModals: ProductsModalState,
    selectOrderProduct: SelectOrderProductState,
    selectBulkProductOutState: SelectBulkProductOutState
}

const initialProductsServicesState: ProductsState = {
    orderProductsListState: {
        changeList: () => {},
        changeToEmpy: () => {},
        refreshList: () => {},
        orderProductsList: []
    },
    productsModals: {
        formWindow: {
            isModalVisible: false,
            toggleModal: () => {}
        },
        searchWindow: {
            isModalVisible: false,
            toggleModal: () => {}
        },
        bulkWindow: {
            isModalVisible: false,
            toggleModal: () => {}
        },
        bulkAnnullationWindow:{
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
        searchedProducts: {
            list: [],
            change: () => {},
            clearList: () => {}
        }
    },
    selectOrderProduct: {
        selectOrderProduct: OrderProductGestor.GetEmpty(),
        change: () => {},
        setToEmpty: () => {}
    },
    selectBulkProductOutState: {
        selectBulkProductOut: BulkProductOutGestor.GetEmpty(),
        change: () => {},
        setToEmpty: () => {}
    }
}

export const ProductsContext = createContext<ProductsState>(initialProductsServicesState)

export const useProductsContext = () => useContext(ProductsContext)