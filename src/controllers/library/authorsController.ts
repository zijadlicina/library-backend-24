import type { NextFunction, Request, Response } from "express";
import { createOne, getAll } from "../../db/library/authors";

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
export function getOneAuthor(req: Request, res: Response, next: NextFunction) {
    const params = req.params;
    let id = params.id;
    res.json({msg: "get single author: ", id})
}
export function updateOneAuthor(req: Request, res: Response, next: NextFunction) {
    
}
export function deleteOneAuthor(req: Request, res: Response, next: NextFunction) {
    
}
export function getBooksFromAuthor(req: Request, res: Response, next: NextFunction) {

}
export function addBookToAuthor(req: Request, res: Response, next: NextFunction) {

}
export function deleteBookFromAuthor(req: Request, res: Response, next: NextFunction) {

}