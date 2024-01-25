import { configureStore} from '@reduxjs/toolkit';
//Reducers
import userReducer from './states/userSlice';
/*
import orderListReducer from './states/orderListSlice';
import detailOrderReducer from './states/detailOrderSlice';
import selectProductReducer from './states/selectProductSlice';
import selectServiceReducer from './states/selectServiceSlice';
import selectVehicleReducer from './states/selectVehicleSlice';
import receptionReducer from './states/receptionSlice';
*/



export const store = configureStore({
    reducer: {
        userReducer/*,
        orderListReducer,
        detailOrderReducer,
        selectProductReducer,
        selectServiceReducer,
        selectVehicleReducer,
        receptionReducer,*/
        
    }
})

export type RootState = ReturnType<typeof store.getState>
export default store