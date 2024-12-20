import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { db } from "../db";
import { users } from "../db/schema";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function createDefaultUsers() {
  try {
    const defaultUsers = [
      {
        username: "client1",
        password: "client123",
        email: "client1@example.com",
        role: "client" as const
      },
      {
        username: "delivery1",
        password: "delivery123",
        email: "delivery1@example.com",
        role: "delivery" as const
      },
      {
        username: "supplier1",
        password: "supplier123",
        email: "supplier1@example.com",
        role: "supplier" as const
      }
    ];

    for (const user of defaultUsers) {
      const hashedPassword = await hashPassword(user.password);
      await db.insert(users).values({
        username: user.username,
        password: hashedPassword,
        email: user.email,
        role: user.role
      });
      console.log(`Created user: ${user.username}`);
    }
    
    console.log('All default users created successfully');
  } catch (error) {
    console.error('Error creating default users:', error);
    throw error;
  }
}

createDefaultUsers().catch(console.error);
