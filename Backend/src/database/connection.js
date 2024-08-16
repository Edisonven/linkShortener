import pkg from "pg";
import "dotenv/config";
const { Pool } = pkg;

const pool = new Pool({
  allowExitOnIdle: true,
});

export default pool;
