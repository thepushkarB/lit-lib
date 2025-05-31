import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import BookModal from "../home/BookModal";

const BookSingleCard = ({ book }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div
            className="border-2 border-gray-500 px-4 py-2 m-4 rounded-lg relative transition duration-150 ease-in-out hover:shadow-xl shadow-gray-300 hover:scale-105"
        >
            {/* ID */}
            <h4 className="my-2 text-gray-500">{book._id}</h4>

            {/* Publish year */}
            <h2 className="absolute top-1 right-2 px-3 py-1 mt-2 bg-rose-300 rounded-lg ">
                {book.publishYear}
            </h2>

            {/* Title */}
            <div className="flex justify-start items-center mt-2 gap-x-2">
                <PiBookOpenTextLight className="text-slate-600 text-2xl" />
                <h2 className="my-1">{book.title}</h2>
            </div>

            {/* Author */}
            <div className="flex justify-start items-center mt-1.5 gap-x-2">
                <BiUserCircle className="text-slate-600 text-2xl" />
                <h2 className="my-1">{book.author}</h2>
            </div>

            {/* Operations */}
            <div className="flex justify-between items-center gap-x-2 mt-3 p-4">
                {/* Show Modal */}
                <BiShow
                    className="text-4xl text-blue-800 transition duration-150 ease-in-out hover:text-blue-600 hover:scale-110 cursor-pointer"
                    onClick={() => setShowModal(true)}
                />

                {/* Show Details */}
                <Link to={`books/details/${book._id}`}>
                    <BsInfoCircle className="text-2xl text-emerald-900 transition duration-150 ease-in-out hover:text-emerald-600 hover:scale-110" />
                </Link>

                {/* Edit Details */}
                <Link to={`books/edit/${book._id}`}>
                    <AiOutlineEdit className="text-2xl text-amber-700 transition duration-150 ease-in-out hover:text-amber-500 hover:scale-115" />
                </Link>

                {/* Delete Details */}
                <Link to={`books/delete/${book._id}`}>
                    <MdOutlineDelete className="text-2xl text-rose-700 transition duration-150 ease-in-out hover:text-rose-500 hover:scale-115" />
                </Link>

            </div>

            {showModal && (<BookModal book={book} onClose={() => setShowModal(false)} />)}
            {/* {showModal ? (<BookModal book={book} onClose={() => setShowModal(false)} />) : ''} */}
            
        </div>
    );
}

export default BookSingleCard;