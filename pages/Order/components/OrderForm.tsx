import OrderSection from "./OrderSection"
import OrderNav from "./OrderNav"
import VehicleSection from "./VehicleSection"
import ContactSection from "./ContactSection"
import { UncontrolledAccordion,  AccordionBody, AccordionItem, AccordionHeader } from "reactstrap"
import { BsFillTelephoneFill } from "react-icons/bs"
import { FormProvider, useForm } from "react-hook-form"
import { Vehicle } from "@/models/Vehicles.model"
import { Contact } from "@/models/Contacts.model"
import { useOrderContext } from "../context/OrderContext"
import OrderStateGestor, { OrderState } from "@/models/OrderStates.model"
import ActionSection from "./ActionSection"
import OptionsSection from "./OptionsSection"

export interface orderForm {
    Vehicle: Vehicle,
    Contact: Contact,
    Mileage: number,
    OrderState: OrderState
}

const OrderForm = () => {

    const {orderState: {order}} = useOrderContext()

    const initialOrderFormaValues: orderForm = {
        Vehicle: order.Vehicle,
        Contact: order.Contact,
        Mileage: Number(order.Mileage),
        OrderState: OrderStateGestor.GetEmpty()
    }

    const methods = useForm<orderForm>({ defaultValues: initialOrderFormaValues})

    return (
        <FormProvider {...methods}>
            <OptionsSection />
            <OrderSection />
            <UncontrolledAccordion
                stayOpen
                >
                <AccordionItem>
                    <AccordionHeader targetId="1">
                        <strong>Vehículo: </strong>&nbsp;
                        <span>{`${order.Vehicle.Plate}`}</span>&nbsp;
                        <span>{`- ${order.Vehicle.Description}`}</span>
                    </AccordionHeader>
                    <AccordionBody accordionId="1">
                        <VehicleSection />
                    </AccordionBody>
                </AccordionItem>
                <AccordionItem>
                    <AccordionHeader targetId="2">
                        <strong>Contacto: &nbsp;</strong> 
                        <span>{` ${order.Contact.FullName} - `}</span>&nbsp;
                        <BsFillTelephoneFill />&nbsp;
                        <span>{order.Contact.ContactNumber}</span>
                        </AccordionHeader>
                    <AccordionBody accordionId="2">
                        <ContactSection />
                    </AccordionBody>
                </AccordionItem>
            </UncontrolledAccordion> 
            <br />
            <ActionSection />
            <br />
            <OrderNav />
            <br />
        </FormProvider>
    )
}

export default OrderForm