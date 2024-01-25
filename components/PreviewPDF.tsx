import Preview, { PreviewType } from "./Preview";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs"

const PreviewPDF: React.FC<PreviewType> = ({source, collapse}) => {

    return (
        <Preview Icon={BsFillFileEarmarkPdfFill} collapse={collapse}>
            <a href={source} target="_blank">
            <embed src={source} width="260" height="170"
                type="application/pdf"></embed>
            </a>
        </Preview>
    )
}

export default PreviewPDF