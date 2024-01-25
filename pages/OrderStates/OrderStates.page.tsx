import { Modal, Input, Label, ModalHeader, ModalBody, ModalFooter, Button, Table, Form, FormGroup } from "reactstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import OrderStateGestor, { OrderState } from "@/models/OrderStates.model";
import { Controller, useForm } from "react-hook-form";
import useCrud from "@/hooks/useCrud.hook";
import useModal from "@/hooks/useModal.hook";
import UpperCaseInputControl from "@/components/UpperCaseInputControl";
import FormError from "@/components/FormError";

export const OrderStatesPage = () => {
    
    const initialFormState: OrderState = OrderStateGestor.Construct('','',false)

    const { control, register, handleSubmit, reset, formState: {errors}} = useForm<OrderState>({defaultValues:{...initialFormState}})
    const { isCreating, isUpdating, setToCreate, setToUpdate} = useCrud()
    const { isModalVisible, toggleModal} = useModal()

    const [ list, setList] = useState<OrderState[]>([])
    const [ searchValue, setsearchValue] = useState<string>('')
    const filterList = list.filter((e) => e.Description.includes(searchValue))

    const refreshList = () => {
        OrderStateGestor.ListAll().then(
            (data) => {
                setList(data)
            },
            (error) => {
                window.alert(error)
            }
        )
    }

    const handdleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault
        setsearchValue(e.target.value)
    }

    const handdleCreateButton = () => {
        setToCreate()
        reset(initialFormState)
        toggleModal()
    }

    const handleEditButton = (OrderState: OrderState) => {
        setToUpdate()
        reset(OrderState)
        toggleModal()
    }

    const handleDeleteButton = async (OrderState: OrderState) => {
        const {Code, Description} = OrderState
        const confirm = window.confirm(`¿Seguro que desea eleminar el tipo de anotación ${Code} ${Description}?` )
        if (confirm) {
            try {
                const response = await OrderStateGestor.Delete(OrderState)
                window.alert(response?.data)
                refreshList()
            } catch (error) {
                window.alert(error)
            }
            
        }
    }

    const save = async (data: OrderState) => {
        console.log(data)
        try {
            let response
            if (isCreating) response = await OrderStateGestor.Create(data)
            if (isUpdating) response = await OrderStateGestor.Update(data)
            if (response === undefined) throw('No se pudo obtener respuesta del servidor.')
        
            window.alert(response.data)
            refreshList()
            reset(initialFormState)
            toggleModal()
        } catch (error) {
            window.alert(error)
        }
    }
    
    const cancel = () => {
        reset(initialFormState)
        toggleModal()
    }

    useEffect( () => {
        refreshList()
    },[])

    return (
        <>
            <h1>Estados de orden</h1>
            <br />
            <Input placeholder="Buscar" onChange={handdleChange}/>
            <br />
            <Button color='primary' onClick={handdleCreateButton}>Crear</Button>
            <br />
            <Modal isOpen={isModalVisible} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>
                    {isCreating && 'Crear '}
                    {isUpdating && 'Modificar '} 
                    estado de orden
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Código</Label>
                            <UpperCaseInputControl control={control} name="Code" maxLength={5} disabled={isUpdating}
                            rules={
                                {required: {
                                    value: true,
                                    message: "Código requerido"
                                }}
                            }
                            />
                            {
                                errors.Code?.message && <FormError error={errors.Code.message} />
                            }
                        </FormGroup>
                        <FormGroup>
                            <Label>Descripción</Label>
                            <input className="form-control" {...register("Description", 
                                {
                                    required: {
                                        value: true,
                                        message: "Descripción requerida"
                                    }
                                })} name="Description" maxLength={100}/>
                                {
                                    errors.Description?.message && <FormError error={errors.Description.message} />
                                }
                        </FormGroup>
                        <FormGroup>
                            <Controller
                                control={control}
                                name = 'Default'
                                rules = {{}}
                                render={ ({field}) => {
                                    const {value, ...rest} = field
                                    return <Input type="checkbox" checked={value} {...rest} name="Default"/> 
                                }
                                } />
                            <Label>Por defecto</Label>
                                {
                                    errors.Default?.message && <FormError error={errors.Default.message} />
                                }
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={handleSubmit(save)}>
                    Guardar
                </Button>{' '}
                <Button color="secondary" onClick={cancel}>
                    Cancelar
                </Button>
                </ModalFooter>
            </Modal>
            <Table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descripción</th>
                        <th>Por defecto</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filterList.map((e) => {
                    return(
                        <tr key={e.Code}>
                            <td>{e.Code}</td>
                            <td>{e.Description}</td>
                            <td><Input type="checkbox" disabled={true} checked={e.Default} /></td>
                            <td>
                                <Button onClick={() => {handleEditButton(e)}} color="warning">Editar</Button>
                                <span> </span>
                                <Button color="danger" onClick={() => {handleDeleteButton(e)}}>Eliminar</Button>
                            </td>
                        </tr>)
                    }
                    )}
                    
                    
                </tbody>
            </Table>
        </>
    )
}

export default OrderStatesPage