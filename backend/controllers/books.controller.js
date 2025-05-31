import Book from "../models/book.model.js";

//? Add book;
export const createBook = async(req, resp) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear) {
            return resp.status(400).send({ 
                msg: "Send all required fields like, 'title', 'author' & 'publishYear'" 
            });
        }
        
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };
    
        const book = await Book.create(newBook);
        return resp.status(201).send(book);
    }
    catch(error) {
        // console.log(error);
        console.error(error);
        resp.status(500).send({ msg: msg.error });
    }
}


//? get all books
export const getAllBooks = async(req, resp) => {
    try {
        const books = await Book.find({});
        if(!books) {
            return resp.status(204).send("no data found");
        }

        // resp.status(200).json(books);
        return resp.status(200).json({
            count: books.length,
            data: books
        });
    }
    catch(error) {
        console.error(error);
        return resp.status(500).send({msg: msg.error});
        // return resp.status(500).send(`error from getAllBooks(): ${error.message}`);
    }
}


//? get a book
export const getBook = async(req, resp) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        resp.status(200).json(book);
    }
    catch(error) {
        resp.status(500).send({ msg: msg.error});
    }
}


//? update a book
export const updateBook = async (req, resp) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear) {
            return resp.status(400).send({ msg: "Send all required fields. " });
        }

        const { id } = req.params;
        const book = await Book.findByIdAndUpdate(id, req.body);

        if(!book) {
            return resp.status(404).json({ msg: "Book not found" });
        }

        return resp.status(200).send({msg: "Book updated.", bookName: book.title});
    }
    catch(error) {
        console.error(error);
        resp.status(500).send({ msg: error.message });
    }
}


//? delete book
export const deleteBook = async(req, resp) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndDelete(id);
        /*
        * 'Book.findByIdAndDelete(id)' returns the deleted document, not just a success status,
            ?- If a book with that `id` existed, book will contain the data of the deleted book.
            ?- If the book did NOT exist (wrong ID, already deleted, etc.), book will be null.
        */
        if(!book) {
            return resp.status(404).json({ msg: "Book not found" });
        }

        return resp.status(200).send({ msg: "Book deleted: ", book });
    }
    catch(error) {
        console.error(error);
        resp.status(500).send({ msg: error.message });
    }
}