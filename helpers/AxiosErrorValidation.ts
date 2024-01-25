import { AxiosError } from "axios"
import { redirectToLogin } from "./RedirectToLogin"

export const AxiosErrorValidation = (error: unknown) => {
    //console.log(error)
    if (error instanceof AxiosError && error.response !== undefined){
        if (error.response.data.errors !== undefined)
            throw('Servidor de App5E dice: ' + error.response.data.errors[0].msg)
        else if (
            error.response.data.originalError !== undefined 
            && error.response.data.originalError.info !== undefined 
            && error.response.data.originalError.info.message !== undefined) {
            throw(error.response.data.originalError.info.message)
        }
        else {
            let newError = ''
            if (error.response.data === 'Token invalido') {
                newError = 'Ha caducado la sesión del usuario.'
                window.alert(newError)
                redirectToLogin()
                throw(newError)
            }
            else {
                newError = 'Servidor de App5E dice: ' + error.response.data
                throw(newError)
            }
            
        }
    } else {
        throw('Ha ocurrido un error: ' + error)
    }
}