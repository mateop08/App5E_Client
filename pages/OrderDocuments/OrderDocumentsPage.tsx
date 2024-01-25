import { FormProvider, useForm } from "react-hook-form"
//Context
import { DocumentsContext, DocumentsState } from "@/pages/OrderDocuments/context/DocumentsContext"
//Custom hooks
import { useOrderDocumentsList } from "@/pages/OrderDocuments//hooks/useOrderDocuments"
//Components
import DocumentsTable from "@/pages/OrderDocuments/components/DocumentsTable"
import DocumentsSearch from "@/pages/OrderDocuments/components/DocumentsSearch"
import DocumentsForm from "@/pages/OrderDocuments/components/DocumentsForm"
//Models
import { OrderDocument } from "@/models/OrderDocuments.model"
import DocumentTypeGestor from "@/models/DocumentTypes.model"
import { useDocumentsModalsState } from "./hooks/useDocumentsModals"


export interface documentForm extends Pick<OrderDocument, 'DocumentType' | 'Id' >{
    SearchedDescription: string,
    File: File | undefined
}

const DocumentsSection = () => {

    const initialDocumentFormState: documentForm = {
        Id: 0,
        DocumentType: DocumentTypeGestor.GetEmpty(),
        SearchedDescription: '',
        File: undefined
    }

    const orderDocumentsListState = useOrderDocumentsList()
    const documentModalsState = useDocumentsModalsState()
    

    const DocumentsState: DocumentsState = {
        orderDocumentsListState: orderDocumentsListState,
        documentsModals: documentModalsState
    }

    const formMethods = useForm<documentForm>( {defaultValues: initialDocumentFormState} )

    return (
        <DocumentsContext.Provider value={DocumentsState}>
            <FormProvider {...formMethods}>
                <DocumentsTable />
                <DocumentsForm/>
                <DocumentsSearch />
            </FormProvider>
        </DocumentsContext.Provider>
    )
}

export default DocumentsSection