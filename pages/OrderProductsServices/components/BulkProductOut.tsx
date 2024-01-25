import { BulkProductOut } from "@/models/BulkProductOuts.model"
import { Tooltip, Button } from "reactstrap"
import { useState } from "react"
import BulkProductOutAnnullationSection from "./BulkProductOutAnnullationSection"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { useProductsContext } from "../context/ProductsContext"

interface BulkProductOutProps {
    BulkProductOut: BulkProductOut
}

const BulkProductOut: React.FC<BulkProductOutProps> = ({BulkProductOut}) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    const {ProductCode, OutId, InitialNumber, FinalNumber, Amount, 
        WithDigitalDispenser, RegisteredBy, RegistrationDate, HasAnnullation} = BulkProductOut

    const {productsModals: {bulkAnnullationWindow}, selectBulkProductOutState } = useProductsContext()

    const handleAnnullation = () => {
        bulkAnnullationWindow.toggleModal()
        selectBulkProductOutState.change(BulkProductOut)
    }
    
    return(
        <>
        <div className="row" id={'_'+OutId} key={OutId}>
            <div className="col-lg-2 col-md-2 col-sm-3 col-xs-2"><span ><strong>{ProductCode}</strong></span></div>
            <div className="col-lg-1 col-md-2 col-sm-2 col-xs-2">{WithDigitalDispenser ? 'Digital' : 'Manual'}</div>
            <div className="col-lg-2 col-md-1 col-sm-2 col-xs-2"><strong>Cant:</strong> {Amount}</div>
            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">{WithDigitalDispenser && <><strong>Inicial:</strong> {InitialNumber}</>}</div>
            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">{WithDigitalDispenser && <><strong>Final:</strong> {FinalNumber}</>}</div>
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                <Button color='danger' onClick={handleAnnullation}><BsFillPlusCircleFill/>&nbsp; Anulación</Button>
            </div>
            
            
            <Tooltip isOpen={tooltipOpen} target={'_'+OutId} toggle={toggle}>
                Agregó {RegisteredBy} a las {RegistrationDate.toFormat('T MMM d')}
            </Tooltip>
        </div>
        {HasAnnullation &&
            <BulkProductOutAnnullationSection OutId={OutId} />
        }
        
        </>
    )
}

export default BulkProductOut