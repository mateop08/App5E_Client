import { Table, Button } from "reactstrap"
import { useOrderContext } from "../context/OrderContext"
import { BsPencilFill, BsSearch, BsFillPlusCircleFill } from "react-icons/bs"
import ContactForm from "@/components/ContactForm"
import useModal from "@/hooks/useModal.hook"
import useCrud from "@/hooks/useCrud.hook"
import { useSelectContact } from "@/hooks/useSelectContact.hooks"
import ContactSearchForm from "@/components/ContactSearchForm"
import { Contact } from "@/models/Contacts.model"
import { useFormContext } from "react-hook-form"
import { orderForm } from "./OrderForm"

const ContactSection = () => {
    const { orderState: {order, change}, editingState } = useOrderContext()
    const { Contact } = order
    const ModalForm = useModal()
    const ModalSearch = useModal()
    const Crud = useCrud()
    const SelectContact = useSelectContact()
    const {setValue, register} = useFormContext<orderForm>()

    const addContactToForm = async (contact: Contact) => {
        const newOrder = order
        newOrder.Contact = contact
        setValue('Contact',contact)
        change(newOrder)
    }

    const openContactForm = (event: React.MouseEvent<HTMLElement>) => {
        const option = event.currentTarget.getAttribute('name')
        if (option === 'create') Crud.setToCreate()
        if (option === 'update') { 
            Crud.setToUpdate() 
            SelectContact.change(Contact) 
        }
        ModalForm.toggleModal()
    }

    const openSearchForm = () => {
        SelectContact.setToEmpty()
        ModalSearch.toggleModal()
    }

    return (
        <>
            <ContactForm 
                Crud={Crud}
                ModalGestor={ModalForm}
                SelectContact={SelectContact}
                OnSaveCallback={addContactToForm}
                />
            <ContactSearchForm 
                Modal={ModalSearch}
                SelectContact={SelectContact}
                onSelectCallback={addContactToForm}
                />
            <div className="table-responsive">
                <Table>
                <thead>
                        <tr>
                            <th>Cedula</th>
                            <th>Nombre</th>
                            <th>Telefono</th>
                        </tr>
                    </thead>
                    <tbody>
                        {editingState.active &&
                            <tr>
                                <td><input className="form-control" disabled={true} {...register('Contact.Identification')}/></td>
                                <td><input className="form-control" disabled={true} {...register('Contact.FullName')}/></td>
                                <td><input className="form-control" disabled={true} {...register('Contact.ContactNumber')}/></td>
                            </tr>
                        }
                        {!editingState.active &&
                            <tr>
                                <td>{Contact.Identification}</td>
                                <td>{Contact.FullName}</td>
                                <td>{Contact.ContactNumber}</td>
                            </tr>
                        }
                    </tbody>
                </Table>
                {editingState.active &&
                    <>
                        <Button color="primary" onClick={openSearchForm}>
                        <BsSearch/> Buscar
                        </Button>{' '}
                        <Button color="secondary" name='create' onClick={openContactForm}>
                            <BsFillPlusCircleFill/> Crear
                        </Button>{' '}
                        <Button color="warning" name='update' onClick={openContactForm}>
                            <BsPencilFill/> Editar
                        </Button>
                    </>
                }
                
            </div>
        </>
    )
}

export default ContactSection