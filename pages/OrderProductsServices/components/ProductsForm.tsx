
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Button } from "reactstrap"
import { useProductsContext } from "../context/ProductsContext"
import { productForm } from "./ProductsSection"
import { useFormContext } from "react-hook-form"
import OrderProductGestor from "@/models/OrderProducts.model"
import { useOrderContext } from "@/pages/Order/context/OrderContext"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

const ProductsForm: React.FC = () => {
    
    const {productsModals: {formWindow, searchWindow, crud, searchedProducts: {clearList}}, orderProductsListState: {refreshList}} = useProductsContext()
    const {isModalVisible, toggleModal} = formWindow
    const { isCreating, isUpdating } = crud
    const { register, handleSubmit, reset } = useFormContext<productForm>()
    const { orderState: {order: {OrderDocument, OrderNumber}}} = useOrderContext()
    const user = useSelector((state: RootState) => state.userReducer.User)

    const save = async (data: productForm) => {
        const {Id, Product, Amount} = data
        try {
            if (OrderNumber === undefined) throw("Numero de documento indefinido no es posible ingresar")
            if (Amount === null) throw("Cantidad indefinida no es posible ingresar") 
            if (user === null) throw("Usuario indefinido")

            let response
            if (isCreating) response = await OrderProductGestor.Create(OrderDocument, OrderNumber, Product, Amount, user)

            if (isUpdating) {
                if (Id === undefined) throw("Error no es posible actualizar el producto si la cantidad no esta definida.") 
                response = await OrderProductGestor.Update(Id, Product, Amount, user)
            }

            window.alert(response)
            formWindow.toggleModal()
            refreshList(OrderDocument, OrderNumber)
            reset()
        } catch (error) {
            window.alert(error)
        }
        
    }

    const handleSearchButton = () => {
        formWindow.toggleModal()
        searchWindow.toggleModal()
        //reset()
    }

    const handleCancel = () => {
        crud.setToNone()
        toggleModal()
        reset()
        clearList()
    }

    return (
        <Modal isOpen={isModalVisible} toggle={handleCancel}>
            <ModalHeader toggle={handleCancel}>
                {isCreating && 'Agregar '}
                {isUpdating && 'Modificar '} 
                Producto</ModalHeader>
            <ModalBody>
                <Button color="primary" onClick={handleSearchButton}>Buscar</Button>
                <br />
                <br />
                <Form>
                    <FormGroup>
                        <Label>Codigo</Label>
                        <input className="form-control" {...register('Product.Code')} disabled={true} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Descripción</Label>
                        <input className="form-control" {...register('Product.Description')} disabled={true}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Precio</Label>
                        <input className="form-control" {...register('Product.Price')} disabled={true}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Cantidad</Label>
                        <input className="form-control" type="number" {...register('Amount')} />
                    </FormGroup>
                </Form>
                    
                
                <br /><br />
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={handleCancel}>Cancelar</Button>
                <Button color="primary" onClick={handleSubmit(save)}>Guardar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ProductsForm