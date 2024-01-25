import ContactGestor, { Contact } from "@/models/Contacts.model"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Table } from "reactstrap"
import { ModalGestor } from "@/hooks/useModal.hook"
import { SelectContactState } from "@/hooks/useSelectContact.hooks"

interface ContactSearchForm {
    Modal: ModalGestor,
    SelectContact: SelectContactState,
    onSelectCallback: (contact: Contact) => void
}

interface SearchContactForm {
    FullName: string
}

const ContactSearchForm: React.FC<ContactSearchForm> = (props) => {

    const { Modal: {isModalVisible, toggleModal}, SelectContact: {change, setToEmpty}, onSelectCallback } = props
    const { handleSubmit, register } = useForm<SearchContactForm>()
    const [ searchedContacts, setSearchedContacts ] = useState<Contact[]>([])

    const search = async (data: SearchContactForm) => {
        setSearchedContacts([])
        let newList: Contact[] = []
        try {
            if (data.FullName === '') newList = await ContactGestor.ListAll()
            else newList = await ContactGestor.List(data.FullName)
            setSearchedContacts(newList)
        } catch (error) {
            window.alert(error)
        }
        
    }

    const handleSelectContact = async (contact: Contact) => {
        change(contact)
        onSelectCallback(contact)
        toggleModal()
    }

    const cancel = () => {
        setSearchedContacts([])
        setToEmpty()
        toggleModal()
    }

    return(
        <Modal isOpen={isModalVisible} toggle={cancel}>
            <ModalHeader toggle={cancel}>Buscar contacto</ModalHeader>
            <ModalBody>
                <input className="form-control" {...register('FullName')} name='FullName'/>
                <br />
                <Button color="primary" onClick={handleSubmit(search)}>Buscar</Button>
                <br /><br />
                <Table>
                    <thead>
                        <tr>
                            <th>Documento</th>
                            <th>Nombre</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            searchedContacts.map((contact) => {
                                return (
                                    <tr key={contact.Identification}>
                                        <td>{contact.Identification}</td>
                                        <td>{contact.FullName}</td>
                                        <td><Button color="primary" onClick={ () => {handleSelectContact(contact)}}>Asignar</Button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={cancel}>
                Cancelar
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default ContactSearchForm