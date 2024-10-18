import express  from "express";
import cors from "cors"
import helmet from "helmet";
import morgan from "morgan";
import config from "../config";
import indexRouter from "../routes"
import type { Express, Request, Response } from "express";
import {notFoundMiddleware, globalErrorHandler} from "../routes/middlewares";

export default async ({app}: {app: Express}) => {
    app.get("/status", (req: Request, res: Response) => {
        res.sendStatus(200).end();
    })

    app.use(cors())
    app.use(helmet())
    app.use(morgan(config.morgan))
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))

    app.use("/dev", indexRouter())

    // middlewares
    app.use(notFoundMiddleware)
    app.use(globalErrorHandler)
}