import { Pool } from "pg";

let pool: Pool | null = null;

export function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_CSV_URL,
      ssl: { rejectUnauthorized: false }, // needed for Neon
    });
  }
  return pool;
}
