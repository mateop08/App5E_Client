import { UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody } from "reactstrap"
import ProductsSection from "./components/ProductsSection"
import { useProductsModalsState } from "./hooks/useProductsModals"
import { useSelectOrderProduct } from "./hooks/useSelectOrderProduct"
import { useOrderProductsList } from "@/pages/OrderProductsServices//hooks/useOrderProducts"
import { useSelectBulkProductOut } from "./hooks/useSelectBulkProductOut"
import ServicesSection from "./components/ServicesSection"

import { ProductsContext, ProductsState } from "@/pages/OrderProductsServices/context/ProductsContext"



import { useServicesModalsState } from "./hooks/useServicesModals"
import { useOrderServicesList } from "@/pages/OrderProductsServices//hooks/useOrderServices"
import { ServicesContext, ServicesState } from "@/pages/OrderProductsServices/context/ServicesContext"

const OrderProductsServicesPage = () => {

    
    const orderProductsListState = useOrderProductsList()
    const productModalsState = useProductsModalsState()
    const selectOrderProduct = useSelectOrderProduct()
    const selectBulkProductOutState = useSelectBulkProductOut()

    const ProductsState: ProductsState = {
        orderProductsListState: orderProductsListState,
        productsModals: productModalsState,
        selectOrderProduct: selectOrderProduct,
        selectBulkProductOutState: selectBulkProductOutState
    }
    

    const orderServicesListState = useOrderServicesList()
    const servicesModalState = useServicesModalsState()

    const ServicesState: ServicesState = {
        orderServicesListState: orderServicesListState,
        servicesModals: servicesModalState
    }

    const productsTotal = orderProductsListState.orderProductsList.reduce(
        (total, p) => {
            return total + (p.Product.Price * p.Amount)
        },0)

    const servicesTotal = orderServicesListState.orderServicesList.reduce(
        (total, s) => {
            return total + (s.Service.Price * s.Amount)
        },0)
    

    return(
            <UncontrolledAccordion
                stayOpen
                >
                <AccordionItem>
                    <AccordionHeader targetId="1">
                        <strong>Productos</strong>
                    </AccordionHeader>
                    <AccordionBody accordionId="1">
                        <ProductsContext.Provider value={ProductsState}>
                            <ProductsSection />
                        </ProductsContext.Provider>
                    </AccordionBody>
                </AccordionItem>
                <AccordionItem>
                    <AccordionHeader targetId="2">
                        <strong>Servicios</strong>
                    </AccordionHeader>
                    <AccordionBody accordionId="2">
                        <ServicesContext.Provider value={ServicesState}>
                            <ServicesSection />
                        </ServicesContext.Provider>
                    </AccordionBody>
                </AccordionItem>
                <br />
                <div className="text-end">
                <strong style={{fontSize: '19px'}}>Productos: </strong>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' ,maximumFractionDigits:0 }).format(productsTotal)}
                <br />  
                <strong style={{fontSize: '19px'}}>Servicios: </strong>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' ,maximumFractionDigits:0 }).format(servicesTotal)}
                <br />
                <hr className="hr" />
                <strong style={{fontSize: '20px'}}>Total orden: </strong>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' ,maximumFractionDigits:0 }).format(productsTotal + servicesTotal)}
                </div>
            </UncontrolledAccordion>
    )
}

export default OrderProductsServicesPage