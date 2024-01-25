import { Order } from "@/models/Orders.model"
import { Link } from "react-router-dom"
import { Tooltip, Button } from "reactstrap"
import { BsArrowUpRightSquareFill } from "react-icons/bs"
import { useState } from "react"
import Indicators from "./Indicators"

interface OrderProps {
    order: Order
}

const Order: React.FC<OrderProps> = ({order}) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);
    const {InterventionRecord, ReceptionIndicators } = order

    return(
        <>
        <tr key={order.OrderDocument + order.OrderNumber} >
            <td>{order.OrderNumber}</td>
            <td>{order.InterventionRecord?.CreationDate?.toFormat('d MMM T')}</td>
            <td>{order.Vehicle.Plate}</td>
            <td id={'_'+order.OrderDocument + order.OrderNumber}>{order.Vehicle.Description}</td>
            <td><Indicators ReceptionIndicators={ReceptionIndicators} /></td>
            <td><Link to={`/order/${order.OrderDocument}/${order.OrderNumber}/productsservices`}><Button><BsArrowUpRightSquareFill /></Button></Link></td>
        </tr>
        <Tooltip isOpen={tooltipOpen} target={'_'+order.OrderDocument + order.OrderNumber} toggle={toggle}>
            Agregó {InterventionRecord?.CreatedBy} a las {InterventionRecord?.CreationDate?.toFormat('T MMM d')}
            <br />
            {
                InterventionRecord?.ModifiedBy !== null && 
                <>Modificó: {InterventionRecord?.ModifiedBy} a las {InterventionRecord?.ModificationDate?.toFormat('T MMM d')}</>
            }
        </Tooltip>
    </>
    )
}

export default Order