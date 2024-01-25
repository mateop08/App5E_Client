import { CreateAppFunction, ListAllAppFunctions, ListAppFunctionsByDescription, 
    UpdateAppFunctionByCode, DeleteAppFunctionByCode } from "@/api/AppFunctions.api"

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface AppFunction {
    Code: string,
    Description: string,
    Method: Method,
    Route: string,
    RequiresAuth: boolean
}


const AppFunctionGestor = {
    Construct: (Code: string, Description: string, Method: Method, Route: string, RequiresAuth: boolean) => {

        const AppFunction: AppFunction = {
            Code: Code,
            Description: Description,
            Method: Method,
            Route: Route,
            RequiresAuth: RequiresAuth
        }
        return AppFunction
    },
    Create: async (AppFunction: AppFunction) => {
        const response = await CreateAppFunction(AppFunction)
        return response
    },
    ListAll: async () => {
        const data = await ListAllAppFunctions() as AppFunction[]
        return data
    },
    List: async (Description: string) => {
        const data = await ListAppFunctionsByDescription(Description) as AppFunction[]
        return data
    },
    Update: async (AppFunction: AppFunction) => {
        const response = await UpdateAppFunctionByCode(AppFunction)
        return response
    },
    Delete: async (AppFunction: AppFunction) => {
        const { Code } = AppFunction
        const response = DeleteAppFunctionByCode(Code)
        return response
    }
}

export default AppFunctionGestor