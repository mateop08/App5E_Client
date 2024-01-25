import BulkProductOutGestor, { BulkProductOut } from "@/models/BulkProductOuts.model"
import { useState } from "react"

export interface SelectBulkProductOutState {
    selectBulkProductOut: BulkProductOut,
    change: (newBulkProductOut: BulkProductOut) => void,
    setToEmpty: () => void
}

export const useSelectBulkProductOut = () => {
    const emptyBulkProductOut = BulkProductOutGestor.GetEmpty()
    const [selectedBulkProductOut, setSelectedBulkProductOut] = useState<BulkProductOut>(emptyBulkProductOut)

    const change = (newBulkProductOut: BulkProductOut) => {
        setSelectedBulkProductOut(newBulkProductOut)
    }

    const setToEmpty = () => {
        setSelectedBulkProductOut(emptyBulkProductOut)
    }
    
    const selectedBulkProductOutState: SelectBulkProductOutState = {
        selectBulkProductOut: selectedBulkProductOut,
        change: change,
        setToEmpty: setToEmpty
    }
    return selectedBulkProductOutState

}