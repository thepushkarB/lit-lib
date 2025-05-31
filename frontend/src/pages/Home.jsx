import React, { useState, useEffect } from 'react';
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';
import { FaUserAstronaut } from "react-icons/fa";
// import { useAuth } from '../contexts/AuthContext';
import useLogout from '../hooks/useLogout';
//? notification / alert
import { useSnackbar } from 'notistack';
//? redirect / navigate
import { useNavigate } from "react-router-dom";

function Home() {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    //? Table vs Card type display of data
    const [showType, setShowType] = useState("table");

    //? logout btn
    //? destructuring custom hook for logout button
    const { logout } = useLogout();

    const [isClicked, setIsClicked] = useState(false);

    //? notification / alert
    const {enqueueSnackbar} = useSnackbar();

    //? redirect / navigate
    const navigate = useNavigate();

    const handleLogout = () => {
        //? button click feel
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 120);

        //? logout - remove user & token ffrom local storage
        logout();

        //? notification/alert
        enqueueSnackbar("User logged out!", {
            variant: "success",
            style: { borderRadius: "10px" }
        });
    }
    // const { user } = useAuth();
    const userInfo = JSON.parse(localStorage.getItem('user'));
    // console.log(userInfo.user.name);

    useEffect(() => {
        // setLoading(!loading);              
        setLoading(true); 

        axios
           .get("http://localhost:5001/books")
           .then((resp) =>{
               setBooks(resp.data.data);
               setLoading(false);
           })
           .catch((error) => {
               console.log("xhud gaye guru: ", error);
               setLoading(false);
               //? notification/alert
                enqueueSnackbar("Log-in kariye maharaj!", {
                    variant: "info",
                    style: { borderRadius: "10px" }
                });
           });

    }, [ ]);

  return (
    <div>
        <div className="p-4 ">
            {/* top `table` vs `card` bar */}
            {showType === "table" ? (
                <div className="flex justify-center items-center gap-x-4 bg-slate-800 rounded-2xl w-[300px] ml-[510px] py-1">
                    <button className=" bg-sky-600 px-4 py-1 rounded-xl scale-85" onClick={() => setShowType("table")}>
                        Table
                    </button>

                    <button className="bg-sky-300 transition ease-in-out duration-150 hover:bg-sky-600 px-4 py-1 rounded-xl hover:scale-85" onClick={() => setShowType("card")}>
                        Card
                    </button>
                </div>
            ) : (
                <div className="flex justify-center items-center gap-x-4  bg-slate-800 rounded-2xl w-[300px] ml-[510px] py-1">
                    <button className="bg-sky-300 transition ease-in-out duration-150 hover:bg-sky-600 px-4 py-1 rounded-xl hover:scale-85" onClick={() => setShowType("table")}>
                        Table
                    </button>

                    <button className=" bg-sky-600 px-4 py-1 rounded-xl scale-85" onClick={() => setShowType("card")}>
                        Card
                    </button>
                </div>
            )}

            {/* username & logout btn */}
            <div className="flex justify-end items-center gap-3 m-1">
                <div className="flex gap-3 bg-slate-300 p-2 rounded-2xl">
                    <div className="flex items-center text-xl gap-1 bg-slate-400 rounded-xl p-1.5">
                        {/* astronaut icon */}
                        <FaUserAstronaut />
                        {/* username */}
                        <div className="text-[18px]">
                            {userInfo ? userInfo.user.name : 'Guest'}
                            {/* {JSON.parse(localStorage.getItem('user')).user.name} */}
                        </div>
                    </div>
                    {/* logout btn */}
                    {userInfo ? 
                    <button
                        className={`bg-rose-400 transition ease-in-out duration-150 hover:bg-rose-600 px-4 py-1 rounded-xl shadow-lg hover:shadow-rose-600/50 cursor-pointer ${isClicked ? 'scale-95' : 'scale-100'}`}
                        onClick={handleLogout}
                    >
                        Logout
                    </button> : 
                    <button
                        className={`bg-sky-300 transition ease-in-out duration-150 hover:bg-sky-500 px-4 py-1 rounded-xl shadow-lg hover:shadow-sky-600/50 cursor-pointer ${isClicked ? 'scale-95' : 'scale-100'}`}
                        onClick={() => {
                            setIsClicked(true);
                            navigate("/user/login")
                        }}
                    >
                        Login
                    </button> }
                </div>
            </div>
            

            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-extrabold my-8 text-slate-700">Books List</h1>

                {/* Create/add book */}
                <Link to="/books/create">
                    <MdOutlineAddBox className="text-sky-700 text-4xl transition duration-150 ease-in-out hover:text-sky-600 hover:scale-110" />
                </Link>
            </div>

            {loading ?  <Spinner />  : showType === "table" ? ( <BooksTable books={books} /> ) : ( <BooksCard books={books}/> )} 
            
        </div>
    </div>
  )
}

export default Home; 
