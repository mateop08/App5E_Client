import { Button, Input, Table } from "reactstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import UserAppDocumentGestor, { AppDocumentWithIndicatedAccess } from "@/models/UserAppDocuments.model";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import UserGestor, { User } from "@/models/Users.model";

interface formValues {
    AppDocumentWithIndicatedAccess: AppDocumentWithIndicatedAccess[]
}

export const UserAppDocumentsPage = () => {

    const {code} = useParams()
    const [user, setUser] = useState<User>()
    const getList = async () => {
        if (code === undefined) {
            throw("No existe el parametro code para realizar la modificación de permisos en usersappfuncitons.")
        }
        const UserCode = await UserGestor.GetByUserCode(code)
        setUser(UserCode)
        const list = await UserAppDocumentGestor.ListAllAppDocumentsWithIndicatedAccessByUserCode(code)
        return list
    }

    const { control, handleSubmit } = useForm<formValues>({defaultValues: {AppDocumentWithIndicatedAccess: []}})
    const { fields, prepend, remove } = useFieldArray({
        control, 
        name: "AppDocumentWithIndicatedAccess", 
      });

    const refresh = () => {
        remove()
        getList()
            .then(data => {
                remove()
                prepend(data)
            })
            .catch((error) => window.alert(error))
    }

    const save = async (data: formValues) => {
        
        try {
            if (user === undefined) {
                throw("No existe el parametro code, no se puede asignar los documentos al usuario.")
            }
            const {AppDocumentWithIndicatedAccess} = data
            const list = AppDocumentWithIndicatedAccess.filter((f)=> f.HasAccess)
            const response = await UserAppDocumentGestor.CreateByList(user, list)
            window.alert(response.data)
        } catch (error) {
            window.alert(error)
        }
    }

    
    const cancel = () => {
        refresh()
    }

    useEffect( () => {
        refresh()
    // eslint-disable-next-line
    },[])
    return (
        <>
            <h1>Documentos de usuario</h1>
            <br />
            <h2>Usuario</h2>
            <Button color="primary" onClick={handleSubmit(save)}>Guardar</Button>
            <span> </span>
            <Button color="secondary" onClick={cancel}>Cancelar</Button>
            <Table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                        <tr key={user?.UserCode}>
                            <td>{user?.UserCode}</td>
                            <td>{user?.Name}</td>
                        </tr>
                </tbody>
            </Table>
            <h2>Documentos</h2>
            <Table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descripción</th>
                        <th>Accesso</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {
                        fields.map((field, index) => {

                            return(
                                <tr key = {index}>
                                    <td>{field.Code}</td>
                                    <td>{field.Description}</td>
                                    <td>
                                        <Controller
                                            control={control}
                                            name = {`AppDocumentWithIndicatedAccess.${index}.HasAccess`}
                                            rules = {{}}
                                            render={ ({field}) => {
                                                const {value, ...rest} = field
                                                return <Input type="checkbox" checked={value} {...rest} name="Default"/> 
                                            }
                                            } />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}

export default UserAppDocumentsPage