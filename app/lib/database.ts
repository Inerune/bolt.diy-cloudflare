// app/lib/database.ts
import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';
import type { Env } from '../types/env';



export function initializeDB(env: Env) {
  if (!env.DB) {
    throw new Error("DB binding is missing from environment");
  }
  return drizzle(env.DB, { schema });
}

export type DB = ReturnType<typeof initializeDB>;