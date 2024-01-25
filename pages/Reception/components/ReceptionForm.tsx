import { useState } from 'react';
import './ReceptionForm.css';
import { useSelector } from 'react-redux';
import Switch from '@/components/Switch';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import OrderGestor, { Order } from '@/models/Orders.model';
import { RootState } from '@/redux/store';
import ContactGestor from '@/models/Contacts.model';
import FormError from '@/components/FormError';
import VehicleSection from './VehicleSection';
import { useReceptionContext } from '../context/ReceptionContext';
import MembershipSection from './MembershipSection';
import ContactSection from './ContactSection';
import VehicleGestor from '@/models/Vehicles.model';


export interface formValues extends Omit<Order, 'OrderNumber' | 'Mileage' | 'CardNumber' | 'Annulled' | 'Open'> {

    Mileage: number | null,
    CardNumber: number | null
}


const ReceptionForm = () => {

    const { ActiveAppDocument, User} = useSelector( (state: RootState) => state.userReducer)

    const initialState: formValues = {
        CardNumber: 0,
        Contact: ContactGestor.Construct('','','','',''),
        OrderDocument: '',
        Vehicle: VehicleGestor.Construct('','',0,0,0,0,''),
        Mileage: null,
        ReceptionIndicators: {
            Diagnosis: false,
            Lubrication: false,
            Mechanics: false,
            Powertrain: false,
            Quote: false,
            Warranty: false
        },
        ReceptionNote: '',
        AnnulledReason: '',
        AnnulledBy: ''
    }

    const [isToggled, setIsToggled] = useState(false)

    const { receptionMode, selectVehicle, assignedContactsState, membershipState} = useReceptionContext()

    const methods = useForm<formValues>({defaultValues: initialState})
    const { setValue, reset, control, register, handleSubmit, formState: {errors}} = methods
    

    const cambiarModoRecepcion = async () => {
        setIsToggled(!isToggled);
        (!isToggled) ? receptionMode.changeModeToMembership() : receptionMode.changeModeToPlate()
        reset(initialState)
        if (isToggled) setValue('CardNumber',0)
        if (!isToggled) setValue('CardNumber',null)
        selectVehicle.setToEmpty()
        selectVehicle.setToNotExists()
        assignedContactsState.changeToEmpty()
        assignedContactsState.notFoundAssignedContacts()
        membershipState.changeToEmpty()
        membershipState.notFoundMembership()
    }
 
    const save = async (data: formValues) => {
        try {
            const CardNumber = (data.CardNumber === null) ? 0 : data.CardNumber
            if(data.Mileage === null) throw("No es posible guardar la recepción sin el kilometraje")
            if(typeof data.Mileage === 'string') throw("El kilometraje debe ser de tipo número")
            
            const orderData = {
                OrderDocument: ActiveAppDocument,
                OrderNumber: undefined,
                CardNumber: CardNumber,
                Vehicle: data.Vehicle,
                Contact: data.Contact,
                Mileage: data.Mileage,
                ReceptionIndicators: data.ReceptionIndicators,
                InterventionRecord: undefined,
                ReceptionNote: data.ReceptionNote,
                Open: false,
                Annulled: false,
                AnnulledReason: '',
                AnnulledBy: ''
            }

            const newOrder = OrderGestor.Construct(orderData)
            if (User === null) {
                throw('No es posible crear una orden para un usuario de tipo NULL.')
            }
            console.log("Antes de peticion")
            const response = await OrderGestor.Create(newOrder, User)
            window.alert(response)
            reset()
            selectVehicle.setToEmpty()
            selectVehicle.setToNotExists()
            assignedContactsState.changeToEmpty()
            assignedContactsState.notFoundAssignedContacts()
            membershipState.changeToEmpty()
            membershipState.notFoundMembership()
        } catch (error) {
            window.alert(error)
        }
        
    }
    //console.log(watch())
    return (
        <FormProvider {...methods}>
            <Form>
                <fieldset>
                    <div className='seccionCarnet'>
                        <Switch isToggled={isToggled} onToggle={cambiarModoRecepcion}/>
                        <span className='tituloCarnet'>Recepcion con carnet</span>
                    </div>
                </fieldset>
                <MembershipSection />
                <hr className="hr" />
                <VehicleSection />
                <FormGroup>
                    <Label>Kilometraje</Label>
                    <input className="form-control" type='text' {...register('Mileage',
                        {
                            valueAsNumber: true,
                            required: {
                                value: true,
                                message: 'Kilometraje requerido'
                            }
                        }
                        )} name="Mileage" />
                    {
                        errors.Mileage?.message && <FormError error={errors.Mileage.message} />
                    }   
                </FormGroup>
                <hr className="hr" />
                <ContactSection />
                <hr className="hr" />
                <FormGroup> 
                    <legend>Datos de Recepción</legend>
                    <Label>
                        <Controller
                            control={control}
                            name = 'ReceptionIndicators.Quote'
                            rules = {{}}
                            render={ ({field}) => {
                                const {value, ...rest} = field
                                return <Input type="checkbox" checked={value} {...rest} name="Quote"/> 
                            }
                            } />
                        &nbsp;Cotización
                    </Label>
                    <br />
                    <Label>
                        <Controller
                            control={control}
                            name = 'ReceptionIndicators.Diagnosis'
                            rules = {{}}
                            render={ ({field}) => {
                                const {value, ...rest} = field
                                return <Input type="checkbox" checked={value} {...rest} name="Diagnosis"/> 
                            }
                            } />
                        &nbsp;Diagnóstico
                    </Label>
                    <br />
                    <Label>
                        <Controller
                            control={control}
                            name = 'ReceptionIndicators.Warranty'
                            rules = {{}}
                            render={ ({field}) => {
                                const {value, ...rest} = field
                                return <Input type="checkbox" checked={value} {...rest} name="Warranty"/> 
                            }
                            } />
                        &nbsp;Garantía
                    </Label>
                    <br />
                    <Label>
                        <Controller
                            control={control}
                            name = 'ReceptionIndicators.Lubrication'
                            rules = {{}}
                            render={ ({field}) => {
                                const {value, ...rest} = field
                                return <Input type="checkbox" checked={value} {...rest} name="Lubrication"/> 
                            }
                            } />
                        &nbsp;Lubricación
                    </Label>
                    <br />
                    <Label>
                        <Controller
                            control={control}
                            name = 'ReceptionIndicators.Mechanics'
                            rules = {{}}
                            render={ ({field}) => {
                                const {value, ...rest} = field
                                return <Input type="checkbox" checked={value} {...rest} name="Mechanics"/> 
                            }
                            } />
                        &nbsp;Mecánica
                    </Label>
                    <br />
                    <Label>
                        <Controller
                            control={control}
                            name = 'ReceptionIndicators.Powertrain'
                            rules = {{}}
                            render={ ({field}) => {
                                const {value, ...rest} = field
                                return <Input type="checkbox" checked={value} {...rest} name="Powertrain"/> 
                            }
                            } />
                        &nbsp;Tren Motriz
                    </Label>
                    <br />
                    <Controller
                            control={control}
                            name = 'ReceptionNote'
                            rules = {{}}
                            render={ ({field}) => {
                                return <Input type="textarea" {...field} placeholder='Información Adicional'></Input>
                            }
                            } />
                    
                </FormGroup>
                <Button color='primary' onClick={handleSubmit(save)}>Recepcionar</Button>
            </Form>
        </FormProvider>
    );
}

export default ReceptionForm;