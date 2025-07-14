import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  hashedPassword: text("hashedPassword"),
  createdAt: text("createdAt"),
  updatedAt: text("updatedAt"),
});

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("userId").notNull(),
  expiresAt: text("expiresAt").notNull(),
  createdAt: text("createdAt"),
});
