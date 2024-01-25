import { Table, Tooltip, Input, Alert } from "reactstrap"
import { useOrderContext } from "../context/OrderContext"
import { useState, useEffect } from "react"
import OrderStateGestor, { OrderState } from "@/models/OrderStates.model"
import { Controller, useFormContext } from "react-hook-form"
import { orderForm } from "./OrderForm"

const OrderSection = () => {
    const OrderState = useOrderContext()
    const {orderState: {order}, editingState} = OrderState
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);
    
    const [ orderStatesList, setOrderStatesList] = useState<OrderState[]>([])
    const {control} = useFormContext<orderForm>()

    const getOrderStatesList = () => {
        OrderStateGestor.ListAll().then( 
            (data) => {
                setOrderStatesList(data)
            },
            (error) => {
                window.alert(error)
            })
    }

    useEffect( () => {
        getOrderStatesList()
    },[])

    const {InterventionRecord, Annulled} = order
    return (    
        <>
            <div className="table-responsive" >
            <Table className="alert-danger">
                <thead>
                    <tr>
                        <th>Documento</th>
                        <th>Numero</th>
                        <th>Recepción</th>
                        <th>Estado Orden</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr id={'_'+order.OrderNumber} >
                        <td>{order.OrderDocument}</td>
                        <td>{order.OrderNumber}</td>
                        <td>{order.InterventionRecord?.CreationDate?.toFormat('DD T')}</td>
                        {Annulled &&
                            <td>Anulada</td>
                        }
                        {(!Annulled && !editingState.active) &&
                            <td>{order.OrderState?.Description}</td>  
                        }
                        {(!Annulled &&editingState.active) &&
                        <td> 
                            <Controller
                            control={control}
                            name = 'OrderState.Code'
                            rules = {{}}
                            render= { ({field}) => {
    
                                return (
                                    <Input type="select" {...field}>
                                        {orderStatesList.map((orderState) =>  <option value={orderState.Code} key={orderState.Code}>{orderState.Description}</option>)}
                                    </Input>
                                )
                                }
                            } />
                        </td>
                        }
                    </tr>
                </tbody>
            </Table>
            </div>
            {order.Annulled &&
                <Alert color="danger">
                    <strong>Orden anulada</strong>
                    <br />
                    <label>Anulada por: {order.AnnulledBy}</label>
                    <br />
                    <label>Motivo de anulación: {order.AnnulledReason}</label>
                </Alert>
            }
            <Tooltip
            isOpen={tooltipOpen}
            target={'_'+order?.OrderNumber}
            toggle={toggle}>
            Recepcionó {InterventionRecord?.CreatedBy} a las {InterventionRecord?.CreationDate?.toFormat('T MMM d')}
            <br />
            {
                InterventionRecord?.ModifiedBy !== null && 
                <>Modificó: {InterventionRecord?.ModifiedBy} a las {InterventionRecord?.ModificationDate?.toFormat('T MMM d')}</>
            }
                

            </Tooltip>
                
            </>
    )
}

export default OrderSection