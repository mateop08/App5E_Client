import { Modal, Input, Label, ModalHeader, ModalBody, ModalFooter, Button, Table, Form, FormGroup } from "reactstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import UserGestor, { User, UserWithCredentials } from "@/models/Users.model";
import { useForm } from "react-hook-form";
import useCrud from "@/hooks/useCrud.hook";
import useModal from "@/hooks/useModal.hook";
import UpperCaseInputControl from "@/components/UpperCaseInputControl";
import FormError from "@/components/FormError";
import { useNavigate } from "react-router-dom";

export const UsersPage = () => {
    
    const initialFormState: UserWithCredentials = UserGestor.ConstructWithCredentials('','','')

    const { control, register, handleSubmit, reset, formState: {errors}} = useForm<UserWithCredentials>({defaultValues:{...initialFormState}})
    const { isCreating, isUpdating, setToCreate, setToUpdate} = useCrud()
    const { isModalVisible, toggleModal} = useModal()
    const navigate = useNavigate()

    const [ list, setList] = useState<User[]>([])
    const [ searchValue, setsearchValue] = useState<string>('')
    const filterList = list.filter((e) => e.Name.includes(searchValue))

    const refreshList = () => {
        UserGestor.ListAll().then(
            (data) => {
                setList(data)
            },
            (error) => {
                window.alert(error)
            }
        )
    }

    const handdleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault
        setsearchValue(e.target.value)
    }

    const handdleCreateButton = () => {
        setToCreate()
        reset(initialFormState)
        toggleModal()
    }

    const handleEditButton = (User: User) => {
        const userCredentials: UserWithCredentials = {...User, Password: ''}
        setToUpdate()
        reset(userCredentials)
        toggleModal()
    }

    const handleDeleteButton = async (User: User) => {
        const {UserCode, Name} = User
        const confirm = window.confirm(`¿Seguro que desea eleminar el tipo de anotación ${UserCode} ${Name}?` )
        if (confirm) {
            try {
                const response = await UserGestor.Delete(User)
                window.alert(response?.data)
                refreshList()
            } catch (error) {
                window.alert(error)
            }
            
        }
    }

    const save = async (data: UserWithCredentials) => {
        try {
            let response
            if (isCreating) response = await UserGestor.Create(data)
            if (isUpdating) response = await UserGestor.Update(data)
            if (response === undefined) throw('No se pudo obtener respuesta del servidor.')
        
            window.alert(response.data)
            refreshList()
            reset(initialFormState)
            toggleModal()
        } catch (error) {
            window.alert(error)
        }
    }
    
    const cancel = () => {
        reset(initialFormState)
        toggleModal()
    }

    useEffect( () => {
        refreshList()
    },[])

    return (
        <>
            <h1>Usuarios</h1>
            <br />
            <Input placeholder="Buscar" onChange={handdleChange}/>
            <br />
            <Button color='primary' onClick={handdleCreateButton}>Crear</Button>
            <br />
            <Modal isOpen={isModalVisible} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>
                    {isCreating && 'Crear '}
                    {isUpdating && 'Modificar '} 
                    usuario
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Código</Label>
                            <UpperCaseInputControl control={control} name="UserCode" maxLength={20} disabled={isUpdating}
                            rules={
                                {required: {
                                    value: true,
                                    message: "Código requerido"
                                }}
                            }
                            />
                            {
                                errors.UserCode?.message && <FormError error={errors.UserCode.message} />
                            }
                        </FormGroup>
                        <FormGroup>
                            <Label>Nombre</Label>
                            <input className="form-control" {...register("Name", 
                                {
                                    required: {
                                        value: true,
                                        message: "Nombre requerido"
                                    }
                                })} name="Name" maxLength={100}/>
                                {
                                    errors.Name?.message && <FormError error={errors.Name.message} />
                                }
                        </FormGroup>
                        <FormGroup>
                            <Label>Contraseña</Label>
                            <input className="form-control" type="password" {...register("Password", 
                                {
                                    required: {
                                        value: true,
                                        message: "Nombre requerido"
                                    }
                                })} name="Password" maxLength={20}/>
                                {
                                    errors.Name?.message && <FormError error={errors.Name.message} />
                                }
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={handleSubmit(save)}>
                    Guardar
                </Button>{' '}
                <Button color="secondary" onClick={cancel}>
                    Cancelar
                </Button>
                </ModalFooter>
            </Modal>
            <Table>
                <thead>
                    <tr>
                        <th>Código de usuario</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filterList.map((e) => {
                    return(
                        <tr key={e.UserCode}>
                            <td>{e.UserCode}</td>
                            <td>{e.Name}</td>
                            <td>
                                <Button color="secondary" onClick={() => {navigate(`/configuration/userappdocuments/${e.UserCode}`)}}>Documentos</Button>
                                <span> </span>
                                <Button color="secondary" onClick={() => {navigate(`/configuration/userassignedgroups/${e.UserCode}`)}}>Grupos</Button>
                                <span> </span>
                                <Button onClick={() => {handleEditButton(e)}} color="warning">Editar</Button>
                                <span> </span>
                                <Button color="danger" onClick={() => {handleDeleteButton(e)}}>Eliminar</Button>
                            </td>
                        </tr>)
                    }
                    )}
                    
                    
                </tbody>
            </Table>
        </>
    )
}

export default UsersPage