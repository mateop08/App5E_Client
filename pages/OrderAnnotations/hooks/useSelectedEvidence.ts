import EvidenceGestor, { OrderAnnotationDetail } from "@/models/OrderAnnotationDetails.model"
import { useState } from "react"

export interface SelectEvidenceState {
    evidence: OrderAnnotationDetail,
    change: (newEvidence: OrderAnnotationDetail) => void,
    setToEmpty: () => void
}

export const useSelectEvidence = () => {
    const emptyEvidence = EvidenceGestor.GetEmpty()
    const [evidence, setSelectedEvidence] = useState<OrderAnnotationDetail>(emptyEvidence)

    const change = (newEvidence: OrderAnnotationDetail) => {
        setSelectedEvidence(newEvidence)
    }

    const setToEmpty = () => {
        setSelectedEvidence(emptyEvidence)
    }
    
    const selectedEvidenceState: SelectEvidenceState = {
        evidence: evidence,
        change: change,
        setToEmpty: setToEmpty
    }
    return selectedEvidenceState

}