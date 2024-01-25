import { Nav, NavItem } from "reactstrap"
import { Link , useLocation, useParams } from "react-router-dom"


const OrderNav = () => {

    const {pathname} = useLocation()
    const {OrderDocument, OrderNumber} = useParams()



    const getClassName = (routeString: string) => {
        const className = pathname.includes(routeString) ? 'nav-link active' : 'nav-link'
        return className
    }

    return (
        <Nav className="nav-pills justify-content-center">
            <NavItem >
                <Link className={getClassName('productsservices')} to={`/order/${OrderDocument}/${OrderNumber}/productsservices`} >
                Productos y servicios
                </Link>
            </NavItem>
            <NavItem >
                <Link className={getClassName('annotations')} to={`/order/${OrderDocument}/${OrderNumber}/annotations`}>
                    Anotaciones 
                </Link>
            </NavItem>
        
            <NavItem >
                <Link className={getClassName('documents')} to={`/order/${OrderDocument}/${OrderNumber}/documents`}>
                Documentos
                </Link>
            </NavItem>
        
            <NavItem >
                <Link className={getClassName('receptiondata')} to={`/order/${OrderDocument}/${OrderNumber}/receptiondata`}>
                Datos de recepción  
                </Link>
            </NavItem>
            
        
        </Nav>  
    )   
}

export default OrderNav