import { Button, ListGroup, ListGroupItem } from "reactstrap"
import { useAnnotationsContext } from "../context/AnnotationsContext"
import { useEffect } from "react"
import { useOrderContext } from "@/pages/Order/context/OrderContext"
import {Annotation} from "@/pages/OrderAnnotations/components/Annotation"
import { BsFillPlusCircleFill } from "react-icons/bs"

const AnnotationsTable = () => {

    const { annotationsModals: {searchWindow, crud}, orderAnnotationsListState:{orderAnnotationsList, refreshList} } = useAnnotationsContext()

    const {orderState: { order: {OrderDocument, OrderNumber}}} = useOrderContext()
    
    const handleAddAnnotationButton = () => {
        crud.setToCreate()
        searchWindow.toggleModal()
    }

    useEffect(() => {
        if (OrderNumber !== undefined) refreshList(OrderDocument, OrderNumber)
    // eslint-disable-next-line
    },[OrderNumber])

    return (
        <>
            <div className="text-end">
                <Button color='primary' onClick={handleAddAnnotationButton}><BsFillPlusCircleFill/> Anotación</Button>
            </div>
            <br />
            <ListGroup >
                {
                orderAnnotationsList.map((orderAnnotation) => {
                return (
                    <ListGroupItem key={orderAnnotation.Id}>
                        <Annotation key={orderAnnotation.Id} orderAnnotation={orderAnnotation} />
                    </ListGroupItem>)})
                }
            
            </ListGroup>
        </>
    )
}

export default AnnotationsTable