import { CreateBulkProductOpening, CloseBulkProductOpening, GetBulkProductOpeningByOpeningId, 
    ListAllBulkProductOpenings, ListActiveBulkProductOpenings } 
from "@/api/BulkProductOpenings.api"
import { InterventionRecord } from "./Users.model"
import { DateTime } from "luxon"

export interface BulkProductOpening {
    OpeningId: number,
    ProductCode: string,  
    Active: boolean,
    InterventionRecord: InterventionRecord | undefined
    LeftOverAmount: number
}

const BulkProductOpeningGestor = {
    Construct: (OpeningId: number,ProductCode: string, Active: boolean, InterventionRecord: InterventionRecord | undefined, 
        LeftOverAmount: number) => {

        const BulkProductOpening: BulkProductOpening = {
            OpeningId: OpeningId,
            ProductCode: ProductCode,
            Active: Active,
            InterventionRecord: InterventionRecord,
            LeftOverAmount: LeftOverAmount
        }
        return BulkProductOpening
    },

    // eslint-disable-next-line
    AdaptFromApi(data: any) {
        const { OpeningId, ProductCode, Active, InterventionRecord, LeftOverAmount } = data
        const { CreatedBy, ModifiedBy, CreationDate, ModificationDate } = InterventionRecord
        const AdaptInteventionRecord: InterventionRecord = {
            CreatedBy: CreatedBy,
            ModifiedBy: ModifiedBy,
            CreationDate: DateTime.fromISO(CreationDate),
            ModificationDate: (ModificationDate !== null) ? DateTime.fromJSDate(new Date(ModificationDate)) : null,
        }
        return this.Construct(OpeningId, ProductCode, Active, AdaptInteventionRecord, LeftOverAmount)
    },

    // eslint-disable-next-line
    AdaptListFromApi(data: any[]) {
        // eslint-disable-next-line
        const bulkProductOpeningList = data.map((e: any) => { 
            const bulkProductOpening = this.AdaptFromApi(e)
            return bulkProductOpening
        })
        return bulkProductOpeningList
    },

    GetEmpty () {
        return this.Construct(0,'',false,undefined, 0)
    },

    async Create  (ProductCode: string, User: string) {
        const response = await CreateBulkProductOpening(ProductCode, User)
        return response.data
    },

    async GetByOpeningId (OpeningId: number) {
        const data = await GetBulkProductOpeningByOpeningId(OpeningId)
        const bulkProductOpening = this.AdaptFromApi(data)
        return bulkProductOpening
    },
    async ListAll () {
        const listData = await ListAllBulkProductOpenings()
        const bulkProductOpeningList = this.AdaptListFromApi(listData)
        return bulkProductOpeningList
    },
    async ListActive () {
        const listData = await ListActiveBulkProductOpenings()
        const bulkProductOpeningList = this.AdaptListFromApi(listData)
        return bulkProductOpeningList
    },

    async Close  (OpeningId: number, LeftOverAmount: number, User: string) {
        const data = await CloseBulkProductOpening(OpeningId, LeftOverAmount, User)
        return data
    }
}

export default BulkProductOpeningGestor