import { Button, ListGroup } from "reactstrap"
import { useProductsContext } from "../context/ProductsContext"
import { useEffect } from "react"
import { useOrderContext } from "@/pages/Order/context/OrderContext"
import {Product} from "@/pages/OrderProductsServices/components/Product"
import { BsFillPlusCircleFill } from "react-icons/bs"

const ProductsTable = () => {
    
    const { productsModals: {searchWindow, crud}, orderProductsListState:{orderProductsList, refreshList} } = useProductsContext()

    const {orderState: { order: {OrderDocument, OrderNumber}}} = useOrderContext()
    
    const handleAddProductButton = () => {
        crud.setToCreate()
        searchWindow.toggleModal()
    }

    useEffect(() => {
        if (OrderNumber !== undefined) refreshList(OrderDocument, OrderNumber)
    // eslint-disable-next-line
    },[OrderNumber])

    return (
        <div className="table-responsive">
            <div className="text-end">
                <Button color='primary' onClick={handleAddProductButton}><BsFillPlusCircleFill/></Button>
            </div>
            <ListGroup flush>
                {
                    orderProductsList.map((orderProduct) => <Product key={orderProduct.Id} orderProduct={orderProduct} />)
                }
            </ListGroup>
        </div>
    )
}

export default ProductsTable