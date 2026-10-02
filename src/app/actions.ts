'use server'

import { db } from '@/lib/db'
import { tasks, lists, listItems, notes } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

// --- TASKS ---
export async function getTasks() {
  return await db.select().from(tasks).orderBy(tasks.createdAt)
}

export async function addTask(data: { title: string, priority: string, time: string, project: string, tab: string }) {
  await db.insert(tasks).values({
    title: data.title,
    priority: data.priority,
    time: data.time,
    project: data.project,
    tab: data.tab
  })
  revalidatePath('/')
}

export async function toggleTask(id: string, currentStatus: boolean) {
  await db.update(tasks).set({ done: !currentStatus }).where(eq(tasks.id, id))
  revalidatePath('/')
}

export async function removeTask(id: string) {
  await db.delete(tasks).where(eq(tasks.id, id))
  revalidatePath('/')
}

// --- LISTS ---
export async function getLists() {
  const allLists = await db.select().from(lists).orderBy(lists.createdAt)
  const allItems = await db.select().from(listItems).orderBy(listItems.createdAt)
  
  return allLists.map(list => ({
    ...list,
    items: allItems.filter(item => item.listId === list.id)
  }))
}

export async function addList(title: string) {
  await db.insert(lists).values({ title })
  revalidatePath('/')
}

export async function addListItem(listId: string, name: string) {
  await db.insert(listItems).values({ listId, name })
  revalidatePath('/')
}

export async function toggleListItem(id: string, currentStatus: boolean) {
  await db.update(listItems).set({ done: !currentStatus }).where(eq(listItems.id, id))
  revalidatePath('/')
}

// --- NOTES ---
export async function getNotes() {
  return await db.select().from(notes).orderBy(notes.createdAt)
}

export async function addNote(title: string, content: string) {
  await db.insert(notes).values({ title, content })
  revalidatePath('/')
}
