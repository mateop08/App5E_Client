import { Card, CardBody, CardText, Button, CardFooter } from "reactstrap"
import { BsPencilFill, BsTrashFill } from "react-icons/bs"
import { useAnnotationsContext } from "../context/AnnotationsContext"
import OrderAnnotationDetailGestor, { OrderAnnotationDetail } from "@/models/OrderAnnotationDetails.model"
import PreviewMultimedia from "@/components/PreviewMultimedia"
import { useOrderContext } from "@/pages/Order/context/OrderContext"

interface EvidenceProps {
    orderAnnotationDetail: OrderAnnotationDetail
}

const Evidence: React.FC<EvidenceProps> = ({orderAnnotationDetail}) => {

    const {evidencesModals: {formWindow, crud}, selectAnnotation, selectEvidence, orderAnnotationsListState: {refreshList}} = useAnnotationsContext()
    const {orderState: { order: {OrderDocument, OrderNumber}}} = useOrderContext()

    const handleEditEvidence = () => {
        formWindow.toggleModal()
        selectAnnotation.change(orderAnnotationDetail.AnnotationId)
        selectEvidence.change(orderAnnotationDetail)
        crud.setToUpdate()
    }

    const handleDeleteEvidence = async () => {
        try {
            const confirm = window.confirm("Se va a eliminar la evidencia, esta seguro que desea continuar?")
            if (confirm) {
                const response = await OrderAnnotationDetailGestor.Delete(orderAnnotationDetail)
                if (OrderNumber === undefined) throw("Error al refrescar las anotacioines de orden, no se puede refrescar")
                window.alert(response)
                refreshList(OrderDocument, OrderNumber)
            }
        } catch (error) {
            window.alert(error)
        }
        
    }
    
    return (
        <Card className="m-2" style={{minWidth:'300px', maxWidth: '300px', maxHeight: '300px'}}>
            <CardBody >
                <PreviewMultimedia fileName={orderAnnotationDetail.FileName} collapse={false} />
                <CardText >
                {orderAnnotationDetail.Note}
                </CardText>
                
            </CardBody>
            <CardFooter className="text-end">
                    <Button color="warning" onClick={handleEditEvidence}><BsPencilFill/></Button>{' '}
                    <Button color='danger' onClick={handleDeleteEvidence}><BsTrashFill/></Button>
                </CardFooter>
        </Card>
    )
}

export default Evidence