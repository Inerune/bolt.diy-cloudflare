import { Kysely } from 'kysely';
import { D1Dialect } from 'kysely-d1';
import type { DB } from '@/types/db';

export function getDatabase(env: { DB: D1Database }) {
  const dialect = new D1Dialect({ database: env.DB });
  return new Kysely<DB>({ dialect });
}
