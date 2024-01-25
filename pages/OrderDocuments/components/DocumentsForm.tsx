
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Button } from "reactstrap"
import { useDocumentsContext } from "../context/DocumentsContext"
import { documentForm } from "../OrderDocumentsPage"
import { useFormContext } from "react-hook-form"
import OrderDocumentGestor from "@/models/OrderDocuments.model"
import { useOrderContext } from "@/pages/Order/context/OrderContext"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import InputFileControl from "@/components/InputFileControl"

const DocumentsForm: React.FC = () => {
    
    const {documentsModals: {formWindow, searchWindow, crud, 
        searchedDocuments: {clearList}}, 
        orderDocumentsListState: {refreshList}} = useDocumentsContext()
        
    const {isModalVisible, toggleModal} = formWindow
    const { isCreating, isUpdating } = crud
    const { register, handleSubmit, reset, control } = useFormContext<documentForm>()
    const {orderState: { order: {OrderDocument, OrderNumber}}} = useOrderContext()
    const user = useSelector((state: RootState) => state.userReducer.User)

    const save = async (data: documentForm) => {
        try {
            const {File} = data
            if (OrderNumber === undefined) throw("Numero de documento indefinido no es posible ingresar")
            if (File === undefined) throw("Numero de documento indefinido no es posible ingresar")

            const {Id, DocumentType } = data
            if (user === null) throw("Usuario indefinido")
            const orderDocument = OrderDocumentGestor.Construct(OrderDocument, OrderNumber, DocumentType, File, Id)
            let response
            
            if (isCreating) {response = await OrderDocumentGestor.Create(orderDocument, user)}
            if (isUpdating) {
                if (Id === undefined) throw("Error no es posible actualizar el documento si el Id no esta definido.") 
                response = await OrderDocumentGestor.Update(orderDocument , user)
            }
            
            window.alert(response)
            formWindow.toggleModal()
            refreshList(OrderDocument, OrderNumber)
            clearList()
            reset()
        } catch (error) {
            window.alert(error)
        }
    }

    const handleSearchButton = () => {
        formWindow.toggleModal()
        searchWindow.toggleModal()
        reset()
    }

    const handleCancel = () => {
        crud.setToNone()
        toggleModal()
        reset()
        clearList()
    }

    return (
        <Modal isOpen={isModalVisible} toggle={handleCancel}>
            <ModalHeader toggle={handleCancel}>
                {isCreating && 'Agregar '}
                {isUpdating && 'Modificar '} 
                Documento</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Codigo</Label>
                        <input className="form-control" {...register('DocumentType.Code')} disabled={true} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Descripción</Label>
                        <input className="form-control" {...register('DocumentType.Description')} disabled={true}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Archivo</Label>
                        <InputFileControl name='File' control={control} acceptedfiles=".jpeg, .jpg, .png, .pdf" />
                    </FormGroup>
                </Form>
                {
                    isCreating &&
                    <Button color="primary" onClick={handleSearchButton}>Buscar</Button>
                }
                
                <br /><br />
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={handleCancel}>Cancelar</Button>
                <Button color="primary" onClick={handleSubmit(save)}>Guardar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default DocumentsForm