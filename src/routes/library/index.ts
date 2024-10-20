import { Router, Request, Response } from "express";
import books from "./books";
import authors from "./authors";

export default ({router}: {router: Router}) => {
    router.use("/authors", authors())
    router.use("/books", books())
    return router;
}