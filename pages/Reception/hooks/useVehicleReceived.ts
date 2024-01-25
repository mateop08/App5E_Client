import { useState } from "react"
import VehicleGestor, {Vehicle} from "@/models/Vehicles.model"

export interface VehicleState {
    vehicle: Vehicle,
    changeToEmpty: () => void,
    changeVehicle: (newVehicle: Vehicle) => void,
    isFoundVehicle: boolean,
    foundVehicle: () => void,
    notFoundVehicle: () => void
}

export const useVehicleReceived = () => {
    const emptyVehicle = VehicleGestor.Construct('','',0,0,0,0,'')
    const [vehicle, setVehicle] = useState<Vehicle>(emptyVehicle)
    const [isFoundVehicle, setIsFoundVehicle] = useState<boolean>(false)

    const changeToEmpty = () => {
        setVehicle(vehicle)
        setIsFoundVehicle(false)
    }

    const changeVehicle = (newVehicle: Vehicle) => {
        setVehicle(newVehicle)
    }

    const foundVehicle = () => {
        setIsFoundVehicle(true)
    }

    const notFoundVehicle = () => {
        setIsFoundVehicle(false)
    }

    const vehicleState: VehicleState = {
        vehicle: vehicle,
        changeToEmpty: changeToEmpty,
        changeVehicle: changeVehicle,
        isFoundVehicle: isFoundVehicle,
        foundVehicle: foundVehicle,
        notFoundVehicle: notFoundVehicle
    }

    return vehicleState
}