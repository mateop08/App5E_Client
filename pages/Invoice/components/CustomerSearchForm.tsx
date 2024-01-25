import CustomerGestor, { Customer } from "@/models/Customer.model"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Table, FormGroup, Label } from "reactstrap"
import { ModalGestor } from "@/hooks/useModal.hook"
import { SelectCustomerState } from "@/hooks/useSelectCustomer.hooks"
import { BsSearch } from "react-icons/bs"
import { TbHandFinger } from "react-icons/tb";

interface CustomerSearchForm {
    Modal: ModalGestor,
    SelectCustomer: SelectCustomerState,
    onSelectCallback: (contact: Customer) => void,
    onCancelCallback: () => void
}

interface SearchCustomerForm {
    SearchText: string
}

const CustomerSearchForm: React.FC<CustomerSearchForm> = (props) => {

    const { Modal: {isModalVisible, toggleModal}, SelectCustomer, onSelectCallback, onCancelCallback } = props
    const {change, setToEmpty} = SelectCustomer
    const { handleSubmit, register, setValue } = useForm<SearchCustomerForm>()
    const [ searchedCustomers, setSearchedCustomers ] = useState<Customer[]>([])
    const [isSelected, setIsSelected] = useState<boolean>(false)

    const search = async (data: SearchCustomerForm) => {
        setSearchedCustomers([])
        
        let newList: Customer[] = []
        try {
            if (data.SearchText === '') throw("Para buscar debe indicar una descripción.")
            else newList = await CustomerGestor.Search(data.SearchText)
            setSearchedCustomers(newList)
            toggleModal()
        } catch (error) {
            window.alert(error)
        }
        
    }

    const handleSelectCustomer = async (contact: Customer) => {
        change(contact)
        setIsSelected(true)
        setValue("SearchText",contact.Identification)
        setSearchedCustomers([])
        onSelectCallback(contact)
        toggleModal()
    }

    const resetSearch = async () => {
        setIsSelected(false)
        setValue("SearchText",'')
        SelectCustomer.setToEmpty()
        onCancelCallback()
    }

    const cancel = () => {
        setSearchedCustomers([])
        onCancelCallback()
        setToEmpty()
        toggleModal()
    }

    return(
        <>
            <FormGroup>
                <Label>
                    <strong>Cliente:</strong> {SelectCustomer.selectCustomer.FullName}
                </Label>
                <input className="form-control" {...register('SearchText')} name='SearchText' disabled={isSelected}
                    placeholder="Busque por número de documento o nombre de cliente ..."/>
            </FormGroup>
            <Button color="primary" onClick={handleSubmit(search)} disabled={isSelected}>
                <BsSearch/> Buscar
            </Button>{' '}
            <Button color="secondary" onClick={resetSearch}>Cancelar
            </Button>
            <hr className="hr" />
            <Modal isOpen={isModalVisible} toggle={cancel}>
                <ModalHeader toggle={cancel}>Buscar cliente</ModalHeader>
                <ModalBody>
                    <Table>
                        <thead>
                            <tr>
                                <th>Documento</th>
                                <th>Nombre</th>
                                <th>Seleccionar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                searchedCustomers.map((contact) => {
                                    return (
                                        <tr key={contact.Identification}>
                                            <td>{contact.Identification}</td>
                                            <td>{contact.FullName}</td>
                                            <td><Button color="primary" onClick={ () => {handleSelectCustomer(contact)}}>
                                                <TbHandFinger />
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={cancel}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default CustomerSearchForm