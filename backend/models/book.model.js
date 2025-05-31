import mongoose from "mongoose";

// create a Schema
const bookSchema  = mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishYear: {
        type: Number,
        required: true
    },
}, { timestamps: true }
);

// create a model
const Book = mongoose.model("book", bookSchema);

// export the model
export default Book;