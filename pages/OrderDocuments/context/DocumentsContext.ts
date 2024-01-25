import { createContext, useContext } from "react";
import { OrderDocumentsListState } from "../hooks/useOrderDocuments";
import { DocumentsModalState } from "../hooks/useDocumentsModals";

export interface DocumentsState {
    orderDocumentsListState: OrderDocumentsListState,
    documentsModals: DocumentsModalState,
}

const initialDocumentsServicesState: DocumentsState = {
    orderDocumentsListState: {
        changeList: () => {},
        changeToEmpy: () => {},
        refreshList: () => {},
        orderDocumentsList: []
    },
    documentsModals: {
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
        searchedDocuments: {
            list: [],
            change: () => {},
            clearList: () => {}
        }
    }
}

export const DocumentsContext = createContext<DocumentsState>(initialDocumentsServicesState)

export const useDocumentsContext = () => useContext(DocumentsContext)