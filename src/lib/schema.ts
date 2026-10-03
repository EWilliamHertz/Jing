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

export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const goals = pgTable('goals', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  progress: text('progress'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const travel = pgTable('travel', {
  id: uuid('id').primaryKey().defaultRandom(),
  destination: text('destination').notNull(),
  date: text('date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const money = pgTable('money', {
  id: uuid('id').primaryKey().defaultRandom(),
  amount: text('amount').notNull(),
  description: text('description').notNull(),
  type: text('type').default('expense'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const reading = pgTable('reading', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  author: text('author'),
  status: text('status').default('unread'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const calendar = pgTable('calendar', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  date: timestamp('date').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const social = pgTable('social', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  platform: text('platform'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const habits = pgTable('habits', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  streak: text('streak'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const ideas = pgTable('ideas', {
  id: uuid('id').primaryKey().defaultRandom(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const goalTasks = pgTable('goal_tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  goalId: uuid('goal_id').references(() => goals.id, { onDelete: 'cascade' }).notNull(),
  title: text('title').notNull(),
  done: boolean('done').notNull().default(false),
  progress: text('progress'), // User can write a number like "1", "20/100", etc.
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
