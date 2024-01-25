import { CreateDocumentType, UpdateDocumentTypeByCode, ListDocumentTypesByDescription, DeleteDocumentTypeByCode, ListAllDocumentTypes } 
from "@/api/DocumentTypes.api"

export interface DocumentType {
    Code: string,
    Description: string
}

export const DocumentTypeGestor = {
    Construct: (Code: string, Description: string) => {
        const DocumentType: DocumentType = {
            Code: Code,
            Description: Description
        }
        return DocumentType
    },

    GetEmpty () {
        return this.Construct('','')
    },
    
    Create: async (DocumentType: DocumentType) => {
        const {Code, Description} = DocumentType
        const response = await CreateDocumentType(Code, Description)
        return response
    },
    ListAll: async () => {
        const data = await ListAllDocumentTypes() as DocumentType[]
        return data
    },
    List: async (Description: string) => {
        const data = await ListDocumentTypesByDescription(Description) as DocumentType[]
        return data
    },
    Update: async (DocumentType: DocumentType) => {
        const {Code, Description} = DocumentType
        const response = await UpdateDocumentTypeByCode(Code, Description)
        return response
    },
    Delete: async (DocumentType: DocumentType) => {
        const { Code } = DocumentType
        const response = DeleteDocumentTypeByCode(Code)
        return response
    }
}

export default DocumentTypeGestor