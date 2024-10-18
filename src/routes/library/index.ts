import { Router, Request, Response } from "express";
import books from "./books";
import authors from "./authors";

export default () => {
    const router = Router()
    router.use("/authors", authors({router}))
    router.use("/books", books({router}))
    return router;
}