import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  decimal,
  jsonb,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
  email: text("email").unique().notNull(),
  role: text("role", { enum: ["client", "delivery", "supplier"] }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  supplierId: integer("supplier_id")
    .references(() => users.id)
    .notNull(),
  stock: integer("stock").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  status: text("status", {
    enum: ["pending", "accepted", "in_delivery", "delivered"],
  }).notNull(),
  items: jsonb("items").notNull().$type<number[]>(),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const deliveries = pgTable("deliveries", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .references(() => orders.id)
    .notNull(),
  deliveryUserId: integer("delivery_user_id")
    .references(() => users.id)
    .notNull(),
  location: jsonb("location").$type<{ lat: number; lng: number }>(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  articles: many(articles),
  orders: many(orders),
  deliveries: many(deliveries),
}));

export const articlesRelations = relations(articles, ({ one }) => ({
  supplier: one(users, {
    fields: [articles.supplierId],
    references: [users.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  delivery: many(deliveries),
}));

export const deliveriesRelations = relations(deliveries, ({ one }) => ({
  order: one(orders, {
    fields: [deliveries.orderId],
    references: [orders.id],
  }),
  deliveryUser: one(users, {
    fields: [deliveries.deliveryUserId],
    references: [users.id],
  }),
}));

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Article = typeof articles.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type Delivery = typeof deliveries.$inferSelect;
