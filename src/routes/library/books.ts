import type { Router, Request, Response } from "express";
import { booksController } from "../../controllers";

export default ({router}: {router: Router}) => {
    router.get("/", booksController.getAllBooks);
    router.post("/", booksController.createOneBook);
    router.get("/:id", booksController.getOneBook)
    router.put("/:id", booksController.updateOneBook)
    router.delete("/:id", booksController.deleteOneBook)
    router.get("/:id/books", booksController.getAuthorsFromBook);
    router.post("/:id/books", booksController.addAuthorToBook);
    router.delete("/:idBook/books/:idAuthor", booksController.deleteAuthorFromBook)
    return router;
}