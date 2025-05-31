import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useAuth } from "../contexts/AuthContext";


function CreateBook() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publishYear, setPublishYear] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    // const { user } = ;

    const handleSaveBook = () => {
        const data = {
            title,
            author,
            publishYear
        };

        setLoading(true);

        axios.post("http://localhost:5001/books", data, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(() => {
                setLoading(false);
                //? notification/alert
                enqueueSnackbar("Book created successfully", { variant: "success", style:{ borderRadius: '10px' } });
                //? redirect to
                navigate("/");
            })
            .catch((error) => {
                setLoading(false);
                //? notification/alert
                // enqueueSnackbar("Ah..shit! something's not working, Check the console for error(s)", { variant: "error" });
                enqueueSnackbar(`${error.response.data.error}`, {
                    variant: "error", style: {
                        borderRadius: "10px"
                    }
                });
                // alert("Ah..shit! something's not working, Check the console for error(s)");
                console.log("xhud gaye guru: ", error);
            });
    }

    return (
        <div className="p-4">
            <BackButton />

            <h1 className="text-3xl my-4 font-bold">Create Book</h1>
            {loading ? <Spinner /> : ""}

            <div className="flex flex-col border-3 border-sky-500 rounded-xl w-[600px] p-4 mx-auto">
                {/* Title */}
                <div className="my-4 ">
                    <label className="text-xl mr-4 text-gray-500">Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border-2 border-gray-500 px-4 py-2 w-full rounded-md"/>
                </div>

                {/* Author */}
                <div className="my-4 ">
                    <label className="text-xl mr-4 text-gray-500">Author</label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="border-2 border-gray-500 px-4 py-2 w-full rounded-md"/>
                </div>

                {/* Publish Year */}
                <div className="my-4 ">
                    <label className="text-xl mr-4 text-gray-500">Publish Year</label>
                    <input type="text" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} className="border-2 border-gray-500 px-4 py-2 w-full rounded-md"/>
                </div>

                {/* Save Btn */}
                <button className="p-2 bg-emerald-400 rounded-lg m-8 transition duration-200 ease-in-out shadow-lg hover:shadow-green-600/50 hover:bg-emerald-500 hover:scale-105" onClick={handleSaveBook}>
                    Save
                </button>

            </div>

        </div>
    )
}

export default CreateBook;