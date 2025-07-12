import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

let client: MongoClient;
let db: Awaited<ReturnType<MongoClient["db"]>>;

async function connectToMongo() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URL as string);
    await client.connect();
    db = client.db(); // optional: pass your DB name as arg
  }
  return db;
}

export const auth = betterAuth({
  sessionSecret: process.env.SESSION_SECRET!,
  database: mongodbAdapter(await connectToMongo()),
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