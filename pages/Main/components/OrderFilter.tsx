import { Button, Collapse, Card, CardBody, Form, FormGroup, Label, Input, ListGroup, ListGroupItem } from 'reactstrap'
import {useEffect, useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import OrderGestor, { ReceptionIndicators } from '@/models/Orders.model';
import OrderStateGestor, { OrderState } from '@/models/OrderStates.model';
import { useOrderListContext } from '../context/OrderListContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';

interface filterForm {
    InitialDate: string,
    FinalDate: string,
    Plate: string,
    OrderState: string,
    Open: 'true' | 'false' | 'null',
    ReceptionIndicators: ReceptionIndicators
}

const OrderFilter = () => {

    const [ isOpen, setIsOpen] = useState(false);
    const [ orderStatesList, setOrderStatesList] = useState<OrderState[]>([])
    const ActiveAppDocument = useSelector((state: RootState) => state.userReducer.ActiveAppDocument)

    const initialFormState: filterForm = {
        InitialDate: '',
        FinalDate: '',
        Plate: '',
        Open: 'true',
        OrderState: 'null',
        ReceptionIndicators: {
            Diagnosis: false,
            Lubrication: false,
            Mechanics: false,
            Powertrain: false,
            Quote: false,
            Warranty: false
        }
    }
    const {register, control, handleSubmit, reset} = useForm<filterForm>({defaultValues: initialFormState})

    const {changeList} = useOrderListContext()

    const toggle = () => setIsOpen(!isOpen);

    const getOrderStatesList = () => {
        OrderStateGestor.ListAll().then( 
            (data) => {
                setOrderStatesList(data)
            },
            (error) => {
                window.alert(error)
            })
    }

    const loadOpenOrders = () => {
        if (ActiveAppDocument === '') return
        OrderGestor.ListOpenOrdersByOrderDocument(ActiveAppDocument)
            .then((data) => {
                //console.log(data)
                return changeList(data)},
                (error) => console.log(error))
    }

    const applyFilter = async (data: filterForm) => {
        const {InitialDate, FinalDate, Open, OrderState, ...restData} = data
        try {
            //Parse open
            let openSearch: boolean | null = null
            if (Open === 'true') {
                openSearch = true
            } else if (Open === 'false') {
                openSearch = false
            } else if (Open === 'null') {
                openSearch = null
            }
            
            const filterData = {
                OrderDocument: ActiveAppDocument,
                Open: openSearch,
                State: OrderState !== 'null' ? OrderState : null,
                InitialDate: InitialDate !== '' ? DateTime.fromFormat(InitialDate,'yyyy-MM-dd') : null,
                FinalDate: FinalDate !== '' ? DateTime.fromFormat(FinalDate,'yyyy-MM-dd').plus({day: 1}) : null,
                ...restData
            }

            const newList = await OrderGestor.ListByFilters(filterData)
            changeList(newList)
            window.scrollTo(0, 0)
            toggle()
        } catch (error) {
            console.log(error)
        }
        
    }

    const handleDefaultButton = () => {
        loadOpenOrders()
        reset(initialFormState)
        window.scrollTo(0, 0)
        toggle()
    }
    
    useEffect( () => {
        getOrderStatesList()
    },[])

    return (
        <>
        <div className='d-flex justify-content-between'>
            <Link to={`/reception`} >
                <Button>Recepción</Button>
            </Link>
            <Link to={`/bulkproductgestion`} >
                <Button>Gestión granel</Button>
            </Link>
            <Link to={`/invoice`} >
                <Button>Facturación</Button>
            </Link>
            <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>
                Filtrar por
            </Button>
        </div>
        <Collapse isOpen={isOpen}>
            <Card>
            <CardBody>
                <Form>
                    <FormGroup>
                        <Label><strong>Fecha Inicial</strong></Label>
                        <input type='date' {...register('InitialDate')} name='InitialDate' className="form-control"  />
                    </FormGroup>
                    <FormGroup>
                        <Label><strong>Fecha Final</strong></Label>
                        <input type='date' {...register('FinalDate')} name='FinalDate' className="form-control"  />
                    </FormGroup>
                    <FormGroup>
                        <Label><strong>Placa</strong></Label>
                        <input type='text' {...register('Plate')} name='Plate' className="form-control"  />
                    </FormGroup>
                    <FormGroup>
                        <Label><strong>Estados de orden</strong></Label>
                        <Controller
                        control={control}
                        name = 'OrderState'
                        rules = {{}}
                        render= { ({field}) => {

                            return (
                                <Input type="select" {...field}>
                                    {orderStatesList.map((orderState) =>  <option value={orderState.Code} key={orderState.Code}>{orderState.Description}</option>)}
                                    <option value='null'> Todos </option>
                                </Input>
                            )
                            }
                        } />
                    </FormGroup>
                    <FormGroup>
                        <Label><strong>Acceso de orden</strong></Label>
                        <Controller
                        control={control}
                        name = 'Open'
                        rules = {{}}
                        render= { ({field}) => {

                            return (
                                <Input type="select" {...field}>
                                    <option value='null'> Todas </option>
                                    <option value={'true'}> Abierta </option>
                                    <option value={'false'}> Cerrada </option>
                                </Input>
                            )
                            }
                        } />
                    </FormGroup>
                    <FormGroup>
                        <Label><strong>Indicadores de Recepción</strong></Label>
                        <ListGroup flush>
                            <ListGroupItem>
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
                            </ListGroupItem>
                            <br />
                            <ListGroupItem>
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
                            </ListGroupItem>
                            <br />
                            <ListGroupItem>
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
                            </ListGroupItem>
                            <br />
                            <ListGroupItem>
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
                            </ListGroupItem>
                            <br />
                            <ListGroupItem>
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
                            </ListGroupItem>
                            <br />
                            <ListGroupItem>
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
                            </ListGroupItem>
                        </ListGroup>
                    </FormGroup>
                    <Button color='primary' onClick={handleSubmit(applyFilter)}>Filtrar</Button>{' '}
                    <Button color='secondary' onClick={handleDefaultButton}>Por defecto</Button>
                </Form>
            </CardBody>
            </Card>
        </Collapse>
      </>
    );
}

export default OrderFilter;