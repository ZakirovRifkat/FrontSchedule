import { callApi, useQuery } from 'lib/api'
import { array, Infer, number, object, string } from 'superstruct'

export type Project = Infer<typeof Project>
export const Project = object({
    id: number(),
    name: string(),
})

export const ProjectArray = array(Project)

export const PROJECTS_QUERY_KEY = 'projects'
export const useProjects = ({ enabled }: { enabled?: boolean } = {}) =>
    useQuery(
        PROJECTS_QUERY_KEY,
        {
            path: '/projects/all',
            parser: ProjectArray,
        },
        { enabled }
    )

export const createProject = ({ name }: { name: string }) =>
    callApi({
        path: '/projects/add',
        method: 'POST',
        query: { name },
        parser: Project,
    })
export const updateProject = (projectId: number, { name }: { name: string }) =>
    callApi({
        path: '/projects/update',
        method: 'PUT',
        query: { id: projectId, name },
        parser: Project,
    })
export const deleteProject = (projectId: number) =>
    callApi({
        path: '/projects/delete',
        method: 'DELETE',
        query: { id: projectId },
    })
