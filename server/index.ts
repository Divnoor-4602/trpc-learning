import { publicProcedure, router } from "./trpc";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { todos } from "@/db/schema";
import Database from "better-sqlite3";
import { z } from "zod";

const sqlite = new Database("./sqlite.db");
const db = drizzle(sqlite);

// Run migrations when needed, not at import time
// migrate(db, { migrationsFolder: "./drizzle" });

export const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    return await db.select().from(todos).all();
  }),
  createTodo: publicProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ input }) => {
      await db
        .insert(todos)
        .values({ content: input.content, completed: false })
        .run();
      return { success: true };
    }),
});

export type AppRouter = typeof appRouter;
