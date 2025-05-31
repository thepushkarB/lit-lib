import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

function BackButton({destination = "/"}) {
    return(
        <div className="flex">
            <Link to={destination} className="bg-sky-600 text-white px-4 rounded-lg w-fit transition duration-150 ease-in-out hover:bg-sky-700 hover:scale-90">
                <BsArrowLeft className="text-2xl"/>
            </Link>
        </div>
    );
}

export default BackButton;