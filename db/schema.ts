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
  firstName: text("first_name").notNull().default(""),
  lastName: text("last_name").notNull().default(""),
  email: text("email").unique().notNull(),
  phone: text("phone").notNull().default(""),
  role: text("role", { enum: ["client", "delivery", "supplier"] }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const addresses = pgTable("addresses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  street: text("street").notNull(),
  city: text("city").notNull(),
  postalCode: text("postal_code").notNull(),
  country: text("country").notNull(),
  isDefault: boolean("is_default").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const driverDocuments = pgTable("driver_documents", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  type: text("type", { 
    enum: ["identity_card", "drivers_license", "vehicle_registration", "insurance"] 
  }).notNull(),
  documentUrl: text("document_url").notNull(),
  status: text("status", { 
    enum: ["pending", "approved", "rejected"] 
  }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
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
  addresses: many(addresses),
  driverDocuments: many(driverDocuments),
}));

export const addressesRelations = relations(addresses, ({ one }) => ({
  user: one(users, {
    fields: [addresses.userId],
    references: [users.id],
  }),
}));

export const driverDocumentsRelations = relations(driverDocuments, ({ one }) => ({
  user: one(users, {
    fields: [driverDocuments.userId],
    references: [users.id],
  }),
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
