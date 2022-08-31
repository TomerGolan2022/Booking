import loading from "../../../Assets/Images/loading.gif";
import "./Loading.css";

function Loading(): JSX.Element {
    return (

        <div className="Loading">
			<img src={loading} />
        </div>
        
    );
}

export default Loading;
