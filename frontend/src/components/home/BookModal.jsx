import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";

const BookModal = ({book, onClose}) => {
    return(
        <div 
            className="fixed bg-slate-900/80 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
            onClick={onClose}
        >
            <div 
                className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative" 
                onClick={(e) => e.stopPropagation()}
            >
                <AiOutlineClose 
                    className="absolute right-6 top-6 text-3xl text-red-700 cursor-pointer transition duration-150 ease-in-out hover:text-rose-500 hover:scale-110"
                    onClick={onClose}
                />

                {/* ID */}
                <h4 className="my-2 text-gray-500">{book._id}</h4>
                
                {/* Publish year */}
                <h2 className="w-fit px-3 py-1 mt-2 bg-rose-300 rounded-lg ">
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

            </div>
        </div>
    );
}

export default BookModal;