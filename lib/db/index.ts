import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

type DB = PostgresJsDatabase<typeof schema>;

let _db: DB | null = null;

function getDb(): DB {
  if (_db) return _db;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set. Configure it in .env.local before using the database.");
  }

  const client = postgres(connectionString, {
    prepare: false,
    max: 10,
  });

  _db = drizzle(client, { schema });
  return _db;
}

/**
 * Proxy that lazily initializes the DB on first property access.
 * Lets the module be imported at build time without DATABASE_URL.
 */
export const db = new Proxy({} as DB, {
  get(_target, prop, receiver) {
    return Reflect.get(getDb(), prop, receiver);
  },
});

export * from "./schema";
