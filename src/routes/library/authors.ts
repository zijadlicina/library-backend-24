import type { Router, Request, Response } from "express";

export default ({router}: {router: Router}) => {
    router.get("/", (req: Request, res: Response) => {
        res.json({results: "some results"})
    })
    return router;
}