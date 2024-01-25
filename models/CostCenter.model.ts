import { ListCostCenterByUser } from "@/api/CostCenter.api"

export interface CostCenter {
    Code: string,
    Description: string
}

export const CostCenterGestor = {
    Construct: (Code: string, Description: string) => {
        const CostCenter: CostCenter = {
            Code: Code,
            Description: Description
        }
        return CostCenter
    },

    GetEmpty () {
        return this.Construct('','')
    },
    
    ListByUser: async (User: string) => {
        const data = await ListCostCenterByUser(User) as CostCenter[]
        return data
    }
}

export default CostCenterGestor