import { Modal, ModalHeader, ModalBody, Button, Table, ModalFooter } from "reactstrap"
import { useServicesContext } from "../context/ServicesContext"
import { useFormContext } from "react-hook-form"
import { useOrderContext } from "@/pages/Order/context/OrderContext"
import ServicesGestor, { Service } from "@/models/Services.model"
import { serviceForm } from "./ServicesSection"

const ServicesSearch = () => {

    const {servicesModals: {searchWindow, formWindow, crud, searchedServices: {list, change, clearList}}} = useServicesContext()
    const {isModalVisible, toggleModal} = searchWindow
    const {orderState: { order: {OrderDocument}}} = useOrderContext()
    const {setValue, reset, register, handleSubmit} = useFormContext<serviceForm>()

    const search = async (data: serviceForm) => {
        const {SearchedDescription} = data
        clearList()
        try {
            const list = await ServicesGestor.List(OrderDocument,SearchedDescription)
            change(list)
        } catch (error) {
            window.alert(error)
        }
        
    }

    const handleSelect = (service: Service) => {
        searchWindow.toggleModal()
        formWindow.toggleModal()
        setValue("Service", service)
    }

    const handleCancel = () => {
        clearList()
        crud.setToNone()
        toggleModal()
        reset()
    }

    return(
        <Modal className='modal-dialog modal-lg' isOpen={isModalVisible} toggle={handleCancel}>
            <ModalHeader toggle={handleCancel}>Buscar servicio</ModalHeader>
            <ModalBody>
                <input className="form-control" {...register('SearchedDescription')} name='SearchedDescription'/>
                <br />
                <Button color="primary" onClick={handleSubmit(search)}>Buscar</Button>
                <br /><br />
                <div className="table-responsive">
                    <Table>
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Descripcion</th>
                                <th>Precio</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                list.map((p) => {
                                    return (
                                        <tr key={p.Code}>
                                            <td>{p.Code}</td>
                                            <td>{p.Description}</td>
                                            <td>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' ,maximumFractionDigits:0 }).format(p.Price)}</td>
                                            <td><Button color="primary" onClick={() => {handleSelect(p)}}>Seleccionar</Button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={handleCancel}>
                Cancelar
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default ServicesSearch