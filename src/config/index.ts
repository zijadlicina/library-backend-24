import dotenv from "dotenv"

const configFound = dotenv.config()

if (configFound.error){
    throw new Error("No .env file found!")
}

export default {
    port: parseInt(process.env.PORT),
    morgan: process.env.MORGAN,
    mysql: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_SCHEMA,
    }
}