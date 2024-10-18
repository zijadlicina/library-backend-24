import dotenv from "dotenv"

const configFound = dotenv.config()

if (configFound.error){
    throw new Error("No .env file found!")
}

export default {
    port: parseInt(process.env.PORT),
    morgan: process.env.MORGAN
}