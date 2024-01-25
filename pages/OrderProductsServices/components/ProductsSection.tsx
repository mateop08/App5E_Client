import { FormProvider, useForm } from "react-hook-form"
//Context
//Custom hooks

//Components
import ProductsTable from "@/pages/OrderProductsServices/components/ProductsTable"
import ProductsSearch from "@/pages/OrderProductsServices/components/ProductsSearch"
import ProductsForm from "@/pages/OrderProductsServices/components/ProductsForm"
//Models
import { OrderProduct } from "@/models/OrderProducts.model"
import ProductsGestor from "@/models/Products.model"

import BulkProductOutForm from "@/components/BulkOutProductForm"
import { useOrderContext } from "@/pages/Order/context/OrderContext"
import BulkProductOutAnnullationForm from "@/components/BulkProductOutAnnullationForm"
import { useProductsContext } from "../context/ProductsContext"



export interface productForm extends Pick<OrderProduct, 'Product' | 'Id' >{
    Amount: number | null,
    SearchedDescription: string
}

const ProductsSection = () => {

    const initialProductFormState: productForm = {
        Id: 0,
        Product: ProductsGestor.GetEmpy(),
        Amount: null,
        SearchedDescription: ''
    }

    const {productsModals, selectOrderProduct, orderProductsListState, selectBulkProductOutState} = useProductsContext()
    const formMethods = useForm<productForm>( {defaultValues: initialProductFormState} )
    const {orderState:{ order: {OrderDocument, OrderNumber} }} = useOrderContext()

    return (
        
        <>
            <FormProvider {...formMethods}>
                <ProductsTable />
                <ProductsForm/>
                <ProductsSearch />
            </FormProvider>
            <BulkProductOutForm 
                ModalGestor={productsModals.bulkWindow} 
                OrderProductId={selectOrderProduct.selectOrderProduct.Id}
                ProductCode={selectOrderProduct.selectOrderProduct.Product.Code}
                ForServiceOrder={true}
                OnSaveCallback={() => orderProductsListState.refreshList(OrderDocument, Number(OrderNumber))}/>
            <BulkProductOutAnnullationForm 
                ModalGestor={productsModals.bulkAnnullationWindow}
                OutId={selectBulkProductOutState.selectBulkProductOut.OutId}
                ProductCode={selectBulkProductOutState.selectBulkProductOut.ProductCode}
                OnSaveCallback={() => orderProductsListState.refreshList(OrderDocument, Number(OrderNumber))}/>
        </>
        
    )
}

export default ProductsSection