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
    },
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
    },
  });
