import {UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button} from 'reactstrap'
import { useOrderContext } from "../context/OrderContext"
import { useFormContext } from "react-hook-form"
import { orderForm } from "./OrderForm"
import { BsThreeDotsVertical } from "react-icons/bs"

const OptionsSection = () => {

    const {editingState, annullationWindow} = useOrderContext()
    const {orderState:{order}} = useOrderContext()
    const {setValue} = useFormContext<orderForm>()

    
    const handleToEdit = () => {
        const {OrderState} = order
        if (OrderState === undefined) throw("No se puede editar la orden sin un estado de orden")
        setValue('Contact',order.Contact)
        setValue('Vehicle',order.Vehicle)
        setValue('Mileage', order.Mileage)
        setValue('OrderState', OrderState)
        editingState.activate()
    }

    const handleAnnull = () => {
        annullationWindow.toggleModal()
    }

    return (
        <div className='d-flex justify-content-between'>
            <h1>Información de Orden </h1>
            <div>
                <UncontrolledDropdown>
                    <DropdownToggle nav>
                        <Button><BsThreeDotsVertical /></Button>
                    </DropdownToggle>
                    <DropdownMenu>
                    <DropdownItem onClick={handleToEdit}>Modificar</DropdownItem>
                    <DropdownItem onClick={handleAnnull}>Anular</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        </div>
    )
}

export default OptionsSection