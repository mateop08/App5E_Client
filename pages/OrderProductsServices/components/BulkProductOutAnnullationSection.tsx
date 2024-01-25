import { ListGroup, ListGroupItem } from "reactstrap"
import { useState, useEffect } from "react"
import BulkProductOutAnnullationGestor from "@/models/BulkProductOutAnnullations.model"
import Preview from "@/components/Preview"
import { BsFillEraserFill } from "react-icons/bs"
import BulkProductOutAnnullation from "./BulkProductOutAnnullation"

interface BulkProductOutSectionProps {
    OutId: number
}


const BulkProductOutAnnullationSection: React.FC<BulkProductOutSectionProps> = ({OutId}) => {
    const [bulkProductOutAnnullationsList, setBulkProductOutAnnullationsList] = useState<BulkProductOutAnnullation[]>([])

    useEffect(() => {
        BulkProductOutAnnullationGestor.ListByOutId(OutId)
            .then((data) => setBulkProductOutAnnullationsList(data))
            .catch((error) => window.alert(error))
    },[OutId])

    return (
        <Preview Icon={BsFillEraserFill} collapse={true}>
            <ListGroup>
                {
                    bulkProductOutAnnullationsList.map((bpAnullation) => <ListGroupItem color="danger" key={bpAnullation.AnnullationId}><BulkProductOutAnnullation bulkProductOutAnnulation={bpAnullation}  /></ListGroupItem>)
                }
                
            </ListGroup>
        </Preview>
    )
}

export default BulkProductOutAnnullationSection