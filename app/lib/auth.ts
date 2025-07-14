import { betterAuth } from "better-auth";
import { drizzle } from "drizzle-orm/d1";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "./schema";

type Env = {
  DB: D1Database;
  SESSIONS_KV: KVNamespace;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
};

export const auth = (env: Env) =>
  betterAuth({
    adapter: {
      db: drizzle(env.DB, { schema }) as DrizzleD1Database<Record<string, unknown>>,
      kv: env.SESSIONS_KV,
    },
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
      },
    },
  });
