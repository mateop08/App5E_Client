
import Preview, { PreviewType } from "./Preview";
import { BsFileEarmarkImage } from "react-icons/bs"

const PreviewImage: React.FC<PreviewType> = ({source, collapse}) => {
    return(
        <Preview Icon={BsFileEarmarkImage} collapse={collapse}>
            <a href={source} target="_blank">
                <img src={source} style={{maxHeight: '200px', maxWidth:'270px'}} className="img-responsive border rounded" />
            </a>
        </Preview>
    )
}

export default PreviewImage