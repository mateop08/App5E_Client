
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Button, Input } from "reactstrap"
import { useAnnotationsContext } from "../context/AnnotationsContext"
import { annotationForm } from "../OrderAnnotationsPage"
import { useFormContext, Controller } from "react-hook-form"
import OrderAnnotationGestor from "@/models/OrderAnnotations.model"
import { useOrderContext } from "@/pages/Order/context/OrderContext"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import TechnicianGestor, {Technician} from "@/models/Technicians.model"
import { useState, useEffect } from "react"

const AnnotationsForm: React.FC = () => {
    
    const {annotationsModals: {formWindow, searchWindow, crud, searchedAnnotations: {clearList}}, orderAnnotationsListState: {refreshList}} = useAnnotationsContext()
    const {isModalVisible, toggleModal} = formWindow
    const { isCreating, isUpdating } = crud
    const { register, handleSubmit, reset, control } = useFormContext<annotationForm>()
    const {orderState: { order: {OrderDocument, OrderNumber}}} = useOrderContext()
    const user = useSelector((state: RootState) => state.userReducer.User)
    const [technicianList, setTechnicianList] = useState<Technician[]>([])

    const save = async (data: annotationForm) => {
        try {
            const {Id, AnnotationType, Technician, Note} = data

            if (OrderNumber === undefined) throw("Numero de documento indefinido no es posible ingresar")
            if (user === null) throw("Usuario indefinido")
            const orderAnnotation = OrderAnnotationGestor.Construct(OrderDocument, OrderNumber, AnnotationType, Technician, Note, Id)
            let response
            if (isCreating) response = await OrderAnnotationGestor.Create(orderAnnotation, user)

            if (isUpdating) {
                if (Id === undefined) throw("Error no es posible actualizar el annotationo si la cantidad no esta definida.") 
                response = await OrderAnnotationGestor.Update(orderAnnotation, user)
            }

            window.alert(response)
            console.log(response)
            formWindow.toggleModal()
            refreshList(OrderDocument, OrderNumber)
            reset()
        } catch (error) {
            window.alert(error)
            console.log(error)
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

    const loadTechnicians = () => {
        TechnicianGestor.ListAll()
            .then((data)=> setTechnicianList(data),
                (error) => window.alert(error))
    }

    useEffect(() => {
        loadTechnicians()
    },[])

    return (
        <Modal isOpen={isModalVisible} toggle={handleCancel}>
            <ModalHeader toggle={handleCancel}>
                {isCreating && 'Agregar '}
                {isUpdating && 'Modificar '} 
                Anotación</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Codigo</Label>
                        <input className="form-control" {...register('AnnotationType.Code')} disabled={true} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Descripción</Label>
                        <input className="form-control" {...register('AnnotationType.Description')} disabled={true}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Tecnico</Label>
                        <Controller
                            control={control}
                            name = 'Technician.Code'
                            rules = {{required: {
                                value: true,
                                message: 'Tecnico requerido'
                                }
                            }}
                            render= { ({field}) => {

                                return (
                                    <Input type="select" {...field} >
                                        <option disabled value=''> Seleccione una opción </option>
                                        {technicianList.map((t) =>  <option value={t.Code} key={t.Code}>{t.Description}</option>)}
                                    </Input>
                                )
                                }
                            }/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Nota</Label>
                        <textarea className="form-control" {...register('Note')} />
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

export default AnnotationsForm