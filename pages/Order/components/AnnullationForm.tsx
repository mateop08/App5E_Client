import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, FormGroup, Input } from "reactstrap"
import { useForm, Controller } from "react-hook-form"
import { useOrderContext } from "../context/OrderContext"
import OrderGestor from "@/models/Orders.model"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import FormError from "@/components/FormError"

interface annullForm {
    AnnulledReason: string
}

const AnnullationForm: React.FC = () => {

    const { orderState: {order, refreshOrder}, annullationWindow: {isModalVisible, toggleModal}} = useOrderContext()
    const initialState: annullForm = { AnnulledReason: ''}
    const { handleSubmit, control, formState: {errors} } = useForm<annullForm>({defaultValues: initialState})
    const user = useSelector((state: RootState) => state.userReducer.User)
    const {OrderDocument, OrderNumber} = order

    const onAnnull = async (data: annullForm) => {
        try {
            if (user === null) throw("No es posible anular si el usuario es NULL")
            if (OrderNumber === undefined) throw("No es posible anular sin el numero de orden definido.")
            const {AnnulledReason} = data
            const response = await OrderGestor.Annull(order, user, AnnulledReason)
            window.alert(response)
            toggleModal()
            refreshOrder(OrderDocument, OrderNumber)
        } catch (error) {
            window.alert(error)
        }
        
    }

    const cancel = () => {
        toggleModal()
    }

    return (
        <Modal isOpen={isModalVisible} toggle={cancel}>
            <ModalHeader toggle={cancel}>Anulación de orden</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label>Motivo de anulación</Label>
                    <Controller
                                control={control}
                                name = 'AnnulledReason'
                                rules = {{
                                    required: {
                                        value: true,
                                        message: 'Motivo de anulación requerido'
                                    }
                                }}
                                render={ ({field}) => {
                                    return <Input type="textarea" {...field}></Input>
                                }
                                } />
                    {
                        errors.AnnulledReason?.message && <FormError error={errors.AnnulledReason?.message} />
                    }
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit(onAnnull)}>Anular</Button>{' '}
                <Button color="secondary" onClick={cancel}>
                Cancelar
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default AnnullationForm