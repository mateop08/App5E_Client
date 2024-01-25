import useCrud, { Crud } from "@/hooks/useCrud.hook"
import useModal, { ModalGestor } from "@/hooks/useModal.hook"
import { DocumentType } from "@/models/DocumentTypes.model"
import { useState } from "react"

export interface DocumentsModalState {
    searchWindow: ModalGestor,
    formWindow: ModalGestor,
    crud: Crud,
    searchedDocuments: {
        list: DocumentType[],
        change: (newList: DocumentType[]) => void
        clearList: () => void
    } 
}

export const useDocumentsModalsState = () => {
    const searchWindow = useModal()
    const formWindow = useModal()
    const crud = useCrud()

    const [searchedDocumentsList, setSearchedDocumentsList] = useState<DocumentType[]>([])

    const change = (newList: DocumentType[]) => {
        setSearchedDocumentsList(newList)
    }

    const clearList = () => {
        setSearchedDocumentsList([])
    }

    const DocumentsModalState: DocumentsModalState = {
        searchWindow: searchWindow,
        formWindow: formWindow,
        crud: crud,
        searchedDocuments: {
            list: searchedDocumentsList,
            change: change,
            clearList: clearList
        }
    }
    return DocumentsModalState
}