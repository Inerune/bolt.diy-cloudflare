import { betterAuth } from "better-auth";
import { Pool } from "pg";


export const auth = betterAuth({
    database: new Pool({
        connectionString: "postgresql://neondb_owner:npg_KdDvuOx6FHL2@ep-steep-star-ac419cwz-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
    }),
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