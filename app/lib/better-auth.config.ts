import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

const fakeD1 = {} as D1Database; // ✅ prevent "DB is not defined"

export const auth = betterAuth({
  database: drizzleAdapter(drizzle(fakeD1, { schema }), {
    provider: "sqlite",
  }),
});