import type {Config} from "drizzle-kit";

export default {
  driver: "pg",
  out: './db/migrations',
  schema: [
    './src/**/schema.ts',
  ],
  dbCredentials: {
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME!,
  },
  verbose: true,
  strict: true,
} satisfies Config;
