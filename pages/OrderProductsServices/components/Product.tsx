import { OrderProduct } from "@/models/OrderProducts.model"
import { Button, ListGroupItem, Tooltip } from "reactstrap"
import { useFormContext } from "react-hook-form"
import { productForm } from "./ProductsSection"
import { useProductsContext } from "../context/ProductsContext"
import OrderProductGestor from "@/models/OrderProducts.model"
import { useOrderContext } from "@/pages/Order/context/OrderContext"
import { useState } from "react"
import { BsPencilFill, BsTrashFill, BsNodePlusFill } from 'react-icons/bs';
import BulkProductOutSection from "./BulkProductOutSection"

interface ProductProps {
    orderProduct: OrderProduct
}

export const Product: React.FC<ProductProps> = ({orderProduct}) => {

    const {setValue} = useFormContext<productForm>()
    const { productsModals: { formWindow, crud, bulkWindow}, orderProductsListState:{refreshList},
        selectOrderProduct} = useProductsContext()
    const { orderState: {order: {OrderDocument, OrderNumber} }} = useOrderContext()

    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    const handleEditButton = (orderProduct: OrderProduct) => {
        const {Id, Product, Amount} = orderProduct
        setValue('Id', Id)
        setValue('Product', Product)
        setValue('Amount', Amount)
        crud.setToUpdate()
        formWindow.toggleModal()
    }

    const handleDeleteButton = async (orderProduct: OrderProduct) => {
        const {Product} = orderProduct
        try {
            const confirm = window.confirm(`¿Se va a eliminar el producto ${Product.Code} ${Product.Description}, esta seguro que desea continuar?`)
            if (confirm) {
                const response = await OrderProductGestor.Delete(orderProduct)
                window.alert(response)
                if (OrderNumber !== undefined) refreshList(OrderDocument, OrderNumber)
            }
        } catch (error) {
            window.alert(error)
        }
    }

    const handleAddBulkProductOut = () => {
        selectOrderProduct.change(orderProduct)
        bulkWindow.toggleModal()
    }

    const {Id, Amount, Product, InterventionRecord} = orderProduct
    const {Code, Description,Price, IsBulk} = Product
    //console.log(Product)
    
        return (
            <ListGroupItem>
                <div className="row" key={Id}>
                    <div className="col-lg-7 col-md-5 col-sm-5 col-xs-4"><strong>{Code}</strong>
                        <br />
                        <span id={'_'+Code}>{Description}</span>{' '}
                        {IsBulk && <Button color='primary' onClick={handleAddBulkProductOut}><BsNodePlusFill/>&nbsp;</Button>

                        }
                        
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-1"><strong>Cant: </strong>{Amount}</div>
                    <div className="col-lg-1 col-md-2 col-sm-2 col-xs-1">{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' ,maximumFractionDigits:0 }).format(Price)}</div>
                    <div className="col-lg-2 col-md-3 col-sm-3 col-xs-4">
                        <Button color="warning" onClick={() => {handleEditButton(orderProduct)}}><BsPencilFill/></Button>{' '}
                        <Button color='danger' onClick={() => {handleDeleteButton(orderProduct)}}><BsTrashFill/></Button>{' '}
                    </div>
                    
                    <Tooltip isOpen={tooltipOpen} target={'_'+Code} toggle={toggle}>
                        Agregó {InterventionRecord?.CreatedBy} a las {InterventionRecord?.CreationDate?.toFormat('T MMM d')}
                        <br />
                        {InterventionRecord?.ModifiedBy !== null && 
                            <>Modificó: {InterventionRecord?.ModifiedBy} a las {InterventionRecord?.ModificationDate?.toFormat('T MMM d')}</>
                        }
                    </Tooltip>
                    {

                    }
                </div>
                {IsBulk &&
                    <BulkProductOutSection OrderProductId={Id}/>
                }
            </ListGroupItem>
    )
    
}