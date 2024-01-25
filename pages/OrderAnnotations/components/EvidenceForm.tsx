
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Button } from "reactstrap"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import InputFileControl from "@/components/InputFileControl"
import { useAnnotationsContext } from "../context/AnnotationsContext"
import { useOrderContext } from "@/pages/Order/context/OrderContext"
import OrderAnnotationDetailGestor from "@/models/OrderAnnotationDetails.model"
import { useEffect } from "react"


interface evidenceForm {
    AnnotationId: number,
    EvidenceId: number,
    File: File | undefined,
    Note: string
}

const EvidenceForm: React.FC = () => {
    
    const initialState: evidenceForm = {
        AnnotationId: 0,
        EvidenceId: 0,
        File: undefined,
        Note: ''
    }
    const {evidencesModals: { formWindow, crud}, selectEvidence, selectAnnotation, orderAnnotationsListState: {refreshList}} = useAnnotationsContext()
    const { isModalVisible, toggleModal } = formWindow
    const { isCreating, isUpdating } = crud
    const { register, handleSubmit, reset, control, setValue } = useForm<evidenceForm>({defaultValues: initialState})
    const user = useSelector((state: RootState) => state.userReducer.User)
    const {orderState: { order: {OrderDocument, OrderNumber}}} = useOrderContext()

    const save = async (data: evidenceForm) => {
        console.log(data)
        try {
            const {EvidenceId, AnnotationId, File, Note, } = data
            
            if (OrderNumber === undefined) throw("Numero de documento indefinido no es posible ingresar")
            if (File === undefined) throw("Numero de documento indefinido no es posible ingresar")
            if (user === null) throw("Usuario indefinido")

            const evidence = OrderAnnotationDetailGestor.Construct(AnnotationId, Note, File, EvidenceId)
            let response
            
            if (isCreating) {response = await OrderAnnotationDetailGestor.Create(evidence, OrderDocument, OrderNumber, user)}
            if (isUpdating) {
                if (EvidenceId === undefined) throw("Error no es posible actualizar la evidencia si el EvidenceId no esta definido.") 
                response = await OrderAnnotationDetailGestor.Update(evidence, OrderDocument, OrderNumber, user)
            }
            window.alert(response)
            formWindow.toggleModal()
            refreshList(OrderDocument, OrderNumber)
            reset()
        } catch (error) {
              window.alert(error)
        }
    }

    const handleCancel = () => {
        crud.setToNone()
        selectAnnotation.empty()
        selectEvidence.setToEmpty()
        toggleModal()
        reset()
    }

    useEffect(() =>{
        const { evidence: {EvidenceId, Note} } = selectEvidence
        const { annotationId } = selectAnnotation
        setValue('AnnotationId', annotationId)
        if (EvidenceId !== undefined) {
            setValue('EvidenceId', EvidenceId)
            setValue('Note', Note)
        }
    // eslint-disable-next-line
    },[selectEvidence, selectAnnotation])

    //console.log(watch())
    
    return (
        <Modal isOpen={isModalVisible} toggle={handleCancel}>
            <ModalHeader toggle={handleCancel}>
                {isCreating && 'Agregar '}
                {isUpdating && 'Modificar '} 
                Evidencia</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Archivo</Label>
                        <InputFileControl name='File' control={control} acceptedfiles=".jpeg, .jpg, .png, .pdf, .aac, .mp3, .mp4, .mpeg" />
                    </FormGroup>
                    <FormGroup>
                        <Label>Nota</Label>
                        <textarea className="form-control" {...register('Note')} />
                    </FormGroup>
                </Form>
                <br /><br />
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit(save)}>Guardar</Button>
                <Button color="secondary" onClick={handleCancel}>Cancelar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default EvidenceForm