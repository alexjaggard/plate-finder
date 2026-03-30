import { Pool } from "pg";

const pool = new Pool({
  user: "alexjaggard",
  host: "localhost",
  database: "plates",
  password: "",
  port: 5432,
});

export default pool;
