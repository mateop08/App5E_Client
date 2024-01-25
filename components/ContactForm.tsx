import { Modal, ModalHeader, ModalBody, Button, ModalFooter, Form, FormGroup, Label } from "reactstrap"
import { useForm } from "react-hook-form"
import ContactGestor, { Contact } from "@/models/Contacts.model"
import { useEffect } from "react"
import { ModalGestor } from "@/hooks/useModal.hook"
import { Crud } from "@/hooks/useCrud.hook"
import { SelectContactState } from "@/hooks/useSelectContact.hooks"
import UpperCaseInputControl from "./UpperCaseInputControl"

interface ContactForm {
    ModalGestor: ModalGestor,
    Crud: Crud,
    SelectContact: SelectContactState,
    OnSaveCallback: (contact: Contact) => void
}

const ContactForm: React.FC<ContactForm> = (props) => {
    const {ModalGestor: {isModalVisible, toggleModal}, 
        Crud: {isCreating, isUpdating, setToNone},
        SelectContact: {selectContact, setToEmpty, change},
        OnSaveCallback} = props

    const emptyContact = ContactGestor.GetEmpty()
    const {register, setValue, handleSubmit, reset, control} = useForm<Contact>( {defaultValues: emptyContact} )

    useEffect(() => {
        setValue('Identification',selectContact.Identification)
        setValue('FullName',selectContact.FullName)
        setValue('ContactNumber',selectContact.ContactNumber)
        setValue('Email',selectContact.Email)
        setValue('Address',selectContact.Address)
    },[setValue, selectContact])

    const save = async (data: Contact) => {
        try {
            let response
            if (isCreating) response = await ContactGestor.Create(data)
            if (isUpdating) response = await ContactGestor.Update(data)
            window.alert(response)
            change(data)
            OnSaveCallback(data)
            reset(emptyContact)
            toggleModal()
            setToNone()
        } catch (error) {
            window.alert(error)
        }
    }

    const cancel = () => {
        reset()
        toggleModal()
        setToNone()
        setToEmpty()
        
    }

    return (
        <Modal isOpen={isModalVisible} toggle={cancel}>
            <ModalHeader toggle={cancel}>
                {isCreating && 'Crear '}
                {isUpdating && 'Modificar '} 
                contacto</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Identificacion</Label>
                        <input className="form-control" {...register('Identification')} disabled={isUpdating} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Nombre completo</Label>
                        <UpperCaseInputControl 
                            control={control} 
                            name="FullName"
                            rules={
                                {required: {
                                    value: true,
                                    message: "Nombre requerido"
                                }}
                            }
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Numero de contacto</Label>
                        <input className="form-control" {...register('ContactNumber')} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Correo</Label>
                        <input className="form-control" {...register('Email')} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Dirección</Label>
                        <input className="form-control" {...register('Address')} />
                    </FormGroup>
                </Form>
                
                <br /><br />
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={cancel}>Cancelar</Button>
                <Button color="primary" onClick={handleSubmit(save)}>Guardar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ContactForm