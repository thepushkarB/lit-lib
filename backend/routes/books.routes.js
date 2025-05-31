import express from "express";
import { createBook, getAllBooks, getBook, updateBook, deleteBook } from "../controllers/books.controller.js";
//? Authorization
import requireAuth from "../middlewares/requireAuth.js";

const router = express.Router();

// router.route("/")
//     .get(getAllBooks)
//     .post(createBook);

// Does NOT use requireAuth middleware.
//* unprotected route
router.get("/", getAllBooks);

//? middleware- Authorization check
//* protected routes
router.use(requireAuth);
// All other routes after this middleware use requireAuth middleware.

router.post("/", createBook);

router.route("/:id")
    .get(getBook)
    .put(updateBook)
    .delete(deleteBook);
//

export default router;