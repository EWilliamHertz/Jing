import { getIdeas } from "@/app/actions"
import IdeasClientPage from "./client-page"

export default async function IdeasPage() {
  const data = await getIdeas()
  return <IdeasClientPage initialData={data} />
}
