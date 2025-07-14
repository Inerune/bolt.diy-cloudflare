import { auth } from "~/lib/auth";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/cloudflare";

type Env = {
  DB: D1Database;
};

export async function loader({ request, context }: LoaderFunctionArgs) {
  return auth(context.env as Env).handler(request); // ✅ use `.handler()`, NOT `.handleRequest()`
}

export async function action({ request, context }: ActionFunctionArgs) {
  return auth(context.env as Env).handler(request); // ✅ same here
}
