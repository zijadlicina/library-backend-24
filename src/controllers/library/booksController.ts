import type { NextFunction, Request, Response } from "express";
import { createOne, getAll, getOne, updateOne, removeOne} from "../../db/library/books";
import { bookService, isEmptyObject } from "../../services"

export async function getAllBooks(req: Request, res: Response, next: NextFunction) {
    try {
        const results = await getAll()
        res.json(results) 
    } catch (error) {
        next(error)
    }
}
export async function createOneBook(req: Request, res: Response, next: NextFunction) {
    try {
        let resMessage = {}
        if (!req.body || isEmptyObject(req.body)) {
            const error = new Error("Request body is missing or empty")
            res.statusCode = 400;
            next(error)
        } else {
            let newBook = req.body
            if (newBook.title && newBook.pages) {
                newBook.isbn = bookService.generateRandomISBN13()
                const results = await createOne(newBook)
                res.statusCode = 201
                resMessage = {results}
            } 
            else {
                res.statusCode = 400
                resMessage = {message: "In request body is missing fields: title or pages"}
            }
            res.json(resMessage)
        }
    } catch (error) {
        next(error)
    }
}
export async function getOneBook(req: Request, res: Response, next: NextFunction) {
    try {
        let resMessage = {}
        const params = req.params;
        let idBook: string = params.id;
        const results = await getOne(idBook)
        if (results.length === 0) {
            res.statusCode = 404;
            resMessage = {message: "Item not found"}
        } else resMessage = results
        res.json(resMessage) 
    } catch (error) {
        next(error)
    }
}
export async function updateOneBook(req: Request, res: Response, next: NextFunction) {
    try {
        let resMessage = {}
        let idBook: string = req.params.id;
        if (!req.body || isEmptyObject(req.body)) {
            const error = new Error("Request body is missing or empty")
            res.statusCode = 400;
            next(error)
        } else {
            let updateBook = req.body
            const results = await updateOne(idBook, updateBook)
            if (results.status === 400) {
                res.statusCode = 400;
                resMessage = {message: results.message}
            }
            if (results.affectedRows === 0) {
                res.statusCode = 404;
                resMessage = {message: "Item not found"}
            }
            else resMessage = results;
            res.json(resMessage) 
        }
    } catch (error) {
        next(error)
    }
}
export async function deleteOneBook(req: Request, res: Response, next: NextFunction) {
    try {
        let resMessage = {}
        let idBook: string = req.params.id;
        const results = await removeOne(idBook)
        if (results.affectedRows === 0) {
            res.statusCode = 404;
            resMessage = {message: "Item not found"}
        } else resMessage = results;
        res.json(resMessage) 
    } catch (error) {
        next(error)
    }
}
