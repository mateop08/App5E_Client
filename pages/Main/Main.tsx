//Components
import User from "@/components/User";
import AppDocumentList from "@/components/AppDocumentList";
import OrderList from "./components/OrderList";
import OrderFilter from "./components/OrderFilter";
import { OrderListContext } from "./context/OrderListContext";
import { OrderListState, useOrderList } from "./hooks/useOrderList";

const Main = () => {
  
  const OrderListHook = useOrderList()

  const ListState: OrderListState = OrderListHook
  
  return (
    <OrderListContext.Provider value={ListState}>
        <OrderFilter />
        <OrderList />
        <User />
        <AppDocumentList />
    </OrderListContext.Provider>
  )
}
export default Main;