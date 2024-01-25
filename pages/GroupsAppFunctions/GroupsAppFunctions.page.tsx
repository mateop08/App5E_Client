import { Button, Input, Table } from "reactstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import GroupAppFunctionGestor, { AppFunctionWithIndicatedAccess } from "@/models/GroupAppFunctions.model";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import GroupGestor, { Group } from "@/models/Groups.model";
//import { AppFunction } from "@/models/AppFunctions.model";

interface formValues {
    AppFunctionWithIndicatedAccess: AppFunctionWithIndicatedAccess[]
}

export const GroupAppFunctionsPage = () => {

    const {code} = useParams()
    const [group, setGroup] = useState<Group>()
    const getList = async () => {
        if (code === undefined) {
            throw("No existe el parametro code para realizar la modificación de permisos en groupsappfuncitons.")
        }
        const GroupCode = await GroupGestor.GetByCode(code)
        setGroup(GroupCode)
        const list = await GroupAppFunctionGestor.ListAllAppFunctionsWithAccessByGroupCode(code)
        return list
    }

    const { control, handleSubmit } = useForm<formValues>({defaultValues: {AppFunctionWithIndicatedAccess: []}})
    const { fields, prepend, remove } = useFieldArray({
        control, 
        name: "AppFunctionWithIndicatedAccess", 
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
            if (group === undefined) {
                throw("No existe el parametro code, no se puede asignar los permisos al grupo.")
            }
            const {AppFunctionWithIndicatedAccess} = data
            const list = AppFunctionWithIndicatedAccess.filter((f)=> f.HasAccess)
            const response = await GroupAppFunctionGestor.CreateByList(group, list)
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
            <h1>Permisos de grupo</h1>
            <br />
            <h2>Grupo</h2>
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
                        <tr key={group?.Code}>
                            <td>{group?.Code}</td>
                            <td>{group?.Description}</td>
                        </tr>
                </tbody>
            </Table>
            <h2>Permisos</h2>
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
                                            name = {`AppFunctionWithIndicatedAccess.${index}.HasAccess`}
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

export default GroupAppFunctionsPage