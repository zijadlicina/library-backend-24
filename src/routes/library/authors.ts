import { Router } from "express";
import { authorsController, authorBookController } from "../../controllers";

export default () => {
    const router = Router()
    router.get("/", authorsController.getAllAuthors);
    router.post("/", authorsController.createOneAuthor);
    router.get("/:id", authorsController.getOneAuthor)
    router.put("/:id", authorsController.updateOneAuthor)
    router.delete("/:id", authorsController.deleteOneAuthor)
    router.get("/:id/books", authorBookController.getBooksForAuthor);
    router.post("/:id/books", authorBookController.addBookToAuthor);
    router.delete("/:idAuthor/books/:idBook", authorBookController.deleteAuthorFromBook)
    return router;
}