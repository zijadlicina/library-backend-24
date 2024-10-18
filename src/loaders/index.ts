import type { Express } from "express"
import expressLoader from "./express"

export default async ({app}: {app: Express}) => {
    await expressLoader({app});
    console.log("express loaded")
}