import { useFormContext } from "react-hook-form"
import { FormGroup, Label, /*Card, CardHeader, CardBody,*/ Alert, Button, Table } from "reactstrap"
import { formValues } from "./ReceptionForm"
import { useReceptionContext } from "../context/ReceptionContext"
import ContactGestor, { Contact } from "@/models/Contacts.model"
import useModal from "@/hooks/useModal.hook"
import VehicleContactGestor from "@/models/VehicleContacts.model"
import ContactSearchForm from "@/components/ContactSearchForm"
import ContactForm from "@/components/ContactForm"
import useCrud from "@/hooks/useCrud.hook"

const ContactSection = () => {

    const { setValue, register} = useFormContext<formValues>()

    const { selectVehicle: {vehicle, exists}, 
        assignedContactsState: {contacts, isFoundAssignedContacts, changeAssignedContacts, notFoundAssignedContacts, foundAssignedContacts},
        selectedContactState} = useReceptionContext()
    const contactSearchModal = useModal()
    const contactRegisterModal = useModal()
    const crudContact = useCrud()
    const receptionForm = useFormContext<formValues>()

    const { change} = selectedContactState


    const handleSelectContact = (contact: Contact) => {
        change(contact)
        setValue('Contact', contact)
    }

    const handleSearch = () => {
        contactSearchModal.toggleModal()
    }

    const handleUnassignContact = async (contact: Contact) => {
        const confirm = window.confirm(`Se va desasignar el contacto ${contact.FullName} del vehículo ${vehicle.Plate}, ¿esta seguro que desea continuar?`)
        if (confirm) {
            try {
                const VehicleContact = VehicleContactGestor.Construct( contact.Identification, vehicle.Plate)
                const response = await VehicleContactGestor.Delete(VehicleContact)
                const newList = await VehicleContactGestor.ListContactsByVehiclePlate(vehicle.Plate)
                changeAssignedContacts(newList)
                if (newList.length === 0) notFoundAssignedContacts()
                window.alert(response)
                if (selectedContactState.selectContact.Identification === contact.Identification) {
                    setValue('Contact', ContactGestor.Construct('','','','',''))
                    selectedContactState.setToEmpty()
                }
            } catch (error) {
                window.alert(error)
            }
        }
    }

    const handleEditContact = (selectContact: Contact) => {
        change(selectContact)
        crudContact.setToUpdate()
        contactRegisterModal.toggleModal()
    }

    const handleCreateContact = () => {
        setValue('Contact', ContactGestor.Construct('','','','',''))
        selectedContactState.setToEmpty()
        crudContact.setToCreate()
        contactRegisterModal.toggleModal()
    }


    const handleAssignContact = async (contact: Contact) => {
        const confirm = window.confirm(`Se va sasignar el contacto ${contact.FullName} al vehículo ${vehicle.Plate}, ¿esta seguro que desea continuar?`)
        if (confirm) {
            try {
                const VehicleContact = VehicleContactGestor.Construct( contact.Identification, vehicle.Plate)
                const response = await VehicleContactGestor.Create(VehicleContact)
                const newList = await VehicleContactGestor.ListContactsByVehiclePlate(vehicle.Plate)
                changeAssignedContacts(newList)
                foundAssignedContacts()
                change(contact)
                contactSearchModal.toggleModal()
                receptionForm.setValue('Contact',contact)
                window.alert(response)
            } catch (error) {
                window.alert(error)
            }
        }
    }

    const saveContactForm = async (contact: Contact) => {
        try {
            const {isCreating} = crudContact
            let response
            if (isCreating) {
                const vehicleContact = VehicleContactGestor.Construct(contact.Identification, vehicle.Plate)
                response = await VehicleContactGestor.Create(vehicleContact)
                window.alert(response)
            }
            receptionForm.setValue('Contact',contact)
            const newList = await VehicleContactGestor.ListContactsByVehiclePlate(vehicle.Plate)
            changeAssignedContacts(newList)
            foundAssignedContacts()
            change(contact)
            //SelectContact()
        } catch (error) {
            window.alert(error)
        }
    }

    return (
        <>
            <legend>Información de contacto</legend>
            {exists &&
            <>
                <Alert color={isFoundAssignedContacts ? 'success' : 'warning'}>
                    {isFoundAssignedContacts &&
                        <>
                            <Label>Se encontraron contactos asignados a la placa {vehicle.Plate}</Label>
                        </>
                    }
                    {!isFoundAssignedContacts &&
                        <>
                            <Label>No se encontraron contactos asignados a la placa {vehicle.Plate}</Label>
                            <br />
                        </>

                    }
                    
                </Alert>
                <Button color="primary" onClick={handleSearch}>Buscar</Button>{' '}
                <Button color="secondary" onClick={handleCreateContact}>Crear</Button>
                <br /><br />
            </>
            }
            {(isFoundAssignedContacts) &&
                <Table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Documento</th>
                            <th>Telefono</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map( (c) => {
                                return(
                                    <tr key={c.Identification}>
                                        <td>{c.FullName}</td>
                                        <td>{c.Identification}</td>
                                        <td>{c.ContactNumber}</td>
                                        <td>
                                            <Button color="primary" onClick={() => handleSelectContact(c)} >Seleccionar</Button>
                                            <span> </span>
                                            <Button color="warning" onClick={() => handleEditContact(c)}>Editar</Button>
                                            <span> </span>
                                            <Button color='danger' onClick={() => handleUnassignContact(c)}>Desasignar</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            }
            
            <FormGroup>
                <Label>Nombre</Label>
                <input className="form-control" {...register('Contact.FullName')} 
                    disabled={true} 
                    name="Contact.FullName" />
            </FormGroup>
            <FormGroup>
                <Label>Documento</Label>
                <input className="form-control" {...register('Contact.Identification')}
                    disabled={true} 
                    name='Contact.Identification' />
            </FormGroup>
            <FormGroup>
                <Label>Telefono</Label>
                <input className="form-control" {...register('Contact.ContactNumber')}
                    disabled={true} 
                    name="Contact.ContactNumber" />
            </FormGroup>
            <ContactSearchForm
                Modal={contactSearchModal}
                SelectContact={selectedContactState}
                onSelectCallback={handleAssignContact}
                />
            <ContactForm
                ModalGestor = {contactRegisterModal}
                Crud={crudContact}
                SelectContact={selectedContactState}
                OnSaveCallback={saveContactForm}
            />
            
        </>
    )
}

export default ContactSection