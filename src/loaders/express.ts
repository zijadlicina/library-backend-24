import express  from "express";
import cors from "cors"
import helmet from "helmet";
import type { Express } from "express";

export default async ({app}: {app: Express}) => {
    app.use(cors())
    app.use(helmet())
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
}