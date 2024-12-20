import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { setupSocket } from "./socket";
import { db } from "@db";
import { articles, orders, deliveries } from "@db/schema";
import { eq } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  const httpServer = createServer(app);
  setupSocket(httpServer);

  // Articles routes
  app.get("/api/articles", async (req, res) => {
    const allArticles = await db.query.articles.findMany({
      with: {
        supplier: true,
      },
    });
    res.json(allArticles);
  });

  // Orders routes
  app.post("/api/orders", async (req, res) => {
    const { articleId } = req.body;
    if (!req.user) {
      return res.status(401).send("Not authenticated");
    }

    try {
      const article = await db.query.articles.findFirst({
        where: eq(articles.id, articleId),
      });

      if (!article) {
        return res.status(404).send("Article not found");
      }

      const order = await db.insert(orders).values({
        userId: req.user.id,
        status: "pending",
        items: [articleId],
        total: article.price,
      }).returning();

      res.json(order[0]);
    } catch (error) {
      res.status(500).send("Failed to create order");
    }
  });

  app.get("/api/orders", async (req, res) => {
    if (!req.user) {
      return res.status(401).send("Not authenticated");
    }

    const userOrders = await db.query.orders.findMany({
      where: eq(orders.userId, req.user.id),
      with: {
        delivery: true,
      },
    });

    res.json(userOrders);
  });

  return httpServer;
}
