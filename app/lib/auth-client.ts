// app/lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL, // 💡 this is correct for Remix route setup
});

export const { signIn, signUp, useSession } = authClient;