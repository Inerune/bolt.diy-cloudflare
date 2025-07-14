import type { Config } from "drizzle-kit";
export default {
  schema: "./app/lib/schema.ts",
  dialect: "sqlite",
  driver: "d1-http", // this is correct, ignore TS warning
  dbCredentials: {
    accountId: "d81e42121e1ea49034bde5b63d4abee4",
    databaseId: "cc8d67cc-629b-4b47-8eef-813d0c59db92",
    token: "YYI6zEUDVH825XRskVSja2jqUgPCvzWdkNOn29sN",
  },
  out: "./drizzle/migrations",
} as unknown as Config;