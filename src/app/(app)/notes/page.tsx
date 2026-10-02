import { getNotes } from "@/app/actions"
import NotesClientPage from "./client-page"

export default async function NotesPage() {
  const notes = await getNotes()
  return <NotesClientPage initialNotes={notes} />
}
