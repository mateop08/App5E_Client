import BulkProductOpeningGestor, { BulkProductOpening } from "@/models/BulkProductOpenings.model"
import { useEffect, useState } from "react"
import { BsFillStopFill, BsFillPlusCircleFill, BsNodePlusFill } from "react-icons/bs"
import { Table, Button } from "reactstrap"
import BulkProductOpeningForm from "./components/BulkProductOpeningForm"
import useModal from "@/hooks/useModal.hook"
import BulkProductOutForm from "@/components/BulkOutProductForm"
import BulkProductCloseForm from "./components/BulkProductCloseForm"

const BulkProductGestion = () => {

    const [bulkProductOpeningList, setBulkProductOpeningList] = useState<BulkProductOpening[]>([])
    const [selectBulkProduct, setSelectBulkProduct] = useState<BulkProductOpening>(BulkProductOpeningGestor.GetEmpty())

    const bulkOpeningWindow = useModal()
    const bulkOutWindow = useModal()
    const bulkCloseWindow = useModal()

    const refreshList = () => {
        BulkProductOpeningGestor.ListActive()
            .then((data) => setBulkProductOpeningList(data))
            .catch((error) => window.alert(error))
    }

    const handleBulkOutProduct = (bulkProduct: BulkProductOpening) => {
        setSelectBulkProduct(bulkProduct)
        bulkOutWindow.toggleModal()
    }

    const handleClose = async (bulkProductOpening: BulkProductOpening) => {
        const confirm = window.confirm(`¿Esta seguro que desea cerrar el producto a granel ?`)
        if (confirm) {
            bulkCloseWindow.toggleModal()
            setSelectBulkProduct(bulkProductOpening)
        }
    }

    useEffect(() => {
        refreshList()
    },[])

    return(
        <div className="table-responsive">
            <h1>Aperturas de productos a granel</h1>
            <div className="text-end">
                <Button color='primary' onClick={bulkOpeningWindow.toggleModal}><BsFillPlusCircleFill/> Aperturar tambor</Button>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bulkProductOpeningList.map((e) => {
                            return (<tr key={e.OpeningId}>
                                <td>{e.ProductCode}</td>
                                <td>Descripción</td>
                                <td>{e.Active ? 'Abierto' : 'Cerrado'}</td>
                                <td>{e.InterventionRecord?.CreationDate?.toFormat('d MMM T')}</td>
                                <td>
                                    <Button color='primary' onClick={() => handleBulkOutProduct(e)}><BsNodePlusFill/>&nbsp;Salida</Button>{' '}
                                    <Button color="warning" onClick={() => handleClose(e)}><BsFillStopFill />&nbsp;Cerrar</Button>
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </Table>
            <BulkProductOpeningForm 
                ModalGestor={bulkOpeningWindow}
                OnSaveCallback={refreshList}/>

            <BulkProductOutForm
                ForServiceOrder={false}
                ModalGestor={bulkOutWindow}
                OnSaveCallback={refreshList}
                ProductCode={selectBulkProduct.ProductCode}
                OrderProductId={null}
                />

            <BulkProductCloseForm
                ModalGestor={bulkCloseWindow}
                OnSaveCallback={refreshList}
                bulkProductOpening={selectBulkProduct}
                />

        </div>
    )
}

export default BulkProductGestion