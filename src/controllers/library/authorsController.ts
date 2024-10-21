import type { NextFunction, Request, Response } from "express";
import { createOne, getAll, getOne, updateOne, removeOne } from "../../db/library/authors";

export async function getAllAuthors(req: Request, res: Response, next: NextFunction) {
    try {
        const results = await getAll()
        res.json(results) 
    } catch (error) {
        next(error)
    }
}
export async function createOneAuthor(req: Request, res: Response, next: NextFunction) {
    try {
        let newAuthor = req.body
        const results = await createOne(newAuthor)
        res.json(results) 
    } catch (error) {
        next(error)
    }
}
export async function getOneAuthor(req: Request, res: Response, next: NextFunction) {
    try {
        const params = req.params;
        let idAuthor: string = params.id;
        const results = await getOne(idAuthor)
        res.json(results) 
    } catch (error) {
        next(error)
    }
}
export async function updateOneAuthor(req: Request, res: Response, next: NextFunction) {
    try {
        const params = req.params;
        let idAuthor: string = params.id;
        let updateAuthor = req.body
        const results = await updateOne(idAuthor, updateAuthor)
        res.json(results) 
    } catch (error) {
        next(error)
    }
}
export async function deleteOneAuthor(req: Request, res: Response, next: NextFunction) {
    try {
        const params = req.params;
        let idAuthor: string = params.id;
        const results = await removeOne(idAuthor)
        res.json(results) 
    } catch (error) {
        next(error)
    }
}
export function getBooksFromAuthor(req: Request, res: Response, next: NextFunction) {

}
export function addBookToAuthor(req: Request, res: Response, next: NextFunction) {

}
export function deleteBookFromAuthor(req: Request, res: Response, next: NextFunction) {

}