import { Modal, ModalHeader, ModalBody, Button, Table, ModalFooter } from "reactstrap"
import { useDocumentsContext } from "../context/DocumentsContext"
import { useFormContext } from "react-hook-form"
import { DocumentTypeGestor, DocumentType } from "@/models/DocumentTypes.model"
import { documentForm } from "../OrderDocumentsPage"


const DocumentsSearch = () => {

    const {documentsModals: {searchWindow, formWindow, crud, searchedDocuments: {list, change, clearList}}} = useDocumentsContext()
    const {isModalVisible, toggleModal} = searchWindow
    const {setValue, reset, register, handleSubmit} = useFormContext<documentForm>()

    const search = async (data: documentForm) => {
        const {SearchedDescription} = data
        clearList()
        let list = []
        if (SearchedDescription !== '') { 
            list = await DocumentTypeGestor.List(SearchedDescription)
        }
        else {
            list = await DocumentTypeGestor.ListAll()
        }
        change(list)
    }

    const handleSelect = (documentType: DocumentType) => {
        searchWindow.toggleModal()
        formWindow.toggleModal()
        setValue("DocumentType", documentType)
    }

    const handleCancel = () => {
        clearList()
        crud.setToNone()
        toggleModal()
        reset()
    }

    return(
        <Modal className='modal-dialog modal-lg' isOpen={isModalVisible} toggle={handleCancel}>
            <ModalHeader toggle={handleCancel}>Buscar documentos</ModalHeader>
            <ModalBody>
                <input className="form-control" {...register('SearchedDescription')} name='SearchedDescription'/>
                <br />
                <Button color="primary" onClick={handleSubmit(search)}>Buscar</Button>
                <br /><br />
                <div className="table-responsive">
                    <Table>
                        <thead>
                            <tr>
                                <th>Documento</th>
                                <th>Descripción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                list.map((d) => {
                                    return (
                                        <tr key={d.Code}>
                                            <td>{d.Code}</td>
                                            <td>{d.Description}</td>
                                            <td><Button color="primary" onClick={() => {handleSelect(d)}}>Seleccionar</Button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={handleCancel}>
                Cancelar
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default DocumentsSearch