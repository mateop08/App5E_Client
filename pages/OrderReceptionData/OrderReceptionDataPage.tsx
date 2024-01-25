import { Input, ListGroup, ListGroupItem, Button } from "reactstrap"
import { useOrderContext } from "../Order/context/OrderContext"
import { useForm } from "react-hook-form"
import OrderGestor, { ReceptionIndicators } from "@/models/Orders.model"
import { Controller } from "react-hook-form"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

interface receptionDataForm {
    ReceptionIndicators: ReceptionIndicators,
    ReceptionNote: string
}

const OrderReceptionDataPage = () => {

    const {orderState: { order, change }} = useOrderContext()
    const {ReceptionIndicators, ReceptionNote} = order

    const initialState = {
        ReceptionIndicators: ReceptionIndicators,
        ReceptionNote: ReceptionNote
    }

    const {control, handleSubmit, setValue} = useForm<receptionDataForm>( {defaultValues: initialState})
    
    const user = useSelector((state: RootState) => state.userReducer.User)

    const onSave = async (data: receptionDataForm) => {
        try {
            if (user=== null) throw("No es posible guardar los datos de recepción si el usuario es NULL.")
            const newOrder = order
            newOrder.ReceptionIndicators = data.ReceptionIndicators
            newOrder.ReceptionNote = data.ReceptionNote
            const respponse = await OrderGestor.Update(newOrder, user)
            change(newOrder)
            window.alert(respponse)
        } catch (error) {
            window.alert(error)
        }
    }

    const onCancel = () => {
        setValue('ReceptionIndicators',ReceptionIndicators)
        setValue('ReceptionNote', ReceptionNote)
    }

    useEffect(() => {
        setValue('ReceptionIndicators',ReceptionIndicators)
        setValue('ReceptionNote',ReceptionNote)
    // eslint-disable-next-line    
    },[order])

    return (
        <>
            <ListGroup flush>
                <ListGroupItem>
                    <Controller
                            control={control}
                            name = 'ReceptionIndicators.Quote'
                            rules = {{}}
                            render={ ({field}) => {
                                const {value, ...restField} = field
                                return <Input type="checkbox" {...restField} checked={value}/>
                            }
                            } /> Cotización
                </ListGroupItem>
                <ListGroupItem>
                    <Controller
                            control={control}
                            name = 'ReceptionIndicators.Diagnosis'
                            rules = {{}}
                            render={ ({field}) => {
                                const {value, ...restField} = field
                                return <Input type="checkbox" {...restField} checked={value}/>
                            }
                            } />  Diagnóstico
                </ListGroupItem>
                <ListGroupItem>
                    <Controller
                            control={control}
                            name = 'ReceptionIndicators.Warranty'
                            rules = {{}}
                            render={ ({field}) => {
                                const {value, ...restField} = field
                                return <Input type="checkbox" {...restField} checked={value}/>
                            }
                            }/> Garantía
                </ListGroupItem>
                <ListGroupItem>
                    <Controller
                            control={control}
                            name = 'ReceptionIndicators.Lubrication'
                            rules = {{}}
                            render={ ({field}) => {
                                const {value, ...restField} = field
                                return <Input type="checkbox" {...restField} checked={value}/>
                            }
                            } /> Lubricación
                </ListGroupItem>
                <ListGroupItem>
                    <Controller
                            control={control}
                            name = 'ReceptionIndicators.Mechanics'
                            rules = {{}}
                            render={ ({field}) => {
                                const {value, ...restField} = field
                                return <Input type="checkbox" {...restField} checked={value}/>
                            }
                            }/>  Mecánica
                </ListGroupItem>
                <ListGroupItem>
                    <Controller
                            control={control}
                            name = 'ReceptionIndicators.Powertrain'
                            rules = {{}}
                            render={ ({field}) => {
                                const {value, ...restField} = field
                                return <Input type="checkbox" {...restField} checked={value}/>
                            }
                            } /> Tren motriz
                </ListGroupItem>
                <ListGroupItem>
                    <Controller
                            control={control}
                            name = 'ReceptionNote'
                            rules = {{}}
                            render={ ({field}) => {
                                return <Input type="textarea" {...field} placeholder='Información Adicional'></Input>
                            }
                            } />
                </ListGroupItem>
            </ListGroup>
            <br />
            <div className="text-end">
                <Button onClick={onCancel}>Cancelar</Button>&nbsp;
                <Button onClick={handleSubmit(onSave)} color="primary">Guardar </Button>
            </div>
                
        </>
    )
}

export default OrderReceptionDataPage