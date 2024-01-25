import { ListGroup, Button } from "reactstrap"
import { useServicesContext } from "../context/ServicesContext"
import { useEffect } from "react"
import { useOrderContext } from "@/pages/Order/context/OrderContext"
import { useFormContext } from "react-hook-form"
import { serviceForm } from "./ServicesSection"
import Service from "./Service"
import { BsFillPlusCircleFill } from "react-icons/bs"

const ServicesTable = () => {

    const { servicesModals: {searchWindow, crud}, orderServicesListState:{orderServicesList, refreshList}} = useServicesContext()

    const {orderState: { order: {OrderDocument, OrderNumber}}} = useOrderContext()
    
    const { reset} = useFormContext<serviceForm>()

    const handleAddServiceButton = () => {
        reset()
        crud.setToCreate()
        searchWindow.toggleModal()
    }

    useEffect(() => {
        if (OrderNumber !== undefined) refreshList(OrderDocument, OrderNumber)
        
    // eslint-disable-next-line
    },[OrderNumber])
    
    return (
            <div className="table-responsive">
                <div className="text-end">
                    <Button color='primary' onClick={handleAddServiceButton}><BsFillPlusCircleFill /></Button>
                </div>
                <ListGroup flush>
                    {
                        orderServicesList.map((orderService) => <Service key={orderService.Id} orderService={orderService} />)
                    }
                </ListGroup>
            </div>
    )
}

export default ServicesTable