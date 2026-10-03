import { getTasks, getLists, getNotes, getHabits, getGoals, getMoney } from "@/app/actions"
import DashboardClientPage from "./client-page"

export default async function DashboardPage() {
  const tasks = await getTasks()
  const habits = await getHabits()
  const goals = await getGoals()
  const money = await getMoney()
  return <DashboardClientPage initialTasks={tasks} initialHabits={habits} initialGoals={goals} initialMoney={money} />
}
