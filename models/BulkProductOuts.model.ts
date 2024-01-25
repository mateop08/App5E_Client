import { CreateBulkProductOut, GetBulkProductOutByOutId, ListBulkProductOutsByOpeningId, 
    ListBulkProductOutsByOrderProductId } 
from "@/api/BulkProductOuts.api"
import { DateTime } from "luxon"

export interface BulkProductOut {
    OutId: number,
    OpeningId: number,
    ProductCode: string,  
    WithDigitalDispenser: boolean,
    InitialNumber: number | null,
    FinalNumber: number | null,
    Amount: number,
    ForServiceOrder: boolean,
    OrderProductId: number | null,
    RegistrationDate: DateTime,
    RegisteredBy: string,
    HasAnnullation: boolean
}

const BulkProductOutGestor = {
    Construct: (data: {OutId: number, OpeningId: number, ProductCode: string, WithDigitalDispenser: boolean, 
        InitialNumber: number | null, FinalNumber: number | null, Amount: number, ForServiceOrder: boolean,
        OrderProductId: number | null, RegistrationDate: DateTime, RegisteredBy: string, HasAnnullation: boolean}) => {

        const {OutId, OpeningId, ProductCode, WithDigitalDispenser, 
            InitialNumber, FinalNumber, Amount, ForServiceOrder,
            OrderProductId, RegistrationDate, RegisteredBy, HasAnnullation} = data
        
        const BulkProductOut: BulkProductOut = {
            OutId: OutId,
            OpeningId: OpeningId,
            ProductCode: ProductCode,  
            WithDigitalDispenser: WithDigitalDispenser,
            InitialNumber: InitialNumber,
            FinalNumber: FinalNumber,
            Amount: Amount,
            ForServiceOrder: ForServiceOrder,
            OrderProductId: OrderProductId,
            RegistrationDate: RegistrationDate,
            RegisteredBy: RegisteredBy,
            HasAnnullation: HasAnnullation
        }
        return BulkProductOut
    },

    // eslint-disable-next-line
    AdaptFromApi(data: any) {
        const {OutId, OpeningId, ProductCode, WithDigitalDispenser,InitialNumber,
            FinalNumber, Amount, ForServiceOrder, OrderProductId, RegistrationDate, 
            RegisteredBy, HasAnnullation} = data

        const AdaptDate = DateTime.fromISO(RegistrationDate)
        const bulkProductOut = this.Construct({
            OutId: OutId,
            OpeningId: OpeningId,
            ProductCode: ProductCode,  
            WithDigitalDispenser: WithDigitalDispenser,
            InitialNumber: InitialNumber,
            FinalNumber: FinalNumber,
            Amount: Amount,
            ForServiceOrder: ForServiceOrder,
            OrderProductId: OrderProductId,
            RegistrationDate: AdaptDate,
            RegisteredBy: RegisteredBy,
            HasAnnullation: HasAnnullation
         })
        return bulkProductOut
    },

    // eslint-disable-next-line
    AdaptListFromApi(data: any[]) {
        const bulkProductOutList = data.map((e) => this.AdaptFromApi(e))
        return bulkProductOutList
    },

    GetEmpty () {
        const data = {
            OutId: 0, 
            OpeningId: 0, 
            ProductCode: '', 
            WithDigitalDispenser: false, 
            InitialNumber: 0, 
            FinalNumber: 0, 
            Amount: 0, 
            ForServiceOrder: false,
            OrderProductId: 0, 
            RegistrationDate: DateTime.local(), 
            RegisteredBy: '',
            HasAnnullation: false
        }
        return this.Construct(data)
    },

    async Create (data: {ProductCode: string, InitialNumber: number | null, FinalNumber: number | null, Amount: number, 
            WithDigitalDispenser: boolean, ForServiceOrder:boolean, OrderProductId: number | null}, User: string) {

        const {ProductCode, InitialNumber, FinalNumber, Amount, WithDigitalDispenser, ForServiceOrder, OrderProductId} = data

        const insertData = {
            ProductCode: ProductCode,
            InitialNumber: InitialNumber,
            FinalNumber: FinalNumber,
            Amount: Amount,
            WithDigitalDispenser: WithDigitalDispenser,
            ForServiceOrder: ForServiceOrder,
            OrderProductId: OrderProductId,
            User: User
        }

        const responseData = await CreateBulkProductOut(insertData)
        return responseData
    },

    async GetByOutId (OutId: number) {
        const data = await GetBulkProductOutByOutId(OutId)
        const bulkProductOut = this.AdaptFromApi(data)
        return bulkProductOut
    },

    async ListByOpeningId (OpeningId: number) {
        const data = await ListBulkProductOutsByOpeningId(OpeningId)
        const bulkProductOutList = this.AdaptListFromApi(data)
        return bulkProductOutList
    },
    
    async ListByOrderProductId (OrderProductId: number) {
        const data = await ListBulkProductOutsByOrderProductId(OrderProductId)
        const bulkProductOutList = this.AdaptListFromApi(data)
        return bulkProductOutList
    }
}

export default BulkProductOutGestor