import { useFieldArray, useFormContext, Controller, useForm } from "react-hook-form"
import { InvoiceForm } from "../InvoicePage"
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { BsFillPlusCircleFill, BsTrashFill } from "react-icons/bs";
import { RegisterPaymentMethod } from "../InvoicePage";
import useModal from "@/hooks/useModal.hook";
import { useEffect, useState } from "react";
import PaymentMethodGestor, { PaymentMethod } from "@/models/PaymentMethod.model";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useInvoicesContext } from "../contexts/InvoiceContext";

interface selectPaymentForm {
    PaymentCode: string
}

const PaymentMethodSection = () => {

    const {control, register, watch} = useFormContext<InvoiceForm>()
    const { fields, append, remove /*prepend, remove, swap, move, insert*/ } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "PaymentMethodsList", // unique name for your Field Array
      });
    

    const {totalOrderState} = useInvoicesContext()
    const paymentWindow = useModal()
    const User = useSelector((state: RootState) => state.userReducer.User)
    const [paymentMethodsList, setPaymentMethodsList] = useState<PaymentMethod[]>([]) 
    const selectPaymentForm = useForm<selectPaymentForm>({defaultValues: {PaymentCode: ''}})
    const [totalPayment, setTotalPayment] = useState<number>(0)

    const onAddButton = (data: selectPaymentForm) => {
        const newPaymentMethod = paymentMethodsList.find((p) => {
            if (p.Code === data.PaymentCode) {
                return p
            } else {
                return
            }
        })

        if (!newPaymentMethod) throw(`No se pudo encontrar el medio de pago ${data.PaymentCode}`)
        const newRegister: RegisterPaymentMethod = {
            PaymentMethod: newPaymentMethod,
            Value: 0,
            Note: ''
        }
        
        paymentWindow.toggleModal()
        selectPaymentForm.reset()
        append(newRegister)
    }

    const onCancel = () => {
        paymentWindow.toggleModal()
        selectPaymentForm.reset()
    }

    const CalculateTotal = () => {
        const payments = watch('PaymentMethodsList')
        const total = payments.reduce((total, e) => {
            return Number(total) + Number(e.Value)
        },0)
        setTotalPayment(total)
    }
    

    useEffect( () => {
        const getPaymentList = () => {
            if (User !== null) {
                PaymentMethodGestor.ListByUser(User)
                    .then((data) => setPaymentMethodsList(data))
                    .catch((error) => window.alert(error))
            }
            
        }
        getPaymentList()
    }, [User])
    return (
        <>
            <legend>Medios de pago</legend>
            <Button color="primary" onClick={paymentWindow.toggleModal}><BsFillPlusCircleFill /> Agregar</Button>
            <Table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descripción</th>
                        <th>Valor</th>
                        <th>Nota</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {fields.map((field, index) => {
                        //console.log(field)
                        return (
                        <tr key={field.id}>
                            <td>{field.PaymentMethod.Code}</td>
                            <td>{field.PaymentMethod.Description}</td>
                            <td><input className="form-control" type="number" key={field.id} // important to include key with field's id
                                {...register(`PaymentMethodsList.${index}.Value`)} onBlur={CalculateTotal}/>
                            </td>
                            <td><input className="form-control" key={field.id} // important to include key with field's id
                                {...register(`PaymentMethodsList.${index}.Note`)} />
                            </td>
                            <td><Button color="danger" onClick={() => {
                                remove(index)
                                CalculateTotal()}}><BsTrashFill /> </Button></td>
                        </tr>
                        
                    )})}
                </tbody>
            </Table>
            <div>
                {totalPayment !== 0 &&
                    <Alert color={totalPayment < totalOrderState.total ? 'danger' : 'success'}>
                        {totalPayment < totalOrderState.total &&
                            <><span>La cantidad de dinero recibida es menor al valor total de la orden.</span><br /></>
                        }
                        <span><strong>Dinero recibido:</strong> {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' ,maximumFractionDigits:0 }).format(totalPayment)} </span><br />
                        <span><strong>Total orden:</strong> {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' ,maximumFractionDigits:0 }).format(totalOrderState.total)} </span>
                    </Alert>
                }
                {totalPayment > totalOrderState.total &&
                    <Alert color="warning">
                        <span><strong>Cambio: </strong>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' ,maximumFractionDigits:0 }).format(totalPayment - totalOrderState.total)}</span>
                    </Alert>
                }
            </div>
            <Modal isOpen={paymentWindow.isModalVisible} toggle={onCancel}>
                <ModalHeader toggle={onCancel}>
                    Medios de pago
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Seleccione un medio de pago</Label>
                            <Controller
                                control={selectPaymentForm.control}
                                name = 'PaymentCode'
                                render= { ({field}) => {

                                    return (
                                        <Input type="select" {...field}>
                                            <option disabled value=''> Seleccione una opción </option>
                                            {paymentMethodsList.map((pay) => {
                                                return (<option value={pay.Code} key={pay.Code}>{`${pay.Code} - ${pay.Description}`}</option>)
                                                })
                                            }
                                        </Input>
                                    )
                                    }
                                } />
                        </FormGroup>
                    </Form>
                    <br />
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={onCancel}>Cancelar</Button>
                    <Button color="primary" onClick={selectPaymentForm.handleSubmit(onAddButton)}>Agregar</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default PaymentMethodSection