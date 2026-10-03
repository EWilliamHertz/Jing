import { getReadings } from "@/app/actions"
import ReadingClientPage from "./client-page"

export default async function ReadingPage() {
  const data = await getReadings()
  return <ReadingClientPage initialData={data} />
}
