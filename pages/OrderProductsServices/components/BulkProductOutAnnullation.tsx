import { BulkProductOutAnnullation } from "@/models/BulkProductOutAnnullations.model"
import { useState } from "react"
import { Tooltip } from "reactstrap"

interface BulkProductOutAnnullationProps {
    bulkProductOutAnnulation: BulkProductOutAnnullation
}

const BulkProductOutAnnullation: React.FC<BulkProductOutAnnullationProps> = ({bulkProductOutAnnulation}) => {

    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    const {ProductCode, Amount, AnnulledReason,RegisteredBy, RegistrationDate, AnnullationId} = bulkProductOutAnnulation

    return(
        <div className="row" id={'_'+AnnullationId} key={AnnullationId}>
            <div className="col-lg-2 col-md-2 col-sm-3 col-xs-2"><span ><strong>{ProductCode}</strong></span></div>
            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2"><strong>Cant:</strong> {Amount}</div>
            <div className="col-lg-3 col-md-4 col-sm-5 col-xs-2"><strong>Motivo:</strong> {AnnulledReason}</div>
            
            <Tooltip isOpen={tooltipOpen} target={'_'+AnnullationId} toggle={toggle}>
                Agregó {RegisteredBy} a las {RegistrationDate.toFormat('T MMM d')}
            </Tooltip>
        </div>
    )

}

export default BulkProductOutAnnullation