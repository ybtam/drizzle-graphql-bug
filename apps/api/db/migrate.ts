import {migrate} from "drizzle-orm/postgres-js/migrator";
import {client, db} from "./index";

async function runMigration() {
  await migrate(db, { migrationsFolder: './db/migrations' });
// Don't forget to close the connection, otherwise the script will hang
  await client.end();
}

runMigration();
