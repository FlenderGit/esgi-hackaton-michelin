import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.url(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  FIRESTORE_API_KEY: z.string().default("no-key"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    "❌ Variables d'environnement invalides :",
    parsed.error.flatten().fieldErrors,
  );
  throw new Error("Variables d'environnement manquantes ou invalides");
}

export const env = parsed.data;
