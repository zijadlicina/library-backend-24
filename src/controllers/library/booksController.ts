import type { NextFunction, Request, Response } from "express";
import { createOne, getAll, getOne, updateOne, removeOne } from "../../db/library/books";

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
        let newBook = req.body
        const results = await createOne(newBook)
        res.json(results) 
    } catch (error) {
        next(error)
    }
}
export async function getOneBook(req: Request, res: Response, next: NextFunction) {
    try {
        const params = req.params;
        let idBook: string = params.id;
        const results = await getOne(idBook)
        res.json(results) 
    } catch (error) {
        next(error)
    }
}
export async function updateOneBook(req: Request, res: Response, next: NextFunction) {
    try {
        const params = req.params;
        let idBook: string = params.id;
        let updateBook = req.body
        const results = await updateOne(idBook, updateBook)
        res.json(results) 
    } catch (error) {
        next(error)
    }
}
export async function deleteOneBook(req: Request, res: Response, next: NextFunction) {
    try {
        const params = req.params;
        let idBook: string = params.id;
        const results = await removeOne(idBook)
        res.json(results) 
    } catch (error) {
        next(error)
    }
}
export function getAuthorsFromBook(req: Request, res: Response, next: NextFunction) {

}
export function addAuthorToBook(req: Request, res: Response, next: NextFunction) {

}
export function deleteAuthorFromBook(req: Request, res: Response, next: NextFunction) {

}