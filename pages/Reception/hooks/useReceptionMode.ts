
import { useState } from "react"

type Modes = 'plate' | 'membership'

export interface ReceptionMode {
    CurrentMode: Modes,
    changeModeToPlate: () => void,
    changeModeToMembership: () =>  void,
    isPlateMode: boolean,
    isMembershipMode: boolean
}

export const useReceptionMode = () => {
    const [CurrentMode, setReceptionMode] = useState<Modes>('plate')

    const changeModeToPlate = () => {
        setReceptionMode('plate')
    }
    
    const changeModeToMembership = () => {
        setReceptionMode('membership')
    }

    const isPlateMode: boolean = (CurrentMode === 'plate') ? true : false
    const isMembershipMode: boolean = (CurrentMode === 'membership') ? true : false

    const receptionMode: ReceptionMode = {
        CurrentMode: CurrentMode,
        changeModeToPlate: changeModeToPlate,
        changeModeToMembership: changeModeToMembership,
        isPlateMode: isPlateMode,
        isMembershipMode: isMembershipMode
    }

    
    return receptionMode
}