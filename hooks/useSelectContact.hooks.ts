import ContactGestor, { Contact } from "@/models/Contacts.model"
import { useState } from "react"

export interface SelectContactState {
    selectContact: Contact,
    change: (newContact: Contact) => void,
    setToEmpty: () => void
}

export const useSelectContact = () => {
    const emptyContact = ContactGestor.GetEmpty()
    const [selectedContact, setSelectedContact] = useState<Contact>(emptyContact)

    const change = (newContact: Contact) => {
        setSelectedContact(newContact)
    }

    const setToEmpty = () => {
        setSelectedContact(emptyContact)
    }
    
    const selectedContactState: SelectContactState = {
        selectContact: selectedContact,
        change: change,
        setToEmpty: setToEmpty
    }
    return selectedContactState

}