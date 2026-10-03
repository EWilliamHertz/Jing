import { getHabits } from "@/app/actions"
import HabitsClientPage from "./client-page"

export default async function HabitsPage() {
  const data = await getHabits()
  return <HabitsClientPage initialData={data} />
}
