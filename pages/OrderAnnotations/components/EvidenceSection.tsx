import Preview from "@/components/Preview"
import { BsFolderFill, BsFillPlusCircleFill } from "react-icons/bs"
import Evidence from "./Evidence"
import { CardDeck, Button } from "reactstrap"
import { useAnnotationsContext } from "../context/AnnotationsContext"
import { useEffect, useState } from "react"
import OrderAnnotationDetailGestor, { OrderAnnotationDetail } from "@/models/OrderAnnotationDetails.model"

interface EvidenceSectionProps {
    annotationId: number
}

const EvidenceSection: React.FC<EvidenceSectionProps> = ({annotationId}) => {

    const {evidencesModals: {formWindow, crud}, selectAnnotation: {change}, orderAnnotationsListState: {refreshList} } = useAnnotationsContext()

    const [evidenceList, setEvidenceList] = useState<OrderAnnotationDetail[]>([])

    const handleCreateEvidence = () => {
        formWindow.toggleModal()
        crud.setToCreate()
        change(annotationId)
    }

    useEffect(() =>{
        OrderAnnotationDetailGestor.List(annotationId)
            .then((data) => setEvidenceList(data) )
            .catch((error) => window.alert(error))
    },[annotationId, refreshList])

    
    return(
        <Preview Icon={BsFolderFill} collapse={true}>
            <Button color="secondary" onClick={handleCreateEvidence}><BsFillPlusCircleFill/> Evidencia</Button>
            <div className="container" style={{overflow: 'auto'}}>
                <CardDeck className="d-flex flex-row flex-nowrap" >
                    {
                        evidenceList.map((e) => <Evidence key={e.EvidenceId} orderAnnotationDetail={e}/>)
                    }
                </CardDeck>
            </div>
        </Preview>
    )

}

export default EvidenceSection