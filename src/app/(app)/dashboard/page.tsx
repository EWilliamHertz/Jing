import { getTasks, getLists, getNotes } from "@/app/actions"
import DashboardClientPage from "./client-page"

export default async function DashboardPage() {
  const tasks = await getTasks()
  return <DashboardClientPage initialTasks={tasks} />
}
