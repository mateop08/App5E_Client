import { FormProvider, useForm } from "react-hook-form"
//Context
import { AnnotationsContext, AnnotationsState } from "@/pages/OrderAnnotations/context/AnnotationsContext"
//Custom hooks
import { useOrderAnnotationsList } from "@/pages/OrderAnnotations//hooks/useOrderAnnotations"
//Components
import AnnotationsTable from "@/pages/OrderAnnotations/components/AnnotationsTable"
import AnnotationsSearch from "@/pages/OrderAnnotations/components/AnnotationsSearch"
import AnnotationsForm from "@/pages/OrderAnnotations/components/AnnotationsForm"
import EvidenceForm from "./components/EvidenceForm"
//Models
import { OrderAnnotation } from "@/models/OrderAnnotations.model"
import AnnotationTypeGestor from "@/models/AnnotationTypes.model"
import { useAnnotationsModalsState } from "./hooks/useAnnotationsModals"
import TechnicianGestor from "@/models/Technicians.model"
import { useEvidencesModalsState } from "./hooks/useEvidenceModals"
import { useSelectEvidence } from "./hooks/useSelectedEvidence"
import useSelectAnnotion from "./hooks/useSelectAnnotation"


export interface annotationForm extends Pick<OrderAnnotation, 'AnnotationType' | 'Id' | 'Technician' | 'Note'>{
    SearchedDescription: string
}

const AnnotationsSection = () => {

    const initialAnnotationFormState: annotationForm = {
        Id: 0,
        AnnotationType: AnnotationTypeGestor.GetEmpty(),
        SearchedDescription: '',
        Technician: TechnicianGestor.GetEmpty(),
        Note: ''
    }

    const orderAnnotationsListState = useOrderAnnotationsList()
    const annotationModalsState = useAnnotationsModalsState()
    const evidenceModalsState = useEvidencesModalsState()
    const selectEvidence = useSelectEvidence()
    const selectAnnotation = useSelectAnnotion()

    const AnnotationsState: AnnotationsState = {
        orderAnnotationsListState: orderAnnotationsListState,
        annotationsModals: annotationModalsState,
        evidencesModals: evidenceModalsState,
        selectEvidence: selectEvidence,
        selectAnnotation: selectAnnotation
    }

    const formMethods = useForm<annotationForm>( {defaultValues: initialAnnotationFormState} )

    return (
        <AnnotationsContext.Provider value={AnnotationsState}>
            <FormProvider {...formMethods}>
                <AnnotationsTable />
                <AnnotationsForm/>
                <AnnotationsSearch />
                <EvidenceForm />
            </FormProvider>
        </AnnotationsContext.Provider>
    )
}

export default AnnotationsSection