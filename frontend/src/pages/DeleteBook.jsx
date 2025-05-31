import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

function DeleteBook() {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleDeleteBook = () => {
        setLoading(true);
        axios.delete(`http://localhost:5001/books/${id}`)
            .then(() => {
                setLoading(false);
                //? notification/alert
                enqueueSnackbar("Book deleted successfully", {variant: "success", style:{ borderRadius: '10px' }});
                //? rediect to
                navigate("/");
            })
            .catch((error) => {
                setLoading(false);
                //? notification/alert
                // enqueueSnackbar("Ah..shit! something's not working, Check the console for error(s)", {variant: "error"})
                enqueueSnackbar(`${error.response.data.error}`, {
                    variant: "error", style: {
                        borderRadius: "10px"
                    }
                });
                // alert("Ah..shit! something's not working, Check the console for error(s)");
                console.log("xhud gaye guru: ", error);
            })
    }

    return (
        <div className="p-4">
            <BackButton />

            <h1 className="text-3xl my-4 font-bold">Delete Book</h1>
            {loading ? <Spinner /> : ""}

            <div className="flex flex-col border-3 items-center bg-slate-300 border-slate-500 rounded-xl w-[600px] p-4 mx-auto shadow-slate-500 shadow-2xl">
                {/* Heading que */}
                <h3 className="text-2xl">You sure bout this dawg?</h3>

                {/* Delete Btn */}
                <button className="p-2 bg-rose-500 text-white rounded-lg m-8 transition duration-200 ease-in-out shadow-lg hover:shadow-red-600/50 hover:bg-rose-600 hover:scale-105" onClick={handleDeleteBook}>
                    Delete
                </button>
            </div>

        </div>
    )
}

export default DeleteBook;