import { getSocials } from "@/app/actions"
import SocialClientPage from "./client-page"

export default async function SocialPage() {
  const data = await getSocials()
  return <SocialClientPage initialData={data} />
}
