import { AppDocument } from "@/models/AppDocuments.model";
import { LoggedUser } from "@/models/Users.model";
import { createSlice, PayloadAction  } from "@reduxjs/toolkit";


interface UserState extends Omit<LoggedUser, 'User'> {
    User: string | null,
    ActiveAppDocument:  string
}


const initialState: UserState = {
    User: null,
    AppDocuments: [],
    ActiveAppDocument: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserLogin: (state, action: PayloadAction<LoggedUser>) => {
            state.User = action.payload.User
        },
        resetUser:(state) => {
            state.User = null,
            state.AppDocuments = []
            state.ActiveAppDocument = ''
        },
        setAppDocuments: (state, action: PayloadAction<AppDocument[]>) => {
            state.AppDocuments = action.payload
        },
        setActiveAppDocument: (state, action: PayloadAction<AppDocument>) => {
            state.ActiveAppDocument = action.payload.Code
        }
    }
}
)

export const { setUserLogin, resetUser, setAppDocuments, setActiveAppDocument } = userSlice.actions;
export default userSlice.reducer