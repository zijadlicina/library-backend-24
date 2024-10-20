import type { Express } from "express"
import expressLoader from "./express"
import mysqlLoader from "./mysql"

export default async ({app}: {app: Express}) => {
    await expressLoader({app});
    console.log("express loaded")

    await mysqlLoader();
    console.log("mysql loaded")
}