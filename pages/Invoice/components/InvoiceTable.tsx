import { Table } from "reactstrap"
import { OrderProduct } from "@/models/OrderProducts.model"
import { OrderService } from "@/models/OrderServices.model"
import { useEffect, useState } from "react"
import { useInvoicesContext } from "../contexts/InvoiceContext"
import OrderProductGestor from "@/models/OrderProducts.model"
import OrderServiceGestor from "@/models/OrderServices.model"
import { useFormContext } from "react-hook-form"
import { InvoiceForm } from "../InvoicePage"

const InvoiceTable = () => {
    
    const [orderProductsList, setOrderProductsList] = useState<OrderProduct[]>([])
    const [orderSevicesList, setOrderrSevicesList] = useState<OrderService[]>([])

    const {selectOrderState: {order}, totalOrderState} = useInvoicesContext()
    const invoiceFormContext = useFormContext<InvoiceForm>()


    const GetTotal = (productsList: OrderProduct[], servicesList: OrderService[]) => {
        const totalProducts = productsList.reduce(
            (totalProducts, p) => {
                return totalProducts + (p.Product.Price * p.Amount)
            },0)
        const totalServices = servicesList.reduce(
            (totalServices, s) => {
                return totalServices + (s.Service.Price * s.Amount)
            },0   )
    
        const total = totalProducts + totalServices
        totalOrderState.change(total)
    }

    useEffect( () => {
        const loadItems = async () => {
            const {OrderDocument, OrderNumber} = order
            if (OrderNumber !== undefined) {
                const productsList = await OrderProductGestor.List(OrderDocument, OrderNumber)
                setOrderProductsList(productsList)
                const servicesList = await OrderServiceGestor.List(OrderDocument, OrderNumber)
                setOrderrSevicesList(servicesList)
                GetTotal(productsList, servicesList)
            } else {
                setOrderProductsList([])
                setOrderrSevicesList([])
            }
        }
        loadItems()
    // eslint-disable-next-line
    },[order])

    

    return (
        <>
            <div style={{fontSize: '20px'}}>
            Consecutivo activo: <strong>{invoiceFormContext.watch("ConsecutiveCode")}</strong> 
                
            </div>
            <br />
            <Table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Descripción</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                </tr>
            </thead>
            <tbody>
                {
                    orderProductsList.map(
                        (p) => {
                            return(<tr key={p.Id}>
                                <td>{p.Product.Code}</td>
                                <td>{p.Product.Description}</td>
                                <td>{p.Amount}</td>
                                <td>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' ,maximumFractionDigits:0 }).format(p.Product.Price)}</td>
                            </tr>)
                        }
                    )
                }
                {
                    orderSevicesList.map(
                        (s) => {
                            return(<tr key={s.Id}>
                                <td>{s.Service.Code}</td>
                                <td>{s.Service.Description}</td>
                                <td>{s.Amount}</td>
                                <td>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' ,maximumFractionDigits:0 }).format(s.Service.Price)}</td>
                            </tr>)
                        }
                    )
                }

            </tbody>
        </Table>
        <div className="text-end" style={{fontSize: '24px'}}>
            Total: <strong>
                        {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' ,maximumFractionDigits:0 }).format(totalOrderState.total)}
                </strong>
        </div>
        <hr className="hr" />
    </>
    )
}

export default InvoiceTable