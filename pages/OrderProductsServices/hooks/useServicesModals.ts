import useCrud, { Crud } from "@/hooks/useCrud.hook"
import useModal, { ModalGestor } from "@/hooks/useModal.hook"
import { Service } from "@/models/Services.model"
import { useState } from "react"

export interface ServicesModalState {
    searchWindow: ModalGestor,
    formWindow: ModalGestor,
    searchedServices: {
        list: Service[],
        change: (newList: Service[]) => void
        clearList: () => void
    } 
    crud: Crud
}

export const useServicesModalsState = () => {
    const searchWindow = useModal()
    const formWindow = useModal()
    const crud = useCrud()
    const [searchedServicesList, setSearchedServicesList] = useState<Service[]>([])

    const change = (newList: Service[]) => {
        setSearchedServicesList(newList)
    }

    const clearList = () => {
        setSearchedServicesList([])
    }

    const ServicesModalState: ServicesModalState = {
        searchWindow: searchWindow,
        formWindow: formWindow,
        crud: crud,
        searchedServices: {
            list: searchedServicesList,
            change: change,
            clearList: clearList
        }
        
    }
    return ServicesModalState
}