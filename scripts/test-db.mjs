/**
 * Test Supabase/Postgres connectivity from the terminal.
 * Usage: npm run db:test
 * Reads DATABASE_URL from .env.local, then .env
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import pg from "pg";

const { Pool } = pg;

function loadDatabaseUrl() {
  if (process.env.DATABASE_URL?.trim()) {
    console.log("Using DATABASE_URL from environment");
    return process.env.DATABASE_URL.trim();
  }

  const root = resolve(import.meta.dirname, "..");

  for (const file of [".env.local", ".env"]) {
    const path = resolve(root, file);
    if (!existsSync(path)) continue;

    const content = readFileSync(path, "utf8");
    const match = content.match(/^DATABASE_URL=(.+)$/m);
    if (match?.[1]) {
      const value = match[1].trim().replace(/^["']|["']$/g, "");
      console.log(`Using DATABASE_URL from ${file}`);
      return value;
    }
  }

  return null;
}

function maskUrl(url) {
  try {
    const parsed = new URL(url);
    if (parsed.password) parsed.password = "****";
    return parsed.toString();
  } catch {
    return "(invalid URL)";
  }
}

const databaseUrl = loadDatabaseUrl();

if (!databaseUrl) {
  console.error("❌ DATABASE_URL not found in .env.local, .env, or environment");
  process.exit(1);
}

console.log(`Connection: ${maskUrl(databaseUrl)}\n`);

const usesSupabase = databaseUrl.includes("supabase.co");

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: usesSupabase ? { rejectUnauthorized: false } : undefined,
  connectionTimeoutMillis: 15_000,
});

try {
  const timeResult = await pool.query("SELECT NOW() AS server_time, current_database() AS database");
  const row = timeResult.rows[0];

  console.log("✅ Connected successfully");
  console.log(`   Server time: ${row.server_time}`);
  console.log(`   Database:    ${row.database}`);

  const tableResult = await pool.query(`
    SELECT EXISTS (
      SELECT FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = 'users'
    ) AS users_table_exists
  `);

  const usersExists = tableResult.rows[0]?.users_table_exists;

  if (usersExists) {
    const countResult = await pool.query("SELECT COUNT(*)::int AS count FROM users");
    console.log(`✅ users table exists (${countResult.rows[0].count} row(s))`);
  } else {
    console.log("⚠️  users table missing — run scripts/migrate-users.sql in Supabase SQL Editor");
  }

  if (databaseUrl.includes("db.") && databaseUrl.includes(":5432")) {
    console.log(
      "\nℹ️  Direct connection (port 5432) — fine for local dev.",
    );
    console.log(
      "   For Vercel, use the pooler URL (port 6543) from Supabase → Connection pooling.",
    );
  }

  await pool.end();
  process.exit(0);
} catch (error) {
  console.error("❌ Connection failed\n");

  if (error instanceof Error) {
    console.error(`   ${error.message}`);

    if (error.message.includes("ENOTFOUND")) {
      console.error(
        "\n   Host not found. Common causes:",
      );
      console.error(
        "   • db.*.supabase.co is IPv6-only — many networks cannot reach it.",
      );
      console.error(
        "   • Use the pooler URL from Supabase → Database → Connection pooling (port 6543).",
      );
      console.error(
        "   • Copy the exact host (aws-0 vs aws-1) from your dashboard — they differ per project.",
      );
    }
    if (error.message.includes("password authentication failed")) {
      console.error("\n   Wrong password. URL-encode special chars (? → %3F, @ → %40, # → %23).");
    }
    if (error.message.includes("SSL")) {
      console.error("\n   SSL issue. Supabase requires SSL (this script enables it automatically).");
    }
  } else {
    console.error(error);
  }

  await pool.end().catch(() => {});
  process.exit(1);
}
