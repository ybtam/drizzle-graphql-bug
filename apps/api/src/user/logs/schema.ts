import {pgTable, serial, text} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import {columns, users} from "@/user";

export const userLogs = pgTable('user_logs', {
  id: serial('id').primaryKey(),
  log: text('log').notNull(),
  userId: serial('user_id').notNull(),
})

export const userLogsRelations = relations(userLogs, ({one}) => ({
  user: one(users, { fields: [userLogs.userId], references: [users.id]}),
}));
