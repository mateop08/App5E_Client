import { createContext, useContext } from "react";
import { OrderAnnotationsListState } from "../hooks/useOrderAnnotations";
import { AnnotationsModalState } from "../hooks/useAnnotationsModals";
import { EvidencesModalState } from "../hooks/useEvidenceModals";
import { SelectEvidenceState } from "../hooks/useSelectedEvidence";
import OrderAnnotationDetailGestor from "@/models/OrderAnnotationDetails.model";
import { SelectAnnotationState } from "../hooks/useSelectAnnotation";

export interface AnnotationsState {
    orderAnnotationsListState: OrderAnnotationsListState,
    annotationsModals: AnnotationsModalState,
    evidencesModals: EvidencesModalState,
    selectEvidence: SelectEvidenceState,
    selectAnnotation: SelectAnnotationState
}

const initialAnnotationsServicesState: AnnotationsState = {
    orderAnnotationsListState: {
        changeList: () => {},
        changeToEmpy: () => {},
        refreshList: () => {},
        orderAnnotationsList: []
    },
    annotationsModals: {
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
        searchedAnnotations: {
            list: [],
            change: () => {},
            clearList: () => {}
        }
    },
    evidencesModals: {
        formWindow: {
            isModalVisible: false,
            toggleModal: () => {}
        },
        crud: {
            isCreating: false,
            isUpdating: false,
            setToCreate: () => {},
            setToUpdate: () => {},
            setToNone: () => {}
        } 
    },
    selectEvidence: {
        change: () => {},
        evidence: OrderAnnotationDetailGestor.GetEmpty(),
        setToEmpty: () => {}
    },
    selectAnnotation: {
        annotationId: 0,
        change: () => {},
        empty: () => {}
    }
}

export const AnnotationsContext = createContext<AnnotationsState>(initialAnnotationsServicesState)

export const useAnnotationsContext = () => useContext(AnnotationsContext)