import { Form, FormGroup, Label, Button } from "reactstrap" 
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { Controller, useForm, useFormContext } from "react-hook-form"
import Select from "react-select"
import OrderGestor, { Order } from "@/models/Orders.model"
import { useEffect, useState } from "react"
import { FaGear } from "react-icons/fa6";
import { useInvoicesContext } from "../contexts/InvoiceContext"
import { InvoiceForm } from "../InvoicePage"

type OptionsOrder = {label: string, value: Order}


interface OrderForm {
    OptionOrder: OptionsOrder | null
}

const OrderSection = () => {
    
    const ActiveAppDocument = useSelector((state: RootState) => state.userReducer.ActiveAppDocument)

    const { configurationWindow, selectOrderState } = useInvoicesContext()

    const initialStateOrderForm: OrderForm = {
        OptionOrder: null
    }

    const {control, setValue} = useForm<OrderForm>({defaultValues: initialStateOrderForm })
    const invoiceForm = useFormContext<InvoiceForm>()

    const [activePlateList, setActivePlateList] = useState<OptionsOrder[] | null>([])

    const getActiveOrders = () => {
        if (ActiveAppDocument !== '') {
        OrderGestor.ListOpenOrdersByOrderDocument(ActiveAppDocument)
            .then((data) => {
                const optionList = adaptOrdersToOptionType(data)
                setActivePlateList(optionList)
            })
            .catch((error) => window.alert(error))
        } else {
            setActivePlateList(null)
        }
    }

    const adaptOrdersToOptionType = (orders: Order[]) => {
        const optionList = orders.map((o)=> {
            const optionType = {
                value: o,
                label: o.Vehicle.Plate
            }
            return optionType
        })
        return optionList
    }

    const handleChangePlate = async (selectOption: OptionsOrder | null) => {
        
        if (selectOption !== null) {
            const {OrderDocument, OrderNumber} = selectOption.value
            if (!OrderNumber) throw("Numero de orden indefinida no es posible cargar orden. Invoice Page")
            selectOrderState.change(selectOption.value)
            invoiceForm.setValue('OrderDocument', OrderDocument)
            invoiceForm.setValue('OrderNumber', OrderNumber)
        } else {
            selectOrderState.setToEmpty()
            invoiceForm.setValue('OrderDocument', '')
            invoiceForm.setValue('OrderNumber', 0)
        }
        setValue("OptionOrder",selectOption)
        
    }

    useEffect( () => {
        getActiveOrders()
    // eslint-disable-next-line
    },[ActiveAppDocument])

    return (
        <>
        
            <br />
            <div className='d-flex justify-content-between'>
                <Button color="primary  " onClick={getActiveOrders}>Buscar placas activas</Button>
                <Button onClick={configurationWindow.toggleModal}><FaGear /></Button>
            </div>
            <br />
            <Form>
                <FormGroup>
                    <Label for="exampleEmail">
                    Seleccione una placa:
                    </Label>
                    <Controller
                        control={control}
                        name = 'OptionOrder'
                        rules = {{required: {
                            value: true,
                            message: 'Placa requerida'
                            }

                        }}
                        render= { ({field}) => {
                                return (
                                <Select {...field} 
                                    onChange={(data) => handleChangePlate(data)}
                                    // eslint-disable-next-line
                                    // @ts-ignore
                                    options={activePlateList}
                                    isClearable={true}/>)
                            }
                        }
                        />

                    </FormGroup>
            </Form>
            <hr className="hr" />
        </>
    )
}

export default OrderSection