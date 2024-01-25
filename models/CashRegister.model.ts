import { ListCashRegisterByUser } from "@/api/CashRegister.api"

export interface CashRegister {
    Code: string,
    Description: string
}

export const CashRegisterGestor = {
    Construct: (Code: string, Description: string) => {
        const CashRegister: CashRegister = {
            Code: Code,
            Description: Description
        }
        return CashRegister
    },

    GetEmpty () {
        return this.Construct('','')
    },
    
    ListByUser: async (User: string) => {
        const data = await ListCashRegisterByUser(User) as CashRegister[]
        return data
    }
}

export default CashRegisterGestor