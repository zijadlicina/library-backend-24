import { Router} from "express";
import { booksController, authorBookController } from "../../controllers";

export default () => {
    const router = Router()
    router.get("/", booksController.getAllBooks);
    router.post("/", booksController.createOneBook);
    router.get("/:id", booksController.getOneBook)
    router.put("/:id", booksController.updateOneBook)
    router.delete("/:id", booksController.deleteOneBook)
    router.get("/:id/authors", authorBookController.getAuthorsForBook);
    router.post("/:id/authors", authorBookController.addAuthorToBook);
    router.delete("/:idBook/authors/:idAuthor", authorBookController.deleteAuthorFromBook)
    return router;
}