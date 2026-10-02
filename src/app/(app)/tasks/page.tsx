import { getTasks } from "@/app/actions"
import TasksClientPage from "./client-page"

export default async function TasksPage() {
  const tasks = await getTasks()
  return <TasksClientPage initialTasks={tasks} />
}
