import { callApi, useQuery } from 'lib/api'
import { array, Infer, number, object, string } from 'superstruct'

export type Project = Infer<typeof Project>
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Project = object({
    id: number(),
    name: string(),
})

export const ProjectArray = array(Project)

export const PROJECTS_QUERY_KEY = 'projects'
export const useProjects = (
    userId: number,
    {
        enabled,
    }: {
        enabled?: boolean
    } = {}
) =>
    useQuery(
        PROJECTS_QUERY_KEY,
        {
            path: '/projects/all',
            query: { userId },
            parser: ProjectArray,
        },
        { enabled }
    )

export const createProject = (
    userId: number,
    {
        name,
    }: {
        name: string
    }
) =>
    callApi({
        path: '/projects/add',
        method: 'POST',
        query: { name, userId },
        parser: Project,
    })
export const updateProject = (
    userId: number,
    projectId: number,
    { name }: { name: string }
) =>
    callApi({
        path: '/projects/update',
        method: 'PUT',
        query: { id: projectId, name },
        parser: Project,
    })
export const deleteProject = (userId: number, projectId: number) =>
    callApi({
        path: '/projects/delete',
        method: 'DELETE',
        query: { id: projectId },
    })
