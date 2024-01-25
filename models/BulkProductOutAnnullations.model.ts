import { CreateBulkProductOutAnnullation, GetBulkProductOutAnnullationByAnnullationId, 
    ListBulkProductOutAnnullationByOutId } 
from "@/api/BulkProductOutAnnullations.api"
import { DateTime } from "luxon"

export interface BulkProductOutAnnullation {
    AnnullationId: number,
    OutId: number,
    ProductCode: string,
    Amount: number,
    RegistrationDate: DateTime,
    RegisteredBy: string,
    AnnulledReason: string
}

const BulkProductOutAnnullationGestor = {
    Construct: (data: {AnnullationId: number, OutId: number, ProductCode: string,
        Amount: number, RegistrationDate: DateTime, RegisteredBy: string, AnnulledReason: string}) => {

        const {OutId, AnnullationId, ProductCode, Amount, RegistrationDate, RegisteredBy, AnnulledReason} = data
        
        const BulkProductOutAnnullation: BulkProductOutAnnullation = {
            OutId: OutId,
            AnnullationId: AnnullationId,
            ProductCode: ProductCode,
            Amount: Amount,
            RegistrationDate: RegistrationDate,
            RegisteredBy: RegisteredBy,
            AnnulledReason: AnnulledReason
        }
        return BulkProductOutAnnullation
    },

    // eslint-disable-next-line
    AdaptFromApi(data: any) {
        const {OutId, AnnullationId, ProductCode, Amount, RegistrationDate, RegisteredBy, AnnulledReason} = data

        const AdaptDate = DateTime.fromISO(RegistrationDate)
        const bulkProductOutAnnullation = this.Construct({
            OutId: OutId,
            AnnullationId: AnnullationId,
            ProductCode: ProductCode,
            Amount: Amount,
            RegistrationDate: AdaptDate,
            RegisteredBy: RegisteredBy,
            AnnulledReason: AnnulledReason
         })
        return bulkProductOutAnnullation
    },

    // eslint-disable-next-line
    AdaptListFromApi(data: any[]) {
        const bulkProductOutAnnullationList = data.map((e) => this.AdaptFromApi(e))
        return bulkProductOutAnnullationList
    },

    GetEmpty () {
        const data = {
            OutId: 0,
            AnnullationId: 0,
            ProductCode: '',
            Amount: 0,
            RegistrationDate: DateTime.local(),
            RegisteredBy: '',
            AnnulledReason: ''
        }
        return this.Construct(data)
    },

    async Create (ProductCode: string, Amount: number, OutId: number, AnnulledReason: string, User: string) {

        const data = await CreateBulkProductOutAnnullation(ProductCode, Amount, OutId, AnnulledReason, User)
        return data
    },

    async GetByAnnullationId (GetByAnnullationId: number) {
        const data = await GetBulkProductOutAnnullationByAnnullationId(GetByAnnullationId)
        const bulkProductOutAnnullation = this.AdaptFromApi(data)
        return bulkProductOutAnnullation
    },

    async ListByOutId (OutId: number) {
        const data = await ListBulkProductOutAnnullationByOutId(OutId)
        const bulkProductOutAnnullationList = this.AdaptListFromApi(data)
        return bulkProductOutAnnullationList
    }
}

export default BulkProductOutAnnullationGestor