import pg from "pg"
import dotenv from "dotenv"
dotenv.config()

const { Pool } = pg

const createPool = () => {
    try {
        return new Pool({
            connectionString: process.env.DATABASE_URL,
        });
    } catch (error) {
        console.error("Error creating database pool:", error);
        throw error;
    }
};

export const pool = createPool();
