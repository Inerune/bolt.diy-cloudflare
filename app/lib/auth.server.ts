// app/lib/auth.server.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { initializeDB } from "./database";
import { authSchema } from "./schema";
import type { Env } from '../types/env';

export function createAuth(env: Env) {
  const db = initializeDB(env);
  
  return betterAuth({
    database: drizzleAdapter(db, {
      schema: authSchema,
      provider: "sqlite",
    }),
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      },
    },
  });
}