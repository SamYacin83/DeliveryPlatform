import { Server } from "http";
import { Server as SocketServer } from "socket.io";
import { db } from "@db";
import { deliveries } from "@db/schema";
import { eq } from "drizzle-orm";

export function setupSocket(server: Server) {
  const io = new SocketServer(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("update_delivery_location", async (data: {
      deliveryId: number;
      location: { lat: number; lng: number };
    }) => {
      try {
        const [delivery] = await db
          .update(deliveries)
          .set({ location: data.location })
          .where(eq(deliveries.id, data.deliveryId))
          .returning();

        if (delivery) {
          // First fetch the order to get the user ID
          const order = await db.query.orders.findFirst({
            where: eq(orders.id, delivery.orderId),
          });

          if (order) {
            // Emit to specific user
            io.emit(`delivery_updated_${order.userId}`, {
              orderId: delivery.orderId,
              status: order.status,
              location: delivery.location,
            });
          }
        }
      } catch (error) {
        console.error("Failed to update delivery location:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  return io;
}
