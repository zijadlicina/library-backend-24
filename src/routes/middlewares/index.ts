import type { Request, Response, NextFunction } from "express";

export function notFoundMiddleware(req: Request, res: Response, next: NextFunction) {
    res.status(404)
    const error = new Error("Not Found page!")
    next(error)
}

export function globalErrorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    const statusCode = res.statusCode || 500
    const statusMessage = res.statusMessage;
    res.status(statusCode).json({
        error: {
            message: statusMessage,
            status: statusCode
        }
    })
}