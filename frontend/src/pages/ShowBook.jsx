import React, { useMemo } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

function ShowBook() {
    const [book, setBook] = useState({});
    const [coverUrl, setCoverUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5001/books/${id}`)
            .then(async (resp) => {
                //? book details
                setBook(resp.data);

                //? book cover
                // const API = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=${encodeURIComponent(resp.data.title)}&redirects=1&pithumbsize=500&origin=*`;
                // // console.log("API: ", API);
                // try {
                //     const response = await axios.get(API);
                //     if (response.data && response.data.query && response.data.query.pages) {
                //         // Proceed with accessing pages
                //         const pages = response.data.query.pages;
                //         const page = pages[Object.keys(pages)[0]];
                //         if(page.thumbnail && page.thumbnail.source) {
                //             setCoverUrl(page.thumbnail.source);
                //         }
                //     } else {
                //         console.error("Unexpected response structure:", response.data);
                //     }
                // }
                // catch(error) {
                //     console.log("xhud gaye guru: ", error);
                // }

                //? loading-false
                setLoading(false);
            })
            .catch((error) => {
                console.log("xud gaye guru: ", error);
            })
        //

    }, []);

    return (
        <div className="p-4 ">
            <BackButton />

            <h1 className="text-3xl my-4 font-bold"> Show Book </h1>

            { loading ? (
                <Spinner/>
            ) : (
                <div className="flex flex-row border-3 border-sky-500 rounded-lg w-fit p-4 mx-auto">
                    {/* Book Cover Img */}
                    {/* {coverUrl && (
                        <div className="my-4">
                            <img src={coverUrl} alt="Book Cover" className="w-40 h-auto border rounded shadow-2xl mr-10" />
                        </div>
                    )} */}

                    {/* Book Details */}
                    <div className="flex flex-col">
                        <div className="my-4">
                            <span className="text-xl mr-4 text-slate-500 ">Id:</span>
                            <span>{book._id}</span>
                        </div>

                        <div className="my-4">
                            <span className="text-xl mr-4 text-slate-500 ">Title:</span>
                            <span>{book.title}</span>
                        </div>

                        <div className="my-4">
                            <span className="text-xl mr-4 text-slate-500 ">Author:</span>
                            <span>{book.author}</span>
                        </div>

                        <div className="my-4">
                            <span className="text-xl mr-4 text-slate-500 ">Publish Year:</span>
                            <span>{book.publishYear}</span>
                        </div>

                        <div className="my-4">
                            <span className="text-xl mr-4 text-slate-500 ">Create Time:</span>
                            <span>{new Date(book.createdAt).toString()}</span>
                        </div>

                        <div className="my-4">
                            <span className="text-xl mr-4 text-slate-500 ">Last Update Time:</span>
                            <span>{new Date(book.updatedAt).toString()}</span>
                        </div>
                    </div>
                    

                </div>
            )}
        </div>
    );
}

export default ShowBook;