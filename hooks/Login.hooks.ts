
//import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"

import TokenGestor from "@/helpers/TokenGestor"
import LoginGestor from "@/models/Login.model"
import { RootState } from "@/redux/store"
import { setUserLogin, setAppDocuments, setActiveAppDocument } from "@/redux/states/userSlice"
import UserAppDocumentGestor from "@/models/UserAppDocuments.model"


export const useAuth = () => {
    const user = useSelector((state: RootState) => state.userReducer.User)
    if (user !== null) {
        return true
    } else {
        return false
    }
}

export const useLoginToken = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const isAuth = useAuth()
    
    
    const LoginToken = async (destinationRoute: string | undefined = undefined) => {
        if (!isAuth) {
            try {
                const loggedUser = await LoginGestor.loginWithToken()
                const list = await UserAppDocumentGestor.ListAppDocumentsByUserCode(loggedUser.User)
                dispatch(setUserLogin(loggedUser))
                dispatch(setAppDocuments(list))
                dispatch(setActiveAppDocument(list[0]))
                if (destinationRoute !== undefined) navigate(destinationRoute)   
                    
            } catch(error) {
                console.log(error)
                TokenGestor.deleteToken()
                if (location.pathname !== '/login') navigate('/login')
            }
        }
    }
    return LoginToken
}

export const useLoginCredentials = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const LoginCredentials = async (User: string, Password: string) => {
        const loggedUser = await LoginGestor.loginWithCredentials(User, Password)
        const list = await UserAppDocumentGestor.ListAppDocumentsByUserCode(loggedUser.User)
        dispatch(setUserLogin(loggedUser))
        dispatch(setAppDocuments(list))
        if (list.length === 0) window.alert(`El usuario ${User} no tiene ningun documento de aplicación asignado, no podra realizar recepción ni visualizar las ordenes.`) 
        dispatch(setActiveAppDocument(list[0]))
        navigate('/')
    }

    return LoginCredentials
}