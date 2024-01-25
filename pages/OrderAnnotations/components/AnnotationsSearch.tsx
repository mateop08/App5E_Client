import { Modal, ModalHeader, ModalBody, Button, Table, ModalFooter } from "reactstrap"
import { useAnnotationsContext } from "../context/AnnotationsContext"
import { useFormContext } from "react-hook-form"
import AnnotationTypeGestor, { AnnotationType } from "@/models/AnnotationTypes.model"
import { annotationForm } from "../OrderAnnotationsPage"


const AnnotationsSearch = () => {

    const {annotationsModals: {searchWindow, formWindow, crud, searchedAnnotations: {list, change, clearList}}} = useAnnotationsContext()
    const {isModalVisible, toggleModal} = searchWindow
    const {setValue, reset, register, handleSubmit} = useFormContext<annotationForm>()

    const search = async (data: annotationForm) => {
        const {SearchedDescription} = data
        clearList()
        let list = []
        if (SearchedDescription !== '') { 
            list = await AnnotationTypeGestor.List(SearchedDescription)
        }
        else {
            list = await AnnotationTypeGestor.ListAll()
        }
        change(list)
    }

    const handleSelect = (annotationType: AnnotationType) => {
        searchWindow.toggleModal()
        formWindow.toggleModal()
        setValue("AnnotationType", annotationType)
    }

    const handleCancel = () => {
        clearList()
        crud.setToNone()
        toggleModal()
        reset()
    }

    return(
        <Modal className='modal-dialog modal-lg' isOpen={isModalVisible} toggle={handleCancel}>
            <ModalHeader toggle={handleCancel}>Buscar Anotaciones</ModalHeader>
            <ModalBody>
                <input className="form-control" {...register('SearchedDescription')} name='SearchedDescription'/>
                <br />
                <Button color="primary" onClick={handleSubmit(search)}>Buscar</Button>
                <br /><br />
                <div className="table-responsive">
                    <Table>
                        <thead>
                            <tr>
                                <th>Annotationo</th>
                                <th>Precio</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                list.map((a) => {
                                    return (
                                        <tr key={a.Code}>
                                            <td>{a.Code}</td>
                                            <td>{a.Description}</td>
                                            <td><Button color="primary" onClick={() => {handleSelect(a)}}>Seleccionar</Button></td>
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

export default AnnotationsSearch