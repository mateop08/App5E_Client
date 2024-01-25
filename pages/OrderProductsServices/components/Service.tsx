import { Button, UncontrolledPopover, PopoverHeader, PopoverBody, Tooltip, ListGroupItem } from "reactstrap"
import { useFormContext } from "react-hook-form"
import { serviceForm } from "./ServicesSection"
import OrderServiceGestor, { OrderService } from "@/models/OrderServices.model"
import { useServicesContext } from "../context/ServicesContext"
import { useOrderContext } from "@/pages/Order/context/OrderContext"
import { BsPencilFill, BsTrashFill, BsThreeDots } from 'react-icons/bs';
import { useState } from "react"
interface ServiceProps {
    orderService: OrderService
}

const Service: React.FC<ServiceProps> = ({orderService}) => {

    const { setValue } = useFormContext<serviceForm>()
    const { servicesModals: {formWindow, crud}, orderServicesListState:{refreshList}} = useServicesContext()
    const {orderState: { order: {OrderDocument, OrderNumber}}} = useOrderContext()

    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    const handleEditButton = (orderService: OrderService) => {
        const {Id, Service, Amount, Technician, Note} = orderService
        setValue('Id', Id)
        setValue('Service', Service)
        setValue('Amount', Amount)
        setValue('Technician', Technician)
        setValue('Note', Note)
        crud.setToUpdate()
        formWindow.toggleModal()
    }

    const handleDeleteButton = async (orderService: OrderService) => {
        try {
            const {Service} = orderService
            const confirm = window.confirm(`Se va a eliminar el servicio ${Service.Code} ${Service.Description}, ¿esta seguro que desea continuar?`)
            if (confirm) {
                const response = await OrderServiceGestor.Delete(orderService)
                window.alert(response)
                if (OrderNumber !== undefined) refreshList(OrderDocument, OrderNumber)
        }
        } catch (error) {
            window.alert(error)
        }
        
    }

    const {Id, Amount, Service, InterventionRecord} = orderService
    const {Code, Description,Price} = Service
    
    
    return (
        <>
            <ListGroupItem key={Id}>
                <div className="row" key={Id} >
                    <div className="col-lg-7 col-md-5 col-sm-5 col-xs-4">
                        <strong>{Code}</strong><br />
                        <span id={'__'+Code}>{Description}</span><br />
                        <span><strong>Técnico: </strong>{orderService.Technician.Description}</span>{' '}
                        <Button id={'_'+Code}><BsThreeDots /></Button>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-1">
                        <strong>Cant: </strong>{Amount}
                    </div>
                    <div className="col-lg-1 col-md-2 col-sm-2 col-xs-1">
                        {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' ,maximumFractionDigits:0 }).format(Price)}
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-3 col-xs-4">
                        <Button color="warning" onClick={() => {handleEditButton(orderService)}}><BsPencilFill /></Button>{' '}
                        <Button color='danger' onClick={() => {handleDeleteButton(orderService)}}><BsTrashFill /></Button>
                    </div>
                </div>
            </ListGroupItem>
            <UncontrolledPopover
                flip
                target={'_'+Code}
                trigger="focus"
                placement='bottom'>
                    
                <PopoverHeader>Nota</PopoverHeader>
                <PopoverBody>{orderService.Note}</PopoverBody>
            </UncontrolledPopover>
            <Tooltip
                isOpen={tooltipOpen}
                target={'__'+Code}
                toggle={toggle}>
                    Agregó {InterventionRecord?.CreatedBy} a las {InterventionRecord?.CreationDate?.toFormat('T MMM d')}
                    <br />
                    {InterventionRecord?.ModifiedBy !== null && 
                        <>Modificó: {InterventionRecord?.ModifiedBy} a las {InterventionRecord?.ModificationDate?.toFormat('T MMM d')}</>
                    }
            </Tooltip>
        </> 
    )
}

export default Service
                        