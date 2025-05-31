import React, { useState, useEffect } from "react";
import BackgroundLayer from "../components/BackgroundLayer";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
//? notification/alert
import { useSnackbar } from "notistack";
import useLogin from "../hooks/useLogin.js";
//? redirect / navigate
import { useNavigate } from "react-router-dom";

const LogIn = () => {
    //? button helpers
    const [isClicked, setIsClicked] = useState(false);

    const handleClickFeel = () => {
        setIsClicked(true);
        setTimeout(() => {
            setIsClicked(false);
        }, 1000);
    }

    //? password eye
    const [eyeSee, setEyeSee] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // destructure custom hook
    const { login, loading, error} = useLogin();

    //? notification/alert:
    const { enqueueSnackbar } = useSnackbar();

    //? redirect / navigate
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        // default bahaviour of the form is refersh the page on submit
        e.preventDefault();

        const userInfo = await login(email, password);
        console.log("userInfo: ", userInfo);
        //? send logged in notification & redirect to <Home/>
        if(userInfo) {
            enqueueSnackbar("User logged in!", {
                variant: "success",
                style: { borderRadius:"10px" }
            });

            setTimeout(()=> {
                navigate("/");
            }, 1000);
        }

    }

    //? error notification
    useEffect(() => {
        if(error) {
            //? notification/alert
            enqueueSnackbar(`${error}`, { 
                variant: "error", 
                style:{ borderRadius: '10px' } 
            });
        }
    }, [error]);

    return(
        <form className="relative w-screen h-screen overflow-hidden" onSubmit={handleSubmit}>
            {/* Background Layer */}
            <BackgroundLayer />

                {/* Content Layer */}
                <div className="relative z-10 flex justify-center items-center w-full h-full">
                    {/* <div className="w-[500px] h-[550px] border-2 border-gray-700 rounded-xl m-10 flex flex-col p-5"> */}
                    <div className="w-[500px] h-auto border-2 border-gray-700 bg-white bg-opacity-80 rounded-xl m-10 flex flex-col p-5">

                        <h1 className="mt-5 text-3xl my-4 font-bold">Log in</h1>

                        {/* input fields */}
                        <div className="mt-3">

                            {/* Email */}
                            <div className="m-4 mb-9">
                                <label className="text-xl mr-4 text-gray-600">Email</label>
                                <input 
                                    type="email" 
                                    className="w-full border-2 border-gray-500 px-4 py-2 rounded-lg"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>

                            {/* Password */}
                        <div className="m-4">
                            <label className="text-xl mr-4 text-gray-600">Passowrd</label>
                            <div className="flex items-center gap-1">
                                {/* password i/p field */}
                                {
                                    (eyeSee) ? <input type="text" className="w-full border-2 border-gray-500 px-4 py-2 rounded-lg" onChange={(e) => setPassword(e.target.value)} /> :
                                    <input type="password" className="w-full border-2 border-gray-500 px-4 py-2 rounded-lg" onChange={(e) => setPassword(e.target.value)} />

                                }

                                {/* eye */}
                                {
                                    (eyeSee) ? <div className="transition ease-in-out duration-200  hover:bg-slate-200 cursor-pointer text-2xl p-2 rounded-full" onClick={() => setEyeSee(false)}> <FaRegEye /> </div> :
                                    <div className="transition ease-in-out duration-200  hover:bg-slate-200 cursor-pointer text-2xl p-2 rounded-full" onClick={() => setEyeSee(true)}> <FaRegEyeSlash /> </div>
                                }
                            </div>
                        </div>

                    </div>
                        
                        {/* Login btn */}
                        <div className="flex items-center justify-center">
                            <button 
                                className={`mt-6 p-2 w-[94%] bg-sky-400 rounded-lg transition duration-200 ease-in-out shadow-lg hover:shadow-sky-600/50 hover:bg-sky-500 cursor-pointer ${isClicked ? "scale-95" : "scale-100" }`}
                                onClick={handleClickFeel}
                                //? if `loading=true` disable Sign-up btn
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Log in"}
                            </button>
                        </div>

                        <div className="flex ">
                            <p className="mt-4 ml-4 text-sm text-gray-500">
                                First time? 
                            </p>
                            <a href="/user/signup" className="underline text-sky-700 font-bold mt-4 ml-1 text-sm">Signup</a> 
                        </div>

                        
                    </div>
                </div>
        </form>
    );
}

export default LogIn;