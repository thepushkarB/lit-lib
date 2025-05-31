import express from "express";
import dotenv from "dotenv";
dotenv.config();
import dbConnection from "./db/dbConnect.db.js";
import booksRoute from "./routes/books.routes.js";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";

const app = express();

//* middleware
app.use(express.json());
//* middelware-CORS
//? Method 1:- allow all origins w/ default of cors(*)
app.use(cors());
//? Method 2:- allow custom origins
// app.use(
//     cors({
//         origin: "http://localhost:3001",
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         allowedHeaders: ["Content-Type"]
//     })
// );

//* routes
// import { createBook, getAllBooks, getBook, updateBook, deleteBook} from "./controllers/books.controller.js";
// app.post("/books", createBook);
// app.get("/books", getAllBooks);
// app.get("/books/:id", getBook);
// app.put("/books/:id", updateBook);
// app.delete("/books/:id", deleteBook);
app.use("/books", booksRoute);
app.use("/user", userRoutes);

const port = process.env.PORT || 5001;

//* connet to DB then server
dbConnection(app, port);

//* http methods
app.get("/", async(req, resp) => {
    resp.status(200).send('<h1>Hello nigga</h1>');
});


