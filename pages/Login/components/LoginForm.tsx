import './LoginForm.css';
import { useEffect, useState } from 'react';
import { useLoginToken, useLoginCredentials } from '@/hooks/Login.hooks';
import { Button } from 'reactstrap';

const LoginForm = () => {

    const loginCredentials = useLoginCredentials()
    const loginToken = useLoginToken()

    const [loginData, setLoginData] = useState({
        User: '',
        Password: ''
    })
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name;

        setLoginData((prevalue) => {
            return {
              ...prevalue,   // Spread Operator               
              [name]: value
            }
          })
    }

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            await loginCredentials(loginData.User, loginData.Password)
            
        } catch (error) {
            window.alert(error);
        }
    }

    useEffect(() => {
        loginToken('/')
    // eslint-disable-next-line
    },[])
    

    return(
        <div className='container text-center bg-blue'>
            <div className='row justify-content-md-center'>
            <div className="col-lg-6 col-md-9 col-sm-12 col-xs-10 rounded" style={{backgroundColor: 'lightgray'}}>
                <h1>Iniciar Sesion</h1>
                <div className="form-outline mb-4">
                    <input className="form-control" name="User" type="text" placeholder="Usuario" onChange={handleChange} maxLength={20}/>
                </div>
                <div className="form-outline mb-4">
                    <input className="form-control" name="Password" type="password" placeholder="Contraseña" onChange={handleChange} maxLength={20}/>
                </div>
                <Button onClick={handleClick}>Ingresar</Button>
            </div>
            </div>
        </div>
    );   
}

export default LoginForm;