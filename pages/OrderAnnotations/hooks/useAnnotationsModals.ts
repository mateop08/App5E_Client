import useCrud, { Crud } from "@/hooks/useCrud.hook"
import useModal, { ModalGestor } from "@/hooks/useModal.hook"
import { AnnotationType } from "@/models/AnnotationTypes.model"
import { useState } from "react"

export interface AnnotationsModalState {
    searchWindow: ModalGestor,
    formWindow: ModalGestor,
    crud: Crud,
    searchedAnnotations: {
        list: AnnotationType[],
        change: (newList: AnnotationType[]) => void
        clearList: () => void
    } 
}

export const useAnnotationsModalsState = () => {
    const searchWindow = useModal()
    const formWindow = useModal()
    const crud = useCrud()

    const [searchedAnnotationsList, setSearchedAnnotationsList] = useState<AnnotationType[]>([])

    const change = (newList: AnnotationType[]) => {
        setSearchedAnnotationsList(newList)
    }

    const clearList = () => {
        setSearchedAnnotationsList([])
    }

    const AnnotationsModalState: AnnotationsModalState = {
        searchWindow: searchWindow,
        formWindow: formWindow,
        crud: crud,
        searchedAnnotations: {
            list: searchedAnnotationsList,
            change: change,
            clearList: clearList
        }
    }
    return AnnotationsModalState
}