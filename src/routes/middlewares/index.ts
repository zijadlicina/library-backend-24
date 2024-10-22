import type { Request, Response, NextFunction } from "express";

export function notFoundMiddleware(req: Request, res: Response, next: NextFunction) {
    res.status(404)
    const error = new Error("Not Found page")
    next(error)
}

export function globalErrorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    if (res.statusCode === 200) res.statusCode = 400;
    const statusCode = res.statusCode || 500
    const statusMessage = error.message;
    res.status(statusCode).json({
        error: {
            message: statusMessage,
            status: statusCode
        }
    })
}