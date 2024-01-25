import { ReactNode, useEffect } from "react"
import { useLoginToken } from "@/hooks/Login.hooks"

interface RoutesProtector {
    children: ReactNode
}

const RoutesProtector: React.FC<RoutesProtector> = ({children}) => {
    
    const loginToken = useLoginToken()

    useEffect(() => {
        loginToken()
    // eslint-disable-next-line
    },[])
    
    return (
        <>
            {children}
        </>
    )
}

export default RoutesProtector