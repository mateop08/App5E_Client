import { CreateAppDocument, UpdateAppDocumentByCode, ListAllAppDocuments, ListAppDocumentsByDescription, DeleteAppDocumentByCode } 
from "@/api/AppDocuments.api"

export interface AppDocument {
    Code: string,
    Description: string,
    Consecutive: number,
    Store: string,
    PriceCode: string,
    InventoryType: string,
    ServicesLine: string
}

const AppDocumentGestor = {
    Construct: (Code: string, Description: string, Consecutive: number, Store: string, PriceCode: string, 
        InventoryType: string, ServicesLine: string) => {

        const AppDocument: AppDocument = {
            Code: Code,
            Description: Description,
            Consecutive: Consecutive,
            Store: Store,
            PriceCode: PriceCode,
            InventoryType: InventoryType,
            ServicesLine: ServicesLine
        }
        return AppDocument
    },
    Create: async (AppDocument: AppDocument) => {
        const response = await CreateAppDocument(AppDocument)
        return response
    },
    ListAll: async () => {
        const data = await ListAllAppDocuments() as AppDocument[]
        return data
    },
    List: async (Description: string) => {
        const data = await ListAppDocumentsByDescription(Description) as AppDocument[]
        return data
    },
    Update: async (AppDocument: AppDocument) => {
        const response = await UpdateAppDocumentByCode(AppDocument)
        return response
    },
    Delete: async (AppDocument: AppDocument) => {
        const { Code } = AppDocument
        const response = DeleteAppDocumentByCode(Code)
        return response
    }
}

export default AppDocumentGestor