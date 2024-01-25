import { useState } from "react"

export interface SelectAnnotationState {
    annotationId: number,
    change: (number: number) => void,
    empty: () => void
}

const useSelectAnnotion = () => {
    const [annotationId, setAnnotationId] = useState<number>(0)

    const change = (newAnnotationId: number) => {
        setAnnotationId(newAnnotationId)
    }

    const empty = () => {
        setAnnotationId(0)
    }

    const state: SelectAnnotationState = {
        annotationId: annotationId,
        change: change,
        empty: empty
    }

    return state
}

export default useSelectAnnotion