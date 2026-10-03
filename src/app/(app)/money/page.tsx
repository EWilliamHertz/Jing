import { getMoney } from "@/app/actions"
import MoneyClientPage from "./client-page"

export default async function MoneyPage() {
  const data = await getMoney()
  return <MoneyClientPage initialData={data} />
}
