import { OrderAnnotation } from "@/models/OrderAnnotations.model"
import { Button, Tooltip } from "reactstrap"
import { useFormContext } from "react-hook-form"
import { annotationForm } from "../OrderAnnotationsPage"
import { useAnnotationsContext } from "../context/AnnotationsContext"
import OrderAnnotationGestor from "@/models/OrderAnnotations.model"
import { useOrderContext } from "@/pages/Order/context/OrderContext"
import { useState } from "react"
import { BsPencilFill, BsTrashFill } from 'react-icons/bs';
import EvidenceSection from "./EvidenceSection"

interface AnnotationProps {
    orderAnnotation: OrderAnnotation
}

export const Annotation: React.FC<AnnotationProps> = ({orderAnnotation}) => {

    const {setValue} = useFormContext<annotationForm>()
    const { annotationsModals: { formWindow, crud}, orderAnnotationsListState:{refreshList} } = useAnnotationsContext()
    const {orderState: { order: {OrderDocument, OrderNumber}}} = useOrderContext()

    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    const handleEditButton = (orderAnnotation: OrderAnnotation) => {
        const {Id, AnnotationType, Technician, Note } = orderAnnotation
        setValue('Id', Id)
        setValue('AnnotationType', AnnotationType)
        setValue('Technician', Technician)
        setValue('Note', Note)
        crud.setToUpdate()
        formWindow.toggleModal()
    }

    const handleDeleteButton = async (orderAnnotation: OrderAnnotation) => {
        const {AnnotationType} = orderAnnotation
        const confirm = window.confirm(`¿Se va a eliminar el annotationo ${AnnotationType.Code} ${AnnotationType.Description}, esta seguro que desea continuar?`)
        if (confirm) {
            try {
                const response = await OrderAnnotationGestor.Delete(orderAnnotation)
                window.alert(response)
                if (OrderNumber !== undefined) refreshList(OrderDocument, OrderNumber)
            } catch (error) {
                window.alert(error)
            }
            
        }
    }

    const {Id, AnnotationType, Note, InterventionRecord} = orderAnnotation
    const {Code, Description } = AnnotationType
    
        return (
            <>
                <div className="row" key={Id}>
                    <div className="col-sm-8">
                        <strong>{Code}</strong><br />
                        <span id={'_'+Code}>{Description}</span><br />{' '}
                        <span>{Note}</span>{' '} 
                    </div>
                    <div className="col-sm-4 text-end">
                        <Button color="warning" onClick={() => {handleEditButton(orderAnnotation)}}><BsPencilFill/></Button>{' '}
                        <Button color='danger' onClick={() => {handleDeleteButton(orderAnnotation)}}><BsTrashFill/></Button>
                    </div>
                </div>
                <EvidenceSection annotationId={Id} />

                <Tooltip isOpen={tooltipOpen} target={'_'+Code} toggle={toggle}>
                    Agregó {InterventionRecord?.CreatedBy} a las {InterventionRecord?.CreationDate?.toFormat('T MMM d')}
                    <br />
                    {
                        InterventionRecord?.ModifiedBy !== null && 
                        <>Modificó: {InterventionRecord?.ModifiedBy} a las {InterventionRecord?.ModificationDate?.toFormat('T MMM d')}</>
                    }
                </Tooltip>
            </>
    )
    
}