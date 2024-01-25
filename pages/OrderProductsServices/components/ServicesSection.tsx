import { FormProvider, useForm } from "react-hook-form"
//Context
//Custom hooks
//Components
import ServicesTable from "@/pages/OrderProductsServices/components/ServicesTable"
import ServicesSearch from "@/pages/OrderProductsServices/components/ServicesSearch"
import ServicesForm from "@/pages/OrderProductsServices/components/ServicesForm"
//Models
import { OrderService } from "@/models/OrderServices.model"
import ServicesGestor from "@/models/Services.model"
import TechnicianGestor from "@/models/Technicians.model"


export interface serviceForm extends Omit<OrderService, 'Amount' | 'InterventionRecord'>{
    Amount: number | null,
    SearchedDescription: string
}

const ServicesSection = () => {

    const initialServiceFormState: serviceForm = {
        OrderDocument: '',
        OrderNumber: 0,
        Id: 0,
        Service: ServicesGestor.GetEmpty(),
        Amount: null,
        Technician: TechnicianGestor.GetEmpty(),
        Note: '',
        SearchedDescription: ''
    }

    
    

    

    const formMethods = useForm<serviceForm>( {defaultValues: initialServiceFormState} )

    return (
        <FormProvider {...formMethods}>
            <ServicesTable />
            <ServicesForm/>
            <ServicesSearch />
        </FormProvider>
    )
}

export default ServicesSection