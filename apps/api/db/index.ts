import {drizzle} from "drizzle-orm/node-postgres";
import {Client} from "pg";
import * as userSchema from '@/user'

export const client = new Client({
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME!,
});

client.connect();

export const db = drizzle(client, {
  schema: {
    ...userSchema
  }
});


