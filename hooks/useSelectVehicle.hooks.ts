import VehicleGestor, { Vehicle } from "@/models/Vehicles.model"
import { useState } from "react"

export interface SelectVehicleState {
    vehicle: Vehicle,
    change: (newVehicle: Vehicle) => void,
    setToEmpty: () => void,
    exists: boolean,
    setToExists: () => void,
    setToNotExists: () => void
}

export const useSelectVehicle = () => {
    const emptyVehicle = VehicleGestor.GetEmpty()
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(emptyVehicle)
    const [exists, setExists] = useState<boolean>(false)

    const change = (newVehicle: Vehicle) => {
        setSelectedVehicle(newVehicle)
    }

    const setToEmpty = () => {
        setSelectedVehicle(emptyVehicle)
    }

    const setToNotExists = () => {
        setExists(false)
    }
    const setToExists = () => {
        setExists(true)
    }
    
    const selectedVehicleState: SelectVehicleState = {
        vehicle: selectedVehicle,
        change: change,
        setToEmpty: setToEmpty,
        exists: exists,
        setToExists: setToExists,
        setToNotExists: setToNotExists
    }
    return selectedVehicleState

}