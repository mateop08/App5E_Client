import { Modal, ModalHeader, ModalBody, Button, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap"
import { useForm, Controller } from "react-hook-form"
import BulkProductOpeningGestor from "@/models/BulkProductOpenings.model"
import { useEffect, useState } from "react"
import { ModalGestor } from "@/hooks/useModal.hook"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import ProductsGestor, { Product } from "@/models/Products.model"

interface BulkProductOpeningForm {
    ModalGestor: ModalGestor,
    OnSaveCallback: (bulkProductOut: bulkOpeningForm) => void
}

interface bulkOpeningForm {
    Product: Product
}

const BulkProductOpeningForm: React.FC<BulkProductOpeningForm> = (props) => {
    const {ModalGestor: {isModalVisible, toggleModal}, OnSaveCallback} = props


    const initialState: bulkOpeningForm = {
        Product: ProductsGestor.GetEmpy()
    }
    const { control, setValue, handleSubmit, watch, reset} = useForm<bulkOpeningForm>( {defaultValues: initialState} )

    const user = useSelector((state: RootState) => state.userReducer.User)
    const OrderDocument = useSelector((state: RootState) => state.userReducer.ActiveAppDocument)
    const [bulkProductsList, setBulkProductsList] = useState<Product[]>([])

    const save = async (data: bulkOpeningForm) => {
        try {
            const {Product} = data
            if (user === null) throw("No es posible guardar si el usuario es NULL.")
            const response = await BulkProductOpeningGestor.Create(Product.Code, user)
            window.alert(response)
            OnSaveCallback(data)
            reset()
            toggleModal()
        } catch (error) {
            window.alert(error)
        }
    }

    const cancel = () => {
        reset()
        toggleModal()
    }


    useEffect(() => {
        reset()
        if(OrderDocument !== '') ProductsGestor.ListBulk(OrderDocument)
            .then((data) => setBulkProductsList(data))
    },[OrderDocument, reset, setValue])

    return (
        <Modal isOpen={isModalVisible} toggle={cancel}>
            <ModalHeader toggle={cancel}>Apertura de producto a granel</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Estados de orden</Label>
                        <Controller
                            control={control}
                            name = 'Product.Code'
                            rules = {{}}
                            render= { ({field}) => {

                                return (
                                    <Input type="select" {...field}>
                                        <option disabled value=''> Seleccione una opción </option>
                                        {bulkProductsList.map((bulkProduct) =>  <option value={bulkProduct.Code} key={bulkProduct.Code}>{bulkProduct.Description}</option>)}
                                    </Input>
                                )
                                }
                            } />
                    </FormGroup>
                    <FormGroup>
                        <Label>Codigo</Label>
                        <input className="form-control" value={watch('Product.Code')} disabled={true} maxLength={100}/>
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

export default BulkProductOpeningForm