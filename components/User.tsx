import { RootState } from '../redux/store.ts';
import { useSelector } from "react-redux";
import './User.css'

const User = () => {

    const userData = useSelector( (state: RootState) => state.userReducer)

    return(
        <div className="user">
            <label className="userLabel">Usuario: </label><label className="userNameLabel">{userData.User}</label>
        </div>
    )
}



export default User