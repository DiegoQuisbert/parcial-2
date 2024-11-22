import {useParams} from "react-router-dom";

const Director = () => {

    const {id} = useParams;

    return(
        <>
            <div className="container-fluid">
                <h2>{id}</h2>
            </div>
        </>
    )
}

export default Director;