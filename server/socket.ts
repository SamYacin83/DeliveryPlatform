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
          io.emit(`delivery_updated_${delivery.orderId}`, delivery);
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
