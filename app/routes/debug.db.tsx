import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "~/lib/schema";

export async function loader({ context }: LoaderFunctionArgs) {
  const db = drizzle(context.env.DB, { schema });

  try {
    const result = await db.select().from(schema.users).limit(1); // Adjust table if needed
    return json({ success: true, result });
  } catch (err: any) {
    return json({ success: false, error: err.message });
  }
}