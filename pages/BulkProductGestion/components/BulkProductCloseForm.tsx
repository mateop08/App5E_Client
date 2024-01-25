import { Modal, ModalHeader, ModalBody, Button, ModalFooter, Form, FormGroup, Label } from "reactstrap"
import { useForm } from "react-hook-form"
import BulkProductOpeningGestor, { BulkProductOpening } from "@/models/BulkProductOpenings.model"
import { useEffect } from "react"
import { ModalGestor } from "@/hooks/useModal.hook"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

interface BulkProductCloseFormProps {
    ModalGestor: ModalGestor,
    OnSaveCallback: (bulkProductOut: bulkOpeningForm) => void
    bulkProductOpening: BulkProductOpening
}

interface bulkOpeningForm {
    ProductCode: string,
    OpeningId: number,
    LeftOverAmount: number | null
}

const BulkProductCloseForm: React.FC<BulkProductCloseFormProps> = (props) => {
    const {ModalGestor: {isModalVisible, toggleModal}, OnSaveCallback, bulkProductOpening} = props


    const initialState: bulkOpeningForm = {
        ProductCode: '',
        OpeningId: 0,
        LeftOverAmount: null
    }
    const { register, setValue, handleSubmit, reset, watch} = useForm<bulkOpeningForm>( {defaultValues: initialState} )

    const user = useSelector((state: RootState) => state.userReducer.User)

    const save = async (data: bulkOpeningForm) => {
        try {
            const {OpeningId, LeftOverAmount} = data
            if (user === null) throw("No es posible guardar si el usuario es NULL.")
            if (LeftOverAmount === null) throw("No es posible guardar si LeftOverAmount es NULL.")
            const response = await BulkProductOpeningGestor.Close(OpeningId, LeftOverAmount, user)
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
        setValue('ProductCode', bulkProductOpening.ProductCode)
        setValue('OpeningId', bulkProductOpening.OpeningId)
    },[bulkProductOpening, reset, setValue])

    return (
        <Modal isOpen={isModalVisible} toggle={cancel}>
            <ModalHeader toggle={cancel}>Cierre de producto a granel</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Producto</Label>
                        <input className="form-control" type="text" value={watch('ProductCode')} disabled={true}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Sobrante de producto</Label>
                        <input className="form-control" type="number" {...register('LeftOverAmount', {valueAsNumber: true})}/>
                    </FormGroup>
                </Form>
                <br /><br />
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit(save)}>Aperturar</Button>
                <Button color="secondary" onClick={cancel}>Cancelar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default BulkProductCloseForm