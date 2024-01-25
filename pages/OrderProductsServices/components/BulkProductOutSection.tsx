import { BsFillFuelPumpFill } from "react-icons/bs"
import Preview from "@/components/Preview"
import { ListGroupItem, ListGroup } from "reactstrap"
import { useEffect, useState } from "react"
import BulkProductOutGestor from "@/models/BulkProductOuts.model"
import BulkProductOut from "./BulkProductOut"
import { useProductsContext } from "../context/ProductsContext"

interface BulkProductOutSectionProps {
    OrderProductId: number
}

const BulkProductOutSection: React.FC<BulkProductOutSectionProps> = ({OrderProductId}) => {

    const [bulkProductOutsList, setBulkProductOutsList] = useState<BulkProductOut[]>([])
    const {orderProductsListState: {refreshList}} = useProductsContext()

    useEffect(() => {
        BulkProductOutGestor.ListByOrderProductId(OrderProductId)
            .then((data) => setBulkProductOutsList(data))
            .catch((error) => window.alert(error))
    },[OrderProductId, refreshList])

    //console.log(bulkProductOutsList)
    return (
        <Preview Icon={BsFillFuelPumpFill} collapse={true}>
            <ListGroup>
                {
                    bulkProductOutsList.map((bp) => <ListGroupItem color="secondary" key={bp.OutId}><BulkProductOut BulkProductOut={bp} /></ListGroupItem>)
                }
                
            </ListGroup>
        </Preview>
    )
}

export default BulkProductOutSection