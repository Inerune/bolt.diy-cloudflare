import { createAuth } from "~/lib/auth.server";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/cloudflare";
import type { Env } from '../types/env';

export async function loader({ request, context }: LoaderFunctionArgs) {
  const env = context.env as Env;

  if (!env?.DB) {
    return new Response("Missing env variables", { status: 500 });
  }

  const auth = createAuth(env);
  return auth.handler(request);
}

export async function action({ request, context }: ActionFunctionArgs) {
  const env = context.env as Env;

  if (!env?.DB) {
    return new Response("Missing env variables", { status: 500 });
  }

  const auth = createAuth(env);
  return auth.handler(request);
}
