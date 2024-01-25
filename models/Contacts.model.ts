import { CreateContact, UpdateContactByIdentification, ListContactsByFullName, DeleteContactByIdentification, ListAllContacts } 
from "@/api/Contacts.api"

export interface Contact {
    Identification: string,
    FullName: string,
    ContactNumber: string,
    Email: string,
    Address: string
}

const ContactGestor = {
    Construct (Identification: string, FullName: string, ContactNumber: string, Email: string, Address: string) {
        const contact: Contact = {
            Identification: Identification,
            FullName: FullName,
            ContactNumber: ContactNumber,
            Email: Email,
            Address: Address
        }
        return contact
    },
    GetEmpty() {
        return this.Construct('','','','','')
    },
    async Create (Contact: Contact) {
        const {Identification, FullName, ContactNumber, Email, Address} = Contact
        const data = await CreateContact(Identification, FullName, ContactNumber, Email, Address)
        return data
    },
    async List (FullName: string) {
        const data = await ListContactsByFullName(FullName)
        return data
    },

    async ListAll () {
        const data = await ListAllContacts()
        return data
    },
    async Update (Contact: Contact) {
        const {Identification, FullName, ContactNumber, Email, Address} = Contact
        const data = await UpdateContactByIdentification(Identification, FullName, ContactNumber, Email, Address)
        return data
    },
    async Delete (Contact: Contact) {
        const { Identification } = Contact
        const response = DeleteContactByIdentification(Identification)
        return response
    }
}

export default ContactGestor