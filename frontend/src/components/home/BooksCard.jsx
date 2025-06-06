import React from "react";
// import { Link } from "react-router-dom";
// import { PiBookOpenTextLight } from "react-icons/pi"
// import { BiUserCircle } from "react-icons/bi"
// import { BsInfoCircle } from "react-icons/bs"
// import { AiOutlineEdit } from "react-icons/ai"
// import { MdOutlineDelete } from "react-icons/md"
import BookSingleCard from "../home/BookSingleCard";

const BooksCard = ({books}) => {
    // console.log(books);
    return(
        <div className="grid sm:grid-col-2 lg:grid-cols-3 xl:grid-cols-3">
            {books.map((item) => (
                <BookSingleCard key={item._id} book={item}/>
            ))}
        </div>
    );
}

export default BooksCard;