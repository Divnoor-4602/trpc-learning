import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: "durable-sqlite",
  dialect: "sqlite",
  db: "./sqlite.db",
} as Config;
