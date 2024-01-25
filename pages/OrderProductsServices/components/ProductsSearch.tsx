import { Modal, ModalHeader, ModalBody, Button, Table, ModalFooter } from "reactstrap"
import { useProductsContext } from "../context/ProductsContext"
import { useFormContext } from "react-hook-form"
import { useOrderContext } from "@/pages/Order/context/OrderContext"
import ProductsGestor, { Product } from "@/models/Products.model"
import { productForm } from "./ProductsSection"
import { KeyboardEventHandler } from "react"

const ProductsSearch = () => {

    const {productsModals: {searchWindow, formWindow, crud, searchedProducts: {list, change, clearList}}} = useProductsContext()
    const {isModalVisible, toggleModal} = searchWindow
    const {orderState: {order: {OrderDocument}}} = useOrderContext()
    const {setValue, reset, register, handleSubmit, watch} = useFormContext<productForm>()

    const search = async (data: productForm) => {
        const {SearchedDescription} = data
        clearList()
        try {
            const list = await ProductsGestor.List(OrderDocument,SearchedDescription)
        change(list)
        } catch (error) {
            window.alert(error)
        }
        
    }

    const handleSelect = (product: Product) => {
        searchWindow.toggleModal()
        formWindow.toggleModal()
        setValue("Product", product)
    }

    const handleCancel = () => {
        clearList()
        crud.setToNone()
        toggleModal()
        reset()
    }

    const handleKeyDown: KeyboardEventHandler = async (event)  => {
        
        if (event.key === 'Enter' || event.key == 'Tab') {
            await search(watch())
            return
        }
    }

    return(
        <Modal className='modal-dialog modal-lg' isOpen={isModalVisible} toggle={handleCancel}>
            <ModalHeader toggle={handleCancel}>Buscar productos</ModalHeader>
            <ModalBody>
                <input className="form-control" {...register('SearchedDescription')} 
                    name='SearchedDescription'
                    onKeyDown={handleKeyDown}/>
                <br />
                <Button color="primary" onClick={handleSubmit(search)}>Buscar</Button>
                <br /><br />
                <div className="table-responsive">
                    <Table>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                list.map((p) => {
                                    return (
                                        <tr key={p.Code}>
                                            <td>
                                                <strong>{p.Code}</strong>
                                                <br />
                                                {p.Description}
                                            </td>
                                            <td>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' ,maximumFractionDigits:0 }).format(p.Price)}</td>
                                            <td>{p.Stock}</td>
                                            <td><Button color="primary" onClick={() => {handleSelect(p)}}>Seleccionar</Button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={handleCancel}>
                Cancelar
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default ProductsSearch