import useToggle from "@/hooks/useToggle.hooks";
import { ReactNode } from "react"
import { Button, Collapse } from "reactstrap";
import { IconType } from "react-icons";

export interface PreviewProps {
    Icon: IconType,
    children: ReactNode
    collapse: boolean
}

export interface PreviewType {
    source: string | undefined,
    collapse: boolean
}

const Preview: React.FC<PreviewProps> = ({Icon, children, collapse}) => {

    const {isToggle, toggle }= useToggle()

    if (collapse) {
        return (
            <>
                <Button onClick={toggle}><Icon /> </Button>
                <Collapse isOpen={isToggle}>
                    <br />
                    {children}
                </Collapse>
            </>
        )
    } else {
        return(
            <>{children}</>
        )
        
    }

    
}

export default Preview