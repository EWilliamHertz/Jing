'use server'

import { db } from '@/lib/db'
import { tasks, lists, listItems, notes, projects, goals, goalTasks, travel, money, reading, calendar, social, habits, ideas } from '@/lib/schema'
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
  revalidatePath('/', 'layout')
}

export async function toggleTask(id: string, currentStatus: boolean) {
    await db.update(tasks).set({ done: !currentStatus }).where(eq(tasks.id, id))
  revalidatePath('/', 'layout')
}

export async function removeTask(id: string) {
    await db.delete(tasks).where(eq(tasks.id, id))
  revalidatePath('/', 'layout')
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
  revalidatePath('/', 'layout')
}

export async function addListItem(listId: string, name: string) {
    await db.insert(listItems).values({ listId, name })
  revalidatePath('/', 'layout')
}

export async function toggleListItem(id: string, currentStatus: boolean) {
    await db.update(listItems).set({ done: !currentStatus }).where(eq(listItems.id, id))
  revalidatePath('/', 'layout')
}

// --- NOTES ---
export async function getNotes() {
    return await db.select().from(notes).orderBy(notes.createdAt)
}

export async function addNote(title: string, content: string) {
    await db.insert(notes).values({ title, content })
  revalidatePath('/', 'layout')
}


// --- PROJECTS ---
export async function getProjects() {
    return await db.select().from(projects).orderBy(projects.createdAt)
}

export async function addProject(title: string, description?: string) {
    await db.insert(projects).values({ title, description })
  revalidatePath('/', 'layout')
}

// --- GOALS ---
export async function getGoals() {
    const allGoals = await db.select().from(goals).orderBy(goals.createdAt)
    const allGoalTasks = await db.select().from(goalTasks).orderBy(goalTasks.createdAt)
    
    return allGoals.map(g => ({
        ...g,
        tasks: allGoalTasks.filter(gt => gt.goalId === g.id)
    }))
}

export async function addGoal(title: string, progress?: string) {
    await db.insert(goals).values({ title, progress })
  revalidatePath('/', 'layout')
}

// --- TRAVEL ---
export async function getTravels() {
    return await db.select().from(travel).orderBy(travel.createdAt)
}

export async function addTravel(destination: string, date?: string) {
    await db.insert(travel).values({ destination, date })
  revalidatePath('/', 'layout')
}

// --- MONEY ---
export async function getMoney() {
    return await db.select().from(money).orderBy(money.createdAt)
}

export async function addMoney(amount: string, description: string, type?: string) {
    await db.insert(money).values({ amount, description, type: type || 'expense' })
  revalidatePath('/', 'layout')
}

// --- READING ---
export async function getReadings() {
    return await db.select().from(reading).orderBy(reading.createdAt)
}

export async function addReading(title: string, author?: string, status?: string) {
    await db.insert(reading).values({ title, author, status: status || 'unread' })
  revalidatePath('/', 'layout')
}

// --- CALENDAR ---
export async function getCalendarEvents() {
    return await db.select().from(calendar).orderBy(calendar.createdAt)
}

export async function addCalendarEvent(title: string, date: Date) {
    await db.insert(calendar).values({ title, date })
  revalidatePath('/', 'layout')
}

// --- SOCIAL ---
export async function getSocials() {
    return await db.select().from(social).orderBy(social.createdAt)
}

export async function addSocial(name: string, platform?: string) {
    await db.insert(social).values({ name, platform })
  revalidatePath('/', 'layout')
}

// --- HABITS ---
export async function getHabits() {
    return await db.select().from(habits).orderBy(habits.createdAt)
}

export async function addHabit(title: string, streak?: string) {
    await db.insert(habits).values({ title, streak })
  revalidatePath('/', 'layout')
}

// --- IDEAS ---
export async function getIdeas() {
    return await db.select().from(ideas).orderBy(ideas.createdAt)
}

export async function addIdea(content: string) {
    await db.insert(ideas).values({ content })
  revalidatePath('/', 'layout')
}

// --- GOAL TASKS ---
export async function addGoalTask(goalId: string, title: string, progress?: string) {
  await db.insert(goalTasks).values({ goalId, title, progress })
  revalidatePath('/', 'layout')
}

export async function toggleGoalTask(id: string, currentStatus: boolean) {
  await db.update(goalTasks).set({ done: !currentStatus }).where(eq(goalTasks.id, id))
  revalidatePath('/', 'layout')
}

export async function updateGoalTaskProgress(id: string, progress: string) {
  await db.update(goalTasks).set({ progress }).where(eq(goalTasks.id, id))
  revalidatePath('/', 'layout')
}

export async function editGoal(id: string, title: string, progress: string) {
    await db.update(goals).set({ title, progress }).where(eq(goals.id, id))
    revalidatePath('/', 'layout')
}

export async function deleteGoal(id: string) {
    await db.delete(goals).where(eq(goals.id, id))
    revalidatePath('/', 'layout')
}

export async function doMigration() {
    const allGoals = await db.select().from(goals);
    for (const g of allGoals) {
      if (g.title.includes("Hatake.Shop")) {
        await db.insert(projects).values({ title: g.title, description: "Moved from goals" });
        await db.delete(goals).where(eq(goals.id, g.id));
      }
    }
    await db.insert(goals).values({ title: "loss weight, down to 85", progress: "0" });
    revalidatePath('/', 'layout')
    return "done";
}

export async function addMoneyTransaction(amount: string, description: string, type: string) {
    await db.insert(money).values({ amount, description, type })
    revalidatePath('/', 'layout')
}

export async function deleteMoneyTransaction(id: string) {
    await db.delete(money).where(eq(money.id, id))
    revalidatePath('/', 'layout')
}
