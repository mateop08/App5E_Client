import { Button, Input, Table } from "reactstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import UserGroupGestor, { GroupWithIndicatedAccess } from "@/models/UserAssignedGroups";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import UserGestor, { User } from "@/models/Users.model";

interface formValues {
    GroupWithIndicatedAccess: GroupWithIndicatedAccess[]
}

export const UserGroupsPage = () => {

    const {code} = useParams()
    const [user, setUser] = useState<User>()
    const getList = async () => {
        if (code === undefined) {
            throw("No existe el parametro code para realizar la modificación de permisos en usersappfuncitons.")
        }
        const UserCode = await UserGestor.GetByUserCode(code)
        setUser(UserCode)
        const list = await UserGroupGestor.ListAllGroupsWithIndicatedAccessByUserCode(code)
        return list
    }

    const { control, handleSubmit } = useForm<formValues>({defaultValues: {GroupWithIndicatedAccess: []}})
    const { fields, prepend, remove } = useFieldArray({
        control, 
        name: "GroupWithIndicatedAccess", 
      });

    const refresh = () => {
        remove()
        getList()
        .then(data => {
            remove()
            prepend(data)
        }).catch((error) => window.alert(error))
    }

    const save = async (data: formValues) => {
        
        try {
            if (user === undefined) {
                throw("No existe el parametro code, no se puede asignar los documentos al usuario.")
            }
            const {GroupWithIndicatedAccess} = data
            const list = GroupWithIndicatedAccess.filter((f)=> f.HasAccess)
            const response = await UserGroupGestor.CreateByList(user, list)
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
            <h1>Asignación de grupos de usuario</h1>
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
            <h2>Grupos</h2>
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
                                            name = {`GroupWithIndicatedAccess.${index}.HasAccess`}
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

export default UserGroupsPage