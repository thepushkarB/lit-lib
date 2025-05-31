import { useState } from "react";
import { onCLS } from "web-vitals";

const SignupLoginBtn = ({label, onClick}) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClickFeel = () => {
        setIsClicked(true);
        setTimeout(() =>  setIsClicked(false), 150);
    }

    if(onClick) {
        onClick();
    }
    
    return(
        <div className="flex items-center justify-center">
            <button 
                className={`mt-6 p-2 w-[94%] bg-sky-400 rounded-lg transition duration-200 ease-in-out shadow-lg hover:shadow-sky-600/50 hover:bg-sky-500  cursor-pointer ${isClicked ? 'scale-95' : 'scale-100'}`} 
                onClick={handleClickFeel}
            >
                {label}
            </button>
        </div>
    ) 
}

export  default SignupLoginBtn;
