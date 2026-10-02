import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Task = {
  id: string
  title: string
  priority: 'High' | 'Medium' | 'Low'
  time: string
  project: string
  done: boolean
  tab: 'today' | 'upcoming'
}

export type ListItem = { name: string, done: boolean }
export type List = { id: string, title: string, items: ListItem[] }
export type Note = { id: string, title: string, content: string, date: string }

type StoreState = {
  tasks: Task[]
  lists: List[]
  notes: Note[]
  addTask: (task: Omit<Task, 'id' | 'done'>) => void
  toggleTask: (id: string) => void
  removeTask: (id: string) => void
  addList: (title: string) => void
  addListItem: (listId: string, itemName: string) => void
  toggleListItem: (listId: string, itemIndex: number) => void
  addNote: (title: string, content: string) => void
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      tasks: [
        { id: '1', title: "Finish homepage design", priority: "High", time: "10:00 AM", project: "LifeStack Redesign", done: true, tab: "today" },
        { id: '2', title: "Review Q3 budget", priority: "Medium", time: "2:00 PM", project: "Finance", done: false, tab: "today" },
        { id: '3', title: "Call the dentist", priority: "Low", time: "Anytime", project: "Health", done: false, tab: "today" },
        { id: '4', title: "Buy groceries for dinner", priority: "Medium", time: "6:00 PM", project: "Personal", done: false, tab: "today" },
        { id: '5', title: "Renew domain name", priority: "High", time: "Next week", project: "Business", done: false, tab: "upcoming" },
      ],
      lists: [
        { id: 'l1', title: "Grocery", items: [{ name: "Almond milk", done: false }, { name: "Eggs", done: true }] },
        { id: 'l2', title: "Packing (Stockholm)", items: [{ name: "Passport", done: false }, { name: "Camera", done: true }] }
      ],
      notes: [
        { id: 'n1', title: "Meeting with Sarah", content: "Discussed the new design system.", date: "2 days ago" },
        { id: 'n2', title: "Project Requirements", content: "Needs to be fast, responsive, and calm.", date: "1 week ago" }
      ],
      addTask: (task) => set((state) => ({
        tasks: [...state.tasks, { ...task, id: Math.random().toString(36).slice(2, 9), done: false }]
      })),
      toggleTask: (id) => set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, done: !t.done } : t)
      })),
      removeTask: (id) => set((state) => ({
        tasks: state.tasks.filter(t => t.id !== id)
      })),
      addList: (title) => set((state) => ({
        lists: [...state.lists, { id: Math.random().toString(36).slice(2, 9), title, items: [] }]
      })),
      addListItem: (listId, itemName) => set((state) => ({
        lists: state.lists.map(l => l.id === listId ? { ...l, items: [...l.items, { name: itemName, done: false }] } : l)
      })),
      toggleListItem: (listId, itemIndex) => set((state) => ({
        lists: state.lists.map(l => l.id === listId ? { 
          ...l, 
          items: l.items.map((it, idx) => idx === itemIndex ? { ...it, done: !it.done } : it) 
        } : l)
      })),
      addNote: (title, content) => set((state) => ({
        notes: [{ id: Math.random().toString(36).slice(2, 9), title, content, date: "Just now" }, ...state.notes]
      }))
    }),
    {
      name: 'jing-storage',
    }
  )
)
