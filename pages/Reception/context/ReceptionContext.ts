import { createContext, useContext } from "react"
import VehicleGestor from "@/models/Vehicles.model"
import { ReceptionMode } from "../hooks/useReceptionMode"
import { MembershipState } from "../hooks/useMembership"
import VehicleMembershipGestor from "@/models/VehicleMemberships.model"
import { AssignedContactsState } from "../hooks/useAssignedContacts"
import { SelectContactState } from "@/hooks/useSelectContact.hooks" 
import ContactGestor from "@/models/Contacts.model"
import { SelectVehicleState } from "@/hooks/useSelectVehicle.hooks"

export interface ReceptionState {
    receptionMode: ReceptionMode
    selectVehicle: SelectVehicleState
    membershipState: MembershipState
    assignedContactsState: AssignedContactsState
    selectedContactState: SelectContactState
}

const initialReceptionState: ReceptionState = {
    receptionMode: {
        CurrentMode: 'plate',
        changeModeToPlate: () => {},
        changeModeToMembership: () => {},
        isMembershipMode: false,
        isPlateMode: true
    },
    selectVehicle: {
        vehicle: VehicleGestor.Construct('','',0,0,0,0,''),
        change: () => {},
        setToEmpty: () => {},
        exists: false,
        setToExists: () => {},
        setToNotExists: () => {}
    },
    membershipState: {
        membership: VehicleMembershipGestor.Construct('','',0,false,'', new Date),
        changeToEmpty: () => {},
        changeMembership: () => {},
        isFoundMembership: false,
        foundMembership: () => {},
        notFoundMembership: () => {}
    },
    assignedContactsState: {
        contacts: [],
        changeToEmpty: () => {},
        changeAssignedContacts: () => {},
        isFoundAssignedContacts: false,
        foundAssignedContacts: () => {},
        notFoundAssignedContacts: () => {}
    },
    selectedContactState: {
        selectContact: ContactGestor.Construct('','','','',''),
        change: () => {},
        setToEmpty: () => {}
    }
}

export const ReceptionContext = createContext<ReceptionState>(initialReceptionState)

export const useReceptionContext = () => useContext(ReceptionContext)
