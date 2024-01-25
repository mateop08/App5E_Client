import AnnotationTypeGestor, { AnnotationType } from "@/models/AnnotationTypes.model"

export const useCreateAnnotationType = () => {

    const createAnnotationType = async (AnnotationType: AnnotationType) => {
        await AnnotationTypeGestor.Create(AnnotationType)
    }

    return (createAnnotationType)
}