import React from "react";
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const BooksTable = ({books}) => {
    return (
        <table className="w-full border-separate border-spacing-2">
            <thead>
                <tr>
                    <th className="border border-slate-600 rounded-md">No</th>
                    <th className="border border-slate-600 rounded-md">Title</th>
                    <th className="border border-slate-600 rounded-md max-md:hidden">Author</th>
                    <th className="border border-slate-600 rounded-md max-md:hidden">Publish Year</th>
                    <th className="border border-slate-600 rounded-md">Operations</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book, index) => (
                    <tr key={book._id} className="h-8">
                        {/* No. */}
                        <td className="border border-slate-700 rounded-md text-center">
                            {/* b'coz index starts from 0 but we have start from 1 for the table */}
                            {index + 1}
                        </td>

                        {/* Title */}
                        <td className="border border-slate-700 rounded-md text-center">
                            {book.title}
                        </td>

                        {/* Author */}
                        <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                            {book.author}
                        </td>

                        {/* Publish Year */}
                        <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                            {book.publishYear}
                        </td>

                        {/* Operations */}
                        <td className="border border-slate-700 rounded-md text-center">
                            <div className="flex justify-center gap-x-4">
                                {/* Show details */}
                                <Link to={`/books/details/${book._id}`}>
                                    <BsInfoCircle className="text-2xl text-green-800 transition duration-150 ease-in-out hover:text-emerald-600 hover:scale-105" />
                                </Link>

                                {/* Edit details */}
                                <Link to={`/books/edit/${book._id}`}>
                                    <AiOutlineEdit className="text-2xl text-amber-700 transition duration-150 ease-in-out hover:text-amber-500 hover:scale-110" />
                                </Link>

                                {/* Delete */}
                                <Link to={`/books/delete/${book._id}`}>
                                    <MdOutlineDelete className="text-2xl text-rose-700 transition duration-150 ease-in-out hover:text-rose-500 hover:scale-110" />
                                </Link>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default BooksTable;