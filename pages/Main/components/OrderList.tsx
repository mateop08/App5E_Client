import { Table } from 'reactstrap';
import { useEffect } from 'react'
import OrderGestor from '@/models/Orders.model';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useOrderListContext } from '../context/OrderListContext';
import Order from './Order';

const OrderList = () => {
    
    const {ordersList, changeList } = useOrderListContext()

    const ActiveAppDocument = useSelector((state: RootState) => state.userReducer.ActiveAppDocument)
    const loadOrders = () => {
        if (ActiveAppDocument === '') return
        OrderGestor.ListOpenOrdersByOrderDocument(ActiveAppDocument)
            .then((data) => {
                //console.log(data)
                return changeList(data)},
                (error) => console.log(error))
    }

    useEffect(() => {
        loadOrders()

    // eslint-disable-next-line
    }, [ActiveAppDocument])

    return (
        <div>
            <div className="table-responsive">
            <Table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Fecha y hora</th>
                        <th>Placa</th>
                        <th>Vehiculo</th>
                        <th></th>
                        <th>Detalle</th>    
                    </tr>
                </thead>
                <tbody>
                    {
                        ordersList.map((order) => <Order key={order.OrderNumber} order={order}></Order>)
                    }
                </tbody>
            </Table>
            </div>
        </div>
    );
    
}

export default OrderList;