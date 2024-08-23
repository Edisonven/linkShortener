import pkg from "pg";
import "dotenv/config";
const { Pool } = pkg;

const pool = new Pool({
  //  connectionString: process.env.DATABASE_URL,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DB,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  allowExitOnIdle: true,
});

export default pool;
