/*
-- Initial migration SQL (run once against your Postgres host):

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- No results table — plagiarism results are never persisted
*/

import { Pool, type PoolClient, type QueryResult, type QueryResultRow } from "pg";
import { env } from "@/config/env";

// This is the ONLY file that touches the database.
// No Supabase client. Swap DATABASE_URL to move to any Postgres host.
//
// Vercel / serverless: use Supabase "Transaction" pooler (port 6543), not direct db.*:5432.
// Example:
// postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres

const isServerless = process.env.VERCEL === "1";
const usesSupabase = env.DATABASE_URL.includes("supabase.co");

const pool = new Pool({
  connectionString: env.DATABASE_URL,
  // Supabase requires SSL; direct connections often fail on Vercel without it.
  ssl: usesSupabase ? { rejectUnauthorized: false } : undefined,
  // Serverless: one connection per function instance to avoid pool exhaustion.
  max: isServerless ? 1 : 10,
  idleTimeoutMillis: isServerless ? 5_000 : 30_000,
  connectionTimeoutMillis: 10_000,
});

pool.on("error", (error: Error) => {
  console.error("Unexpected error on idle database client:", error);
});

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[],
): Promise<QueryResult<T>> {
  return pool.query<T>(text, params);
}

export async function getClient(): Promise<PoolClient> {
  return pool.connect();
}
