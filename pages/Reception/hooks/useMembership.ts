import { useState } from "react"
import VehicleMembershipGestor, { VehicleMembership } from "@/models/VehicleMemberships.model"

export interface MembershipState {
    membership: VehicleMembership,
    changeToEmpty: () => void,
    changeMembership: (newMembership: VehicleMembership) => void,
    isFoundMembership: boolean,
    foundMembership: () => void,
    notFoundMembership: () => void
}

export const useMembership = () => {
    const emptyMembership = VehicleMembershipGestor.Construct('','',0,false,'',new Date)
    const [membership, setMembership] = useState<VehicleMembership>(emptyMembership)
    const [isFoundMembership, setIsFoundMembership] = useState<boolean>(false)

    const changeToEmpty = () => {
        setMembership(membership)
        setIsFoundMembership(false)
    }

    const changeMembership = (newMembership: VehicleMembership) => {
        setMembership(newMembership)
    }

    const foundMembership = () => {
        setIsFoundMembership(true)
    }

    const notFoundMembership = () => {
        setIsFoundMembership(false)
    }

    const membershipState: MembershipState = {
        membership: membership,
        changeToEmpty: changeToEmpty,
        changeMembership: changeMembership,
        isFoundMembership: isFoundMembership,
        foundMembership: foundMembership,
        notFoundMembership: notFoundMembership
    }

    return membershipState
}