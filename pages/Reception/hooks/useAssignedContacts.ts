import { Contact } from "@/models/Contacts.model"
import { useState } from "react"

export interface AssignedContactsState {
    contacts: Contact[],
    changeToEmpty: () => void,
    changeAssignedContacts: (newContacts: Contact[]) => void,
    isFoundAssignedContacts: boolean,
    foundAssignedContacts: () => void,
    notFoundAssignedContacts: () => void
}

export const useAssignedContacts = () => {

    const emptyAssignedContacts: Contact[] = []
    const [assignedContacts, setAssignedContacts] = useState<Contact[]>(emptyAssignedContacts)
    const [isFoundAssignedContacts, setIsFoundAssignedContacts] = useState<boolean>(false)

    const changeToEmpty = () => {
        setAssignedContacts(emptyAssignedContacts)
        setIsFoundAssignedContacts(false)
    }

    const changeAssignedContacts = (newAssignedContacts: Contact[]) => {
        setAssignedContacts(newAssignedContacts)
    }

    const foundAssignedContacts = () => {
        setIsFoundAssignedContacts(true)
    }

    const notFoundAssignedContacts = () => {
        setIsFoundAssignedContacts(false)
    }

    const assignedContactsState: AssignedContactsState = {
        contacts: assignedContacts,
        changeToEmpty: changeToEmpty,
        changeAssignedContacts: changeAssignedContacts,
        isFoundAssignedContacts: isFoundAssignedContacts,
        foundAssignedContacts: foundAssignedContacts,
        notFoundAssignedContacts: notFoundAssignedContacts
    }

    return assignedContactsState
}