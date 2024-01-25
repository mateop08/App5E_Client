import { Button } from "reactstrap"
import { useOrderContext } from "../context/OrderContext"
import { useFormContext } from "react-hook-form"
import { orderForm } from "./OrderForm"
import OrderGestor from "@/models/Orders.model"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import VehicleContactGestor from "@/models/VehicleContacts.model"

const ActionSection = () => {

    const { orderState: {order, refreshOrder}, editingState } = useOrderContext()
    const {handleSubmit, reset} = useFormContext<orderForm>()
    const user = useSelector((state: RootState) => state.userReducer.User)

    const onSave = async (data: orderForm) => {
        try {
            if (user === null) throw("Error no es posible actualizar la orden para un usuario de tipo NULL")
            const newOrder = order
            const {OrderDocument, OrderNumber, Vehicle: {Plate}, Contact:{Identification}} = order
            if (OrderNumber === undefined) throw("Error documento no definido en la ruta")

            newOrder.Contact = data.Contact
            newOrder.Vehicle = data.Vehicle
            newOrder.Mileage = data.Mileage
            newOrder.OrderState = data.OrderState
            
            const existsRelation = await VehicleContactGestor.Exists({VehiclePlate: Plate, ContactId: Identification})
            let response
            if (!existsRelation) {
                const confirm = window.confirm(`¿El contacto ${Identification} no esta asignado a la placa ${Plate}, desea asignarlo?`)
                if (confirm) {
                    response = await VehicleContactGestor.Create({VehiclePlate: Plate, ContactId: Identification})
                    window.alert(response)
                }
            }
            response = await OrderGestor.Update(newOrder, user)
            window.alert(response)
            reset()
            refreshOrder(OrderDocument, OrderNumber)
            editingState.deactivate()
        } catch (error) {
            window.alert(error)
        }
        
    }

    const onCancel = () => {
        editingState.deactivate()
    }
    return (
        <div className="text-end">
            {editingState.active &&
            <>
                
                
                <Button onClick={onCancel}>Cancelar</Button>&nbsp;
                <Button onClick={handleSubmit(onSave)} color="primary">Guardar </Button>
                
            </>
            }
        </div>
        
    )
}

export default ActionSection