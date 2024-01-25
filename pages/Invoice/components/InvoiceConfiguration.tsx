import { Modal, ModalBody, ModalHeader, ModalFooter, Form, FormGroup, Label, Button, Input } from 'reactstrap'
import { useInvoicesContext } from '../contexts/InvoiceContext'
import { useFormContext, Controller } from 'react-hook-form'
import { InvoiceForm } from '../InvoicePage'
import { useEffect, useState } from 'react'
import OfimaDocumentTypeGestor, { OfimaDocumentType } from '@/models/OfimaDocumentType.model'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import StoreGestor, { Store } from '@/models/Store.model'
import CashRegisterGestor, { CashRegister } from '@/models/CashRegister.model'
import CostCenterGestor, { CostCenter } from '@/models/CostCenter.model'

const InvoiceConfiguration = () => {

    const User = useSelector((state: RootState) => state.userReducer.User)

    const {configurationWindow} = useInvoicesContext()
    const { control, setValue } = useFormContext<InvoiceForm>()

    const [ invoiceDocumentTypeList, setInvoiceDocumentTypeList ] = useState<OfimaDocumentType[]>([])
    const [ storeList, setStoreList ] = useState<Store[]>([])
    const [ cashRegister, setCashRegisterList ] = useState<CashRegister[]>([])
    const [ costCenterList, setCostCenterList ] = useState<CostCenter[]>([])

    const getInvoiceDocuments = () => {
        if (User !== null) {
            OfimaDocumentTypeGestor.ListInvoiceDocsByUser(User)
            .then( (data) => {
                setInvoiceDocumentTypeList(data)
                setValue("ConsecutiveCode", data[0].ConsecutiveCode)})
            .catch( (error) => window.alert(error))
        }
    }   

    const getStores = () => {
        if (User !== null) {
            StoreGestor.ListByUser(User)
            .then( (data) => {
                setStoreList(data)
                setValue("Store", data[0].Code)
            })
            .catch( (error) => window.alert(error))
        }

    }

    const getCashRegisters = () => {
        if (User !== null) {
            CashRegisterGestor.ListByUser(User)
            .then( (data) => {
                setCashRegisterList(data)
                setValue("CashRegisterCode", data[0].Code)
            })
            .catch( (error) => window.alert(error))
        }

    }

    const getCostCenterList = () => {
        if (User !== null) {
            CostCenterGestor.ListByUser(User)
            .then( (data) => {
                setCostCenterList(data)
                setValue("CostCenterCode", data[0].Code)
            })
            .catch( (error) => window.alert(error))
        }

    }

    useEffect(() => {
        getInvoiceDocuments()
        getStores()
        getCashRegisters()
        getCostCenterList()
    // eslint-disable-next-line
    },[User])

    return (
        <Modal isOpen={configurationWindow.isModalVisible} toggle={configurationWindow.toggleModal}>
            <ModalHeader toggle={configurationWindow.toggleModal}>
                Configuración de factura
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Tipo de documento</Label>
                        <Controller
                            control={control}
                            name = 'ConsecutiveCode'
                            render= { ({field}) => {

                                return (
                                    <Input type="select" {...field}>
                                        <option disabled value=''> Seleccione una opción </option>
                                        {invoiceDocumentTypeList.map((doc) => {
                                            return (<option value={doc.ConsecutiveCode} key={doc.ConsecutiveCode}>{`${doc.DocumentType} - ${doc.Description}`}</option>)
                                            })
                                        }
                                    </Input>
                                )
                                }
                            } />
                    </FormGroup>
                
                    <FormGroup>
                        <Label>Bodega</Label>
                        <Controller
                            control={control}
                            name = 'Store'
                            render= { ({field}) => {

                                return (
                                    <Input type="select" {...field}>
                                        <option disabled value=''> Seleccione una opción </option>
                                        {storeList.map((store) =>  <option value={store.Code} key={store.Code}>{store.Description}</option>)}
                                    </Input>
                                )
                                }
                            } />
                    </FormGroup>
                    <FormGroup>
                        <Label>Caja</Label>
                        <Controller
                            control={control}
                            name = 'CashRegisterCode'
                            render= { ({field}) => {

                                return (
                                    <Input type="select" {...field}>
                                        <option disabled value=''> Seleccione una opción </option>
                                        {cashRegister.map((cashRegister) =>  <option value={cashRegister.Code} key={cashRegister.Code}>{cashRegister.Description}</option>)}
                                    </Input>
                                )
                                }
                            } />
                    </FormGroup>
                    <FormGroup>
                        <Label>Centro de costos</Label>
                        <Controller
                            control={control}
                            name = 'CostCenterCode'
                            render= { ({field}) => {

                                return (
                                    <Input type="select" {...field}>
                                        <option disabled value=''> Seleccione una opción </option>
                                        {costCenterList.map((costcenter) =>  <option value={costcenter.Code} key={costcenter.Code}>{`${costcenter.Code} ${costcenter.Description}`}</option>)}
                                    </Input>
                                )
                                }
                            } />
                    </FormGroup>
                </Form>
                <br />
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={configurationWindow.toggleModal}>Aceptar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default InvoiceConfiguration