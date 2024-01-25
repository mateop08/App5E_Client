import { Table, Button } from "reactstrap"
import { useDocumentsContext } from "../context/DocumentsContext"
import { useEffect } from "react"
import { useOrderContext } from "@/pages/Order/context/OrderContext"
import { Document } from "@/pages/OrderDocuments/components/Document"
import { BsFillPlusCircleFill } from "react-icons/bs"

const DocumentsTable = () => {

    const { documentsModals: {searchWindow, crud}, orderDocumentsListState:{orderDocumentsList, refreshList} } = useDocumentsContext()

    const {orderState: { order: {OrderDocument, OrderNumber}}} = useOrderContext()

    const handleAddDocumentButton = () => {
        crud.setToCreate()
        searchWindow.toggleModal()
    }

    useEffect(() => {
        if (OrderNumber !== undefined) refreshList(OrderDocument, OrderNumber)
    // eslint-disable-next-line
    },[OrderNumber])

    return (
        <div className="table-responsive">
            <div className="text-end">
                <Button color='primary' onClick={handleAddDocumentButton}><BsFillPlusCircleFill/></Button>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>Documento</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderDocumentsList.map((orderDocument) => <Document key={orderDocument.Id} orderDocument={orderDocument} />)
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default DocumentsTable