import { Contact } from "@/models/Contacts.model"
import { useState } from "react"
import ContactGestor from "@/models/Contacts.model"


export interface SelectedContactState {
    contact: Contact,
    changeToEmpty: () => void,
    changeSelectedContact: (newContacts: Contact) => void,
    isSelectedContact: boolean,
    SelectContact: () => void,
    UnSelectContact: () => void
}

export const useSelectedContact = () => {

    const emptyContact = ContactGestor.Construct('','','','','')
    const [selectedContacts, setSelectedContact] = useState<Contact>(emptyContact)
    const [isSelectedContact, setIsSelectedContact] = useState<boolean>(false)
    
    const changeToEmpty = () => {
        setSelectedContact(emptyContact)
        setIsSelectedContact(false)
    }

    const changeSelectedContact = (newSelectedContact: Contact) => {
        setSelectedContact(newSelectedContact)
    }

    const SelectContact = () => {
        setIsSelectedContact(true)
    }

    const UnSelectContact = () => {
        setIsSelectedContact(false)
    }

    const selectedContactsState: SelectedContactState = {
        contact: selectedContacts,
        changeToEmpty: changeToEmpty,
        changeSelectedContact: changeSelectedContact,
        isSelectedContact: isSelectedContact,
        SelectContact: SelectContact,
        UnSelectContact: UnSelectContact
    }

    return selectedContactsState
}