import { pgTable, text, timestamp, boolean, uuid } from 'drizzle-orm/pg-core';

export const tasks = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  priority: text('priority').notNull().default('Medium'), // 'High', 'Medium', 'Low'
  time: text('time').notNull().default('Anytime'),
  project: text('project').notNull().default('Inbox'),
  done: boolean('done').notNull().default(false),
  tab: text('tab').notNull().default('today'), // 'today', 'upcoming'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const lists = pgTable('lists', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const listItems = pgTable('list_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  listId: uuid('list_id').references(() => lists.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(),
  done: boolean('done').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const notes = pgTable('notes', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
