import { Modal, ModalHeader, ModalBody, Button, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap"
import { useForm, Controller } from "react-hook-form"
import BulkProductOutAnnullationGestor from "@/models/BulkProductOutAnnullations.model"
import { useEffect } from "react"
import { ModalGestor } from "@/hooks/useModal.hook"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

interface BulkProductOutAnnullationForm {
    ModalGestor: ModalGestor,
    OutId: number,
    ProductCode: string,
    OnSaveCallback: (bulkProductOut: bulkOutForm) => void
}

interface bulkOutForm {
    ProductCode: string,
    OutId: number,
    Amount: number | null,
    AnnulledReason: string
}

const BulkProductOutAnnullationForm: React.FC<BulkProductOutAnnullationForm> = (props) => {
    const {ModalGestor: {isModalVisible, toggleModal}, ProductCode, OutId,
        OnSaveCallback} = props

    const initialState: bulkOutForm = {
        OutId: 0,
        Amount: null,
        ProductCode: '',
        AnnulledReason: ''
    }
    const {register, setValue, handleSubmit, reset, control} = useForm<bulkOutForm>( {defaultValues: initialState} )

    const user = useSelector((state: RootState) => state.userReducer.User)

    const save = async (data: bulkOutForm) => {
        
        try {
            const {ProductCode, Amount, OutId, AnnulledReason} = data
            if (Amount === null) throw("No es posible guardar la salida de producto a granel si no se define la cantidad.")
            if (user === null) throw("No es posible guardar si el usuario es NULL.")
            const response = await BulkProductOutAnnullationGestor.Create(ProductCode, Amount, OutId, AnnulledReason, user)
            window.alert(response)
            OnSaveCallback(data)
            reset()
            toggleModal()
        } catch (error) {
            window.alert(error)
        }
    }

    const cancel = () => {
        toggleModal()
    }

    useEffect(() => {
        reset()
        setValue('ProductCode', ProductCode)
        setValue('OutId', OutId)
    },[ProductCode, OutId, reset, setValue])


    return (
        <Modal isOpen={isModalVisible} toggle={cancel}>
            <ModalHeader toggle={cancel}>Anulación de salida de producto a granel</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Cantidad</Label>
                        <input className="form-control" type="number" {...register('Amount', {valueAsNumber: true})} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Motivo de anulación</Label>
                        <Controller
                            control={control}
                            name = 'AnnulledReason'
                            rules = {{}}
                            render={ ({field}) => {
                                return <Input type="textarea" {...field} ></Input>
                            }
                            } />
                    </FormGroup>
                    
                </Form>
                
                <br /><br />
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit(save)}>Guardar</Button>
                <Button color="secondary" onClick={cancel}>Cancelar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default BulkProductOutAnnullationForm