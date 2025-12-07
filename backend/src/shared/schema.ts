import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, date, numeric, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  transactionId: varchar("transaction_id", { length: 50 }).notNull(),
  date: date("date").notNull(),
  customerId: varchar("customer_id", { length: 50 }).notNull(),
  customerName: varchar("customer_name", { length: 100 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 20 }),
  gender: varchar("gender", { length: 20 }),
  age: integer("age"),
  productCategory: varchar("product_category", { length: 100 }),
  quantity: integer("quantity").notNull().default(1),
  totalAmount: numeric("total_amount", { precision: 12, scale: 2 }).notNull(),
  customerRegion: varchar("customer_region", { length: 50 }),
  productId: varchar("product_id", { length: 50 }),
  employeeName: varchar("employee_name", { length: 100 }),
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
});

export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;
