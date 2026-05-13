// src/db/schema.ts
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  phoneNumber: text('phone_number').notNull(),
  dateOfBirth: text('date_of_birth').notNull(), // SQLite stores dates best as ISO text strings
  city: text('city'), // Optional by default if .notNull() is omitted
  zipcode: text('zipcode'), // Optional
});

export const contacts = sqliteTable('contacts', {
  id:        integer('id').primaryKey({ autoIncrement: true }),
  name:      text('name').notNull(),
  email:     text('email').notNull(),
  message:   text('message').notNull(),
  createdAt: text('created_at').$defaultFn(() => new Date().toISOString()),
});

export type InsertContact = typeof contacts.$inferInsert;
export type SelectContact = typeof contacts.$inferSelect;
