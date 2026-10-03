import { getTravels } from "@/app/actions"
import TravelClientPage from "./client-page"

export default async function TravelPage() {
  const data = await getTravels()
  return <TravelClientPage initialData={data} />
}
