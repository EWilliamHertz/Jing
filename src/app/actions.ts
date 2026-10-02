'use server'

import { db } from '@/lib/db'
import { tasks, lists, listItems, notes } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

// --- AUTH ---
export async function setAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set('auth', 'true', { path: '/' })
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('auth')
}

export async function isLoggedIn() {
  const cookieStore = await cookies();
  return cookieStore.get('auth')?.value === 'true';
}

// --- TASKS ---
export async function getTasks() {
  if (!(await isLoggedIn())) {
    return [
      { id: '1', title: "Finish homepage design", priority: "High", time: "10:00 AM", project: "LifeStack Redesign", done: true, tab: "today", createdAt: new Date() },
      { id: '2', title: "Review Q3 budget", priority: "Medium", time: "2:00 PM", project: "Finance", done: false, tab: "today", createdAt: new Date() },
      { id: '3', title: "Call the dentist", priority: "Low", time: "Anytime", project: "Health", done: false, tab: "today", createdAt: new Date() },
      { id: '4', title: "Buy groceries for dinner", priority: "Medium", time: "6:00 PM", project: "Personal", done: false, tab: "today", createdAt: new Date() },
      { id: '5', title: "Renew domain name", priority: "High", time: "Next week", project: "Business", done: false, tab: "upcoming", createdAt: new Date() },
    ];
  }
  return await db.select().from(tasks).orderBy(tasks.createdAt)
}

export async function addTask(data: { title: string, priority: string, time: string, project: string, tab: string }) {
  if (!(await isLoggedIn())) return;
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
  if (!(await isLoggedIn())) return;
  await db.update(tasks).set({ done: !currentStatus }).where(eq(tasks.id, id))
  revalidatePath('/')
}

export async function removeTask(id: string) {
  if (!(await isLoggedIn())) return;
  await db.delete(tasks).where(eq(tasks.id, id))
  revalidatePath('/')
}

// --- LISTS ---
export async function getLists() {
  if (!(await isLoggedIn())) {
    return [
      { id: 'l1', title: "Grocery", items: [{ id: 'i1', name: "Almond milk", done: false }, { id: 'i2', name: "Eggs", done: true }] },
      { id: 'l2', title: "Packing (Stockholm)", items: [{ id: 'i3', name: "Passport", done: false }, { id: 'i4', name: "Camera", done: true }] }
    ];
  }
  const allLists = await db.select().from(lists).orderBy(lists.createdAt)
  const allItems = await db.select().from(listItems).orderBy(listItems.createdAt)
  
  return allLists.map(list => ({
    ...list,
    items: allItems.filter(item => item.listId === list.id)
  }))
}

export async function addList(title: string) {
  if (!(await isLoggedIn())) return;
  await db.insert(lists).values({ title })
  revalidatePath('/')
}

export async function addListItem(listId: string, name: string) {
  if (!(await isLoggedIn())) return;
  await db.insert(listItems).values({ listId, name })
  revalidatePath('/')
}

export async function toggleListItem(id: string, currentStatus: boolean) {
  if (!(await isLoggedIn())) return;
  await db.update(listItems).set({ done: !currentStatus }).where(eq(listItems.id, id))
  revalidatePath('/')
}

// --- NOTES ---
export async function getNotes() {
  if (!(await isLoggedIn())) {
    return [
      { id: 'n1', title: "Meeting with Sarah", content: "Discussed the new design system.", date: "2 days ago" },
      { id: 'n2', title: "Project Requirements", content: "Needs to be fast, responsive, and calm.", date: "1 week ago" }
    ];
  }
  return await db.select().from(notes).orderBy(notes.createdAt)
}

export async function addNote(title: string, content: string) {
  if (!(await isLoggedIn())) return;
  await db.insert(notes).values({ title, content })
  revalidatePath('/')
}
