import Preview, { PreviewType } from "./Preview";
import { BsFillPlayBtnFill } from "react-icons/bs";

const PreviewVideo: React.FC<PreviewType> = ({source, collapse}) => {

    return(
        <Preview Icon={BsFillPlayBtnFill} collapse={collapse}>
            <video className="embed-responsive rounded" src={source} width="265" height="170" controls>
                Your browser does not support the <code>audio</code> element.
            </video>
        </Preview>
    )
}

export default PreviewVideo