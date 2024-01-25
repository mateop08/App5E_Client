import useCrud, { Crud } from "@/hooks/useCrud.hook"
import useModal, { ModalGestor } from "@/hooks/useModal.hook"
import { Product } from "@/models/Products.model"
import { useState } from "react"

export interface ProductsModalState {
    searchWindow: ModalGestor,
    formWindow: ModalGestor,
    bulkWindow: ModalGestor,
    bulkAnnullationWindow: ModalGestor,
    crud: Crud,
    searchedProducts: {
        list: Product[],
        change: (newList: Product[]) => void
        clearList: () => void
    } 
}

export const useProductsModalsState = () => {
    const searchWindow = useModal()
    const formWindow = useModal()
    const bulkWindow = useModal()
    const bulkAnnullationWindow = useModal()
    const crud = useCrud()

    const [searchedProductsList, setSearchedProductsList] = useState<Product[]>([])

    const change = (newList: Product[]) => {
        setSearchedProductsList(newList)
    }

    const clearList = () => {
        setSearchedProductsList([])
    }

    const ProductsModalState: ProductsModalState = {
        searchWindow: searchWindow,
        formWindow: formWindow,
        bulkWindow: bulkWindow,
        bulkAnnullationWindow: bulkAnnullationWindow,
        crud: crud,
        searchedProducts: {
            list: searchedProductsList,
            change: change,
            clearList: clearList
        }
    }
    return ProductsModalState
}