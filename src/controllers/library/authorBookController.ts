import type { NextFunction, Request, Response } from "express";
import { fetchAuthorsForBook,  fetchBooksForAuthor, createBookAttachToAuthor, createAuthorAttachToBook, removeAuthorFromBook } from "../../db/library/authorBook";
import { authorService, bookService, isEmptyObject } from "../../services"

export async function getAuthorsForBook(req: Request, res: Response, next: NextFunction) {
    try {
        let responseMessage = {}
        const idBook = req.params.id;
        const results = await fetchAuthorsForBook(idBook)
        if (!results) {
            res.statusCode = 404;
            responseMessage = {message: "Not found book"}
        } else if (results.length === 0) responseMessage = {message: "This book don't have author"}
        else responseMessage = results
        res.json(responseMessage) 
    } catch (error) {
        next(error)
    }
}
export async function addAuthorToBook(req: Request, res: Response, next: NextFunction) {
    try {
        let responseMessage = {}
        if (!req.body || isEmptyObject(req.body)) {
            const error = new Error("Request body is missing or empty")
            res.statusCode = 400;
            next(error)
        } else {
            const newAuthor = req.body;
            if (newAuthor.firstName && newAuthor.lastName) {
                newAuthor.guid = authorService.generateRandomID(8)
                const idBook = req.params.id;
                const results = await createAuthorAttachToBook(newAuthor, idBook)
                if (!results) {
                    res.statusCode = 404
                    responseMessage = {message: "Not found book"}
                } 
                else responseMessage = results
            } 
            else {
                res.statusCode = 400
                responseMessage = {message: "In request body is missing fields: firstName or lastName"}
            }
            res.json(responseMessage) 
        }
    } catch (error) {
        next(error)
    }
}
export async function getBooksForAuthor(req: Request, res: Response, next: NextFunction) {
    try {
        let responseMessage = {}
        const idAuthor = req.params.id;
        const results = await fetchBooksForAuthor(idAuthor)
        if (!results) {
            res.statusCode = 404;
            responseMessage = {message: "Not found author"}
        } else if (results.length === 0) responseMessage = {message: "This author don't have books"}
        else responseMessage = results
        res.json(responseMessage) 
    } catch (error) {
        next(error)
    }
}
export async function addBookToAuthor(req: Request, res: Response, next: NextFunction) {
    try {
        let responseMessage = {}
        if (!req.body || isEmptyObject(req.body)) {
            const error = new Error("Request body is missing or empty")
            res.statusCode = 400;
            next(error)
        } else {
            const newBook = req.body;
            if (newBook.title && newBook.pages) {
                newBook.isbn = bookService.generateRandomISBN13()
                const idAuthor = req.params.id;
                const results = await createBookAttachToAuthor(newBook, idAuthor)
                if (!results) {
                    res.statusCode = 404
                    responseMessage = {message: "Not found author"}
                } 
                else responseMessage = results
            } 
            else {
                res.statusCode = 400
                responseMessage = {message: "In request body is missing fields: title or pages"}
            }
            res.json(responseMessage) 
        }
    } catch (error) {
        next(error)
    }
}
export async function deleteAuthorFromBook(req: Request, res: Response, next: NextFunction) {
    try {
        let responseMessage = {}
        const idAuthor = req.params.idAuthor;
        const idBook = req.params.idBook;
        const results = await removeAuthorFromBook(idAuthor, idBook)
        if (!results) {
            res.statusCode = 404
            responseMessage = {message: "Not found book or author"}
        } else if (results.affectedRows === 0) responseMessage = {message: "This book and author are not related"}
        else responseMessage = results;
        res.json(responseMessage) 
    } catch (error) {
        next(error)
    }
}