import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetUser } from '../redux/states/userSlice';
import styles from './NavBar.module.css';
import logo from '@/assets/logo.png'
import TokenGestor from '@/helpers/TokenGestor';

const NavBar = () => {

    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const closeSession = () => {
        dispatch(resetUser())
        TokenGestor.deleteToken()
    }
    

    return(
        <div style={{ 
            display: 'block'
        }}>
        <Navbar light expand="md">
        <NavbarBrand href="/">App <img src={logo} style={{width: '40px'}}/></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav style={styles.Nav }className="me-auto" navbar>
            <NavItem style={styles.ul } >
                <Link className='nav-link' onClick={toggle} to={'/'}>Principal</Link>
            </NavItem>
            <NavItem>
                <Link className='nav-link' onClick={toggle} to={'/reception'}>Recepción</Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Configuración
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                    <Link className='nav-link submenu' onClick={toggle} to={'/configuration/annotationtypes'}>Tipos de anotaciones</Link>
                </DropdownItem>
                <DropdownItem>
                    <Link className='nav-link submenu' onClick={toggle} to={'/configuration/documenttypes'}>Tipos de documentos</Link>
                </DropdownItem>
                <DropdownItem>
                    <Link className='nav-link submenu' onClick={toggle} to={'/configuration/appdocuments'}>Documentos de aplicación</Link>
                </DropdownItem>
                <DropdownItem>
                    <Link className='nav-link submenu' onClick={toggle} to={'/configuration/users'}>Usuarios</Link>
                </DropdownItem>
                <DropdownItem>
                    <Link className='nav-link submenu' onClick={toggle} to={'/configuration/groups'}>Grupos de usuario</Link>
                </DropdownItem>
                <DropdownItem>
                    <Link className='nav-link submenu' onClick={toggle} to={'/configuration/technicians'}>Tecnicos</Link>
                </DropdownItem>
                <DropdownItem>
                    <Link className='nav-link submenu' onClick={toggle} to={'/configuration/orderstates'}>Estados de orden</Link>
                </DropdownItem>
                <DropdownItem>
                    <Link className='nav-link submenu' onClick={toggle} to={'/configuration/vehicleplatetypes'}>Tipos de placa</Link>
                </DropdownItem>
                <DropdownItem>
                    <Link className='nav-link submenu' onClick={toggle} to={'/configuration/vehiclefueltypes'}>Tipos de combustible</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
                <Link className='nav-link' to={'/login'} onClick={closeSession}>Cerrar Sesión</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      </div>    
    
        
    );
}

export default NavBar;