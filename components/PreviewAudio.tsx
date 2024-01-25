import Preview, { PreviewType } from "./Preview";
import { BsSoundwave } from "react-icons/bs";

const PreviewAudio: React.FC<PreviewType> = ({source, collapse}) => {
    
    return(
        <Preview Icon={BsSoundwave} collapse={collapse} >
            <audio className="embed-responsive" style={{width: '270px'}} src={source} controls>
                Your browser does not support the <code>audio</code> element.
            </audio>
        </Preview>
    )
}

export default PreviewAudio