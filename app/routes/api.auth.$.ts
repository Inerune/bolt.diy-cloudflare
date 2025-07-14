import { auth } from "~/lib/auth";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/cloudflare";

type Env = {
  DB: D1Database;
  SESSIONS_KV: KVNamespace;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
};

export async function loader({ request, context }: LoaderFunctionArgs) {
  return auth(context.env as Env).handler(request); // ✅ use `.handler()`, NOT `.handleRequest()`
}

export async function action({ request, context }: ActionFunctionArgs) {
  return auth(context.env as Env).handler(request); // ✅ same here
}
