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
