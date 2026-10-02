import { getLists } from "@/app/actions"
import ListsClientPage from "./client-page"

export default async function ListsPage() {
  const lists = await getLists()
  return <ListsClientPage initialLists={lists} />
}
