import type { NextFunction, Request, Response } from "express";
import { createOne, getAll, getOne, updateOne, removeOne } from "../../db/library/authors";
import { authorService, isEmptyObject } from "../../services"

export async function getAllAuthors(req: Request, res: Response, next: NextFunction) {
    try {
        const results = await getAll()
        res.json(results) 
    } catch (error) {
        next(error)
    }
}
export async function createOneAuthor(req: Request, res: Response, next: NextFunction): Promise<void> {
    try{
        let resMessage = {}
        if (!req.body || isEmptyObject(req.body)) {
            const error = new Error("Request body is missing or empty")
            res.statusCode = 400;
            next(error)
        } else{
            let newAuthor = req.body
            if (newAuthor.firstName && newAuthor.lastName){
                newAuthor.id = authorService.generateRandomID(8)
                const results = await createOne(newAuthor)
                res.statusCode = 201
                resMessage = {results}
            }  
            else {
                res.statusCode = 400
                resMessage = {message: "In request body is missing fields: firstName or lastName"}
            }
            res.json(resMessage)
        }
    } catch (error) {
        next(error)
    }
}
export async function getOneAuthor(req: Request, res: Response, next: NextFunction) : Promise<void> {
    try {
        let resMessage = {}
        const params = req.params;
        let idAuthor: string = params.id;
        const results = await getOne(idAuthor)
        if (results.length === 0) {
            res.statusCode = 404;
            resMessage = {message: "Item not found"}
        } else resMessage = results
        res.json(resMessage) 
    } catch (error) {
        next(error)
    }
}
export async function updateOneAuthor(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        let resMessage = {}
        let idAuthor: string = req.params.id;
        if (!req.body || isEmptyObject(req.body)) {
            const error = new Error("Request body is missing or empty")
            res.statusCode = 400;
            next(error)
        } else{
            let updateAuthor = req.body
            const results = await updateOne(idAuthor, updateAuthor)
            if (results.status === 400) {
                res.statusCode = 400;
                resMessage = {message: results.message}
            }
            if (results.affectedRows === 0) {
                res.statusCode = 404;
                resMessage = {message: "Item not found"}
            }
            else resMessage = results;
            res.json(results) 
        }
    } catch (error) {
        next(error)
    }
}
export async function deleteOneAuthor(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        let resMessage = {}
        const params = req.params;
        let idAuthor: string = params.id;
        const results = await removeOne(idAuthor)
        if (results.affectedRows === 0) {
            res.statusCode = 404;
            resMessage = {message: "Item not found"}
        } else resMessage = results;
        res.json(resMessage) 
    } catch (error) {
        next(error)
    }
}
