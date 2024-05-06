import {integer, pgTable, serial, text} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull()
})

export const tableRelations = relations(users, ({many}) =>({
  columns: many(columns),
}))

export const columns = pgTable('columns', {
  id: serial('id').primaryKey(),
  tableId: integer('user_id').references(() => users.id),
  order: integer('order').notNull(),
  name: text('name').notNull()
})

export const columnRelations = relations(columns, ({one}) =>({
  user: one(users, { fields: [columns.tableId], references: [users.id]})
}))
