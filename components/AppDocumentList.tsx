//import UserAppDocumentGestor from "@/models/UserAppDocument.model";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { Input } from 'reactstrap';
import { setActiveAppDocument } from "@/redux/states/userSlice";
/*
interface AppDocumentListProps {
    list: Pick<AppDocument, 'Code' |  'Description'>[]
}*/


export const AppDocumentList = () => {

    const list = useSelector((state: RootState) => state.userReducer.AppDocuments)
    const ActiveDocument = useSelector((state: RootState) => state.userReducer.ActiveAppDocument)
    const dispatch = useDispatch()    
    
    const handdleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedOption = e.target.value
        const newActiveAppDocument = list.find( (a) => a.Code === selectedOption)
        if (newActiveAppDocument === undefined) {
            throw('Error el documento de aplicación seleccionada no esta cargado como documento de aplicación en la sesión del usuario.')
        }
        dispatch(setActiveAppDocument(newActiveAppDocument))
    }

    return(
        <Input type='select' onChange={handdleChange} defaultValue={ActiveDocument}>
            {list.map((item) => 
                <option key={item.Code}  value={item.Code}>
                    {item.Description}
                </option>)}
        </Input>
    )
        
}

export default AppDocumentList