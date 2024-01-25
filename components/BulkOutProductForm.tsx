import { Modal, ModalHeader, ModalBody, Button, ModalFooter, Form, FormGroup, Label } from "reactstrap"
import { useForm } from "react-hook-form"
import BulkProductOutGestor from "@/models/BulkProductOuts.model"
import { useEffect } from "react"
import { ModalGestor } from "@/hooks/useModal.hook"
import Switch from "./Switch"
import useToggle from "@/hooks/useToggle.hooks"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

interface BulkProductOutForm {
    ModalGestor: ModalGestor,
    OrderProductId: number | null,
    ProductCode: string,
    ForServiceOrder: boolean,
    OnSaveCallback: (bulkProductOut: bulkOutForm) => void
}

interface bulkOutForm {
    OrderProductId: number | null,
    Amount: number | null,
    ProductCode: string,
    InitialNumber: number | null,
    FinalNumber: number | null,
    WithDigitalDispenser: boolean,
    ForServiceOrder: boolean,
}

const BulkProductOutForm: React.FC<BulkProductOutForm> = (props) => {
    const {ModalGestor: {isModalVisible, toggleModal}, ProductCode, OrderProductId, ForServiceOrder,
        OnSaveCallback} = props

    const mode = useToggle()

    const initialState: bulkOutForm = {
        OrderProductId: null,
        Amount: null,
        ProductCode: '',
        InitialNumber: null,
        FinalNumber: null,
        WithDigitalDispenser: false,
        ForServiceOrder: false,
    }
    const {register, setValue, handleSubmit, reset} = useForm<bulkOutForm>( {defaultValues: initialState} )

    const user = useSelector((state: RootState) => state.userReducer.User)

    const save = async (data: bulkOutForm) => {
        console.log(data)
        try {
            const {Amount, ...rest} = data
            if (Amount === null) throw("No es posible guardar la salida de producto a granel si no se define la cantidad.")
            if (user === null) throw("No es posible guardar si el usuario es NULL.")
            const AdaptData = {
                ...rest,
                Amount: Amount
            }
            const response = await BulkProductOutGestor.Create(AdaptData, user)
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

    const handleChangeMode = () => {
        mode.toggle()
        setValue('WithDigitalDispenser', !mode.isToggle)
        setValue('InitialNumber', null)
        setValue('FinalNumber', null)
        setValue('Amount', null)
    }

    useEffect(() => {
        reset()
        setValue('ProductCode', ProductCode)
        setValue('OrderProductId', OrderProductId)
        setValue('ForServiceOrder',ForServiceOrder)
        setValue('WithDigitalDispenser', mode.isToggle)
    },[ProductCode, OrderProductId, ForServiceOrder, mode.isToggle, reset, setValue])

    return (
        <Modal isOpen={isModalVisible} toggle={cancel}>
            <ModalHeader toggle={cancel}>Salida de producto a granel</ModalHeader>
            <ModalBody>
                <fieldset>
                    <div className='seccionCarnet'>
                        <Switch isToggled={mode.isToggle} onToggle={handleChangeMode}/>
                        <span className='tituloCarnet'>Con dispensador digital</span>
                    </div>
                </fieldset>
                <br />
                <Form>
                    {mode.isToggle &&
                    <>
                        <FormGroup>
                        <Label>Lectura inicial</Label>
                            <input className="form-control" type="number" {...register('InitialNumber', {valueAsNumber: true})}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Lectura final</Label>
                            <input className="form-control" type="number" {...register('FinalNumber', {valueAsNumber: true})} />
                        </FormGroup>
                    </>
                    }
                    
                    <FormGroup>
                        <Label>Cantidad</Label>
                        <input className="form-control" type="number" {...register('Amount', {valueAsNumber: true})} />
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

export default BulkProductOutForm