//Componente encargado de validar si el componente se renderiza según los permisos asignados a un usuario
import { PropsWithChildren, useState } from "react";

interface AccessControl {
    optionCode: string,
    children: PropsWithChildren
}

const AccessControl: React.FC<AccessControl> = ({optionCode, children}) => {

    const [ HasAccess, setHasAccess ] = useState(false)

    console.log(optionCode)
    setHasAccess(true)

    return (
        <>
            {HasAccess && children}
        </>
       
    )
}

export default AccessControl