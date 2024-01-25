import { CreateAnnotationType, UpdateAnnotationTypeByCode, ListAnnotationTypesByDescription, DeleteAnnotationTypeByCode, ListAllAnnotationTypes } 
from "@/api/AnnotationTypes.api"

export interface AnnotationType {
    Code: string,
    Description: string
}

const AnnotationTypeGestor = {
    Construct: (Code: string, Description: string) => {
        const annotationType: AnnotationType = {
            Code: Code,
            Description: Description
        }
        return annotationType
    },

    GetEmpty() {
        return this.Construct('','')
    },
    Create: async (AnnotationType: AnnotationType) => {
        const {Code, Description} = AnnotationType
        const response = await CreateAnnotationType(Code, Description)
        return response
    },
    ListAll: async () => {
        const data = await ListAllAnnotationTypes() as AnnotationType[]
        return data
    },
    List: async (Description: string) => {
        const data = await ListAnnotationTypesByDescription(Description) as AnnotationType[]
        return data
    },
    Update: async (AnnotationType: AnnotationType) => {
        const {Code, Description} = AnnotationType
        const response = await UpdateAnnotationTypeByCode(Code, Description)
        return response
    },
    Delete: async (AnnotationType: AnnotationType) => {
        const { Code } = AnnotationType
        const response = DeleteAnnotationTypeByCode(Code)
        return response
    }
}

export default AnnotationTypeGestor