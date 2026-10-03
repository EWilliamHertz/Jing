import { getGoals } from "@/app/actions"
import GoalsClientPage from "./client-page"

export default async function GoalsPage() {
  const data = await getGoals()
  return <GoalsClientPage initialData={data} />
}
