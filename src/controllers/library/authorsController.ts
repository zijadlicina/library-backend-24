import type { Request, Response } from "express";

export function getAllAuthors(req: Request, res: Response) {
    
}
export function createOneAuthor(req: Request, res: Response) {
    
}
export function getOneAuthor(req: Request, res: Response) {
    const params = req.params;
    let id = params.id;
    res.json({msg: "get single author: ", id})
}
export function updateOneAuthor(req: Request, res: Response) {
    
}
export function deleteOneAuthor(req: Request, res: Response) {
    
}
export function getBooksFromAuthor(req: Request, res: Response) {

}
export function addBookToAuthor(req: Request, res: Response) {

}
export function deleteBookFromAuthor(req: Request, res: Response) {

}