import pkg from "pg";
import "dotenv/vonfig";
const { Pool } = pkg;

const pool = new Pool({
  allowExitOnIdle: true,
});

export default pool;
