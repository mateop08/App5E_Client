
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Button, Input } from "reactstrap"
import { useServicesContext } from "../context/ServicesContext"
import { serviceForm } from "./ServicesSection"
import { useFormContext, Controller } from "react-hook-form"
import OrderServiceGestor from "@/models/OrderServices.model"
import { useOrderContext } from "@/pages/Order/context/OrderContext"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useEffect, useState } from "react"
import TechnicianGestor, { Technician } from "@/models/Technicians.model"
import FormError from "@/components/FormError"

const ServicesForm: React.FC = () => {


    const {servicesModals: {formWindow, searchWindow, crud, searchedServices: {clearList}}, orderServicesListState: {refreshList}} = useServicesContext()
    const {isModalVisible, toggleModal} = formWindow
    const { isCreating, isUpdating } = crud
    const { register, handleSubmit, reset, control, watch, setValue, formState: {errors} } = useFormContext<serviceForm>()
    const {orderState: { order: {OrderDocument, OrderNumber}}} = useOrderContext()
    const user = useSelector((state: RootState) => state.userReducer.User)
    const [technicianList, setTechnicinList] = useState<Technician[]>([])

    const save = async (data: serviceForm) => {
        const {Id, Service, Amount, Technician, Note} = data
        try {
            if (OrderNumber === undefined) throw("Numero de documento indefinido no es posible ingresar")
            if (Amount === null) throw("Cantidad indefinida no es posible ingresar") 
            if (user === null) throw("Usuario indefinido")

            const orderService = OrderServiceGestor.Construct(OrderDocument, OrderNumber, Service, Amount, Technician, Note, Id)
            let response
            if (isCreating) response = await OrderServiceGestor.Create(orderService, user)
            if (isUpdating) {
                if (Id === undefined) throw("Error no es posible actualizar el serviceo si la cantidad no esta definida.") 
                response = await OrderServiceGestor.Update(orderService , user)
            }
            window.alert(response)
            formWindow.toggleModal()
            refreshList(OrderDocument, OrderNumber)
            reset()
        } catch (error) {
            window.alert(error)
        }
        
    }

    const handleSearchButton = () => {
        formWindow.toggleModal()
        searchWindow.toggleModal()
        const SearchedDescription = watch('SearchedDescription')
        setValue('SearchedDescription',SearchedDescription)
    }

    const handleCancel = () => {
        crud.setToNone()
        toggleModal()
        reset()
        clearList()
    }

    const loadTechnicians = () => {
        TechnicianGestor.ListAll()
            .then((data)=> setTechnicinList(data),
                (error) => window.alert(error))
    }

    useEffect(() => {
        loadTechnicians()
    },[])

    //console.log(errors)

    return (
        <Modal isOpen={isModalVisible} toggle={handleCancel}>
            <ModalHeader toggle={handleCancel}>
                {isCreating && 'Agregar '}
                {isUpdating && 'Modificar '} 
                Servicio</ModalHeader>
            <ModalBody>
                    <Button color="primary" onClick={handleSearchButton}>Buscar</Button>
                    <br />
                <Form>
                    <FormGroup>
                        <Label>Codigo</Label>
                        <input className="form-control" {...register('Service.Code')} disabled={true} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Descripción</Label>
                        <input className="form-control" {...register('Service.Description')} disabled={true}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Precio</Label>
                        <input className="form-control" {...register('Service.Price')} disabled={true}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Cantidad</Label>
                        <input className="form-control" type="number" {...register('Amount')} />
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
                            } />
                            {
                                errors?.Technician?.Code?.message && <FormError error={errors.Technician.Code.message} />
                            }
                    </FormGroup>
                    <FormGroup>
                        <Label>Nota</Label>
                        <textarea className="form-control" {...register('Note')} />
                    </FormGroup>
                </Form>
                
                
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={handleCancel}>Cancelar</Button>
                <Button color="primary" onClick={handleSubmit(save)}>Guardar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ServicesForm