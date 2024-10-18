import type { Router, Request, Response } from "express";
import { authorsController } from "../../controllers";

export default ({router}: {router: Router}) => {
    router.get("/", authorsController.getAllAuthors);
    router.post("/", authorsController.createOneAuthor);
    router.get("/:id", authorsController.getOneAuthor)
    router.put("/:id", authorsController.updateOneAuthor)
    router.delete("/:id", authorsController.deleteOneAuthor)
    router.get("/:id/books", authorsController.getBooksFromAuthor);
    router.post("/:id/authors", authorsController.addBookToAuthor);
    router.delete("/:idBook/authors/:idAuthor", authorsController.deleteBookFromAuthor)
    return router;
}