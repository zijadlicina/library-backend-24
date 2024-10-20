import { createPool, Pool } from "mysql2";
import config from "../config";

const state: {pool: Pool} = {
    pool: null
}

export function get() {
    return state.pool;
}

export default async () => {
    try {
        state.pool = createPool(config.mysql)
        state.pool.getConnection((err, connection) => {
            if (err) {
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Connection to the database was lost.');
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Too many connections to the database.');
                }
                if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.');
                }
                return;
            }
            if (connection) connection.release();  // Vraćanje veze u pool
            console.log('Database connected successfully!');
        });
    } catch (error) {
        console.log("err", error)
    }
};