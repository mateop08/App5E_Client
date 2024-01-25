import { ReceptionIndicators } from "@/models/Orders.model"
import { FaDroplet } from "react-icons/fa6";
import { FaGear } from "react-icons/fa6";
import { GiCarWheel } from "react-icons/gi";
import { RiFilePaperLine } from "react-icons/ri";
import { LuActivitySquare } from "react-icons/lu";
import { LuShieldAlert } from "react-icons/lu";

interface IndicatorsProps {
    ReceptionIndicators: ReceptionIndicators
}

const Indicators: React.FC<IndicatorsProps> = ({ReceptionIndicators}) => {

    const {Diagnosis, Lubrication, Mechanics, Powertrain, Quote, Warranty} = ReceptionIndicators
    return(
        <span style={{fontSize: '20px'}}>
        {Lubrication &&
            <span style={{color: "#FFBF00"}}><FaDroplet/></span>
        }
        {Mechanics &&
            <span style={{color: "gray"}}><FaGear /></span>
        }
        {Powertrain &&
            <span style={{color: "blue"}}><GiCarWheel /></span>
        }
        {Quote &&
            <span style={{color: "green"}}><RiFilePaperLine /></span>
        }
        {Diagnosis &&
            <span style={{color: "purple"}}><LuActivitySquare /></span>
        }
        {Warranty &&
            <strong><span style={{color: "red"}}><LuShieldAlert /></span></strong>
        }    
        </span>
    )
}

export default Indicators