import { getProjects } from "@/app/actions"
import ProjectsClientPage from "./client-page"

export default async function ProjectsPage() {
  const data = await getProjects()
  return <ProjectsClientPage initialData={data} />
}
