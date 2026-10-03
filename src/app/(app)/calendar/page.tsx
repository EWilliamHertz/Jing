import { getCalendarEvents } from "@/app/actions"
import CalendarClientPage from "./client-page"

export default async function CalendarPage() {
  const data = await getCalendarEvents()
  return <CalendarClientPage initialData={data} />
}
