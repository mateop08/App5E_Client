import { OrderDocument } from "@/models/OrderDocuments.model"
import { Button, Tooltip } from "reactstrap"
import { useFormContext } from "react-hook-form"
import { documentForm } from "../OrderDocumentsPage"
import { useDocumentsContext } from "../context/DocumentsContext"
import OrderDocumentGestor from "@/models/OrderDocuments.model"
import { useOrderContext } from "@/pages/Order/context/OrderContext"
import { useState } from "react"
import { BsPencilFill, BsTrashFill } from 'react-icons/bs';
import PreviewMultimedia from "@/components/PreviewMultimedia"

interface DocumentProps {
    orderDocument: OrderDocument
}

export const Document: React.FC<DocumentProps> = ({orderDocument}) => {

    const {setValue} = useFormContext<documentForm>()
    const { documentsModals: { formWindow, crud}, orderDocumentsListState:{refreshList} } = useDocumentsContext()
    const {orderState: { order: {OrderDocument, OrderNumber}}} = useOrderContext()

    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    const handleEditButton = (orderDocument: OrderDocument) => {
        const {Id, DocumentType} = orderDocument
        setValue('Id', Id)
        setValue('DocumentType', DocumentType)
        crud.setToUpdate()
        formWindow.toggleModal()
    }

    const handleDeleteButton = async (orderDocument: OrderDocument) => {
        const {DocumentType} = orderDocument
        const confirm = window.confirm(`¿Se va a eliminar el documento ${DocumentType.Code} ${DocumentType.Description}, esta seguro que desea continuar?`)
        if (confirm) {
            try {
                const response = await OrderDocumentGestor.Delete(orderDocument)
                window.alert(response)
                if (OrderNumber !== undefined) refreshList(OrderDocument, OrderNumber)
            } catch (error) {
                window.alert(error)
            }
            
        }
    }

    const {Id, DocumentType, InterventionRecord, FileName} = orderDocument
    const {Code, Description} = DocumentType
        return (
            <>
            <tr key={Id}>
                <td><strong>{Code}</strong>
                    <br />
                    <span id={'_'+Code}>{Description}</span>{' '}
                    <PreviewMultimedia fileName={FileName} collapse={true}/>   
                </td>
                <td><Button color="warning" onClick={() => {handleEditButton(orderDocument)}}><BsPencilFill/></Button>{' '}
                    <Button color='danger' onClick={() => {handleDeleteButton(orderDocument)}}><BsTrashFill/></Button>
                </td>
                {
                    <Tooltip
                        isOpen={tooltipOpen}
                        target={'_'+Code}
                        toggle={toggle}>
                    Agregó {InterventionRecord?.CreatedBy} a las {InterventionRecord?.CreationDate?.toFormat('T MMM d')}
                    <br />
                    {
                        InterventionRecord?.ModifiedBy !== null && 
                        <>Modificó: {InterventionRecord?.ModifiedBy} a las {InterventionRecord?.ModificationDate?.toFormat('T MMM d')}</>
                    }
                    

                    </Tooltip>
                }
            </tr>
            </>
    )
    
}