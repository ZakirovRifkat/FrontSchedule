import { Filter } from 'components/task-list/use-list-type'
import { callApi, useQuery } from 'lib/api'
import { formatDate } from 'lib/time'
import { array, boolean, Infer, number, object, string } from 'superstruct'
import { Project } from './project'

export type Task = Infer<typeof Task>
// eslint-disable-next-line @typescript-eslint/no-redeclare
const Task = object({
    id: number(),
    name: string(),
    description: string(),
    start: string(),
    end: string(),
    status: boolean(),
    priority: number(),
    project: Project,
})

export const TaskArray = array(Task)

const filteredPaths: Record<Filter, string> = {
    [Filter.today]: '/tasks/today',
    [Filter.oncoming]: '/tasks/planed',
    [Filter.overdue]: '/tasks/notdone',
}
export const TASK_QUERY_KEY = 'tasks'
export const useTasks = (listType: Filter | number | null) =>
    useQuery(
        [TASK_QUERY_KEY, listType],
        typeof listType === 'number'
            ? {
                  path: '/tasks/all',
                  query: { id: listType },
                  parser: TaskArray,
              }
            : {
                  path: filteredPaths[listType ?? Filter.today],
                  parser: TaskArray,
              },
        { enabled: listType !== null }
    )

type TaskData = {
    name: string
    description: string
    start: Date
    end: Date
    status: boolean
    priority: number
}
export const updateTask = (taskId: number, data: TaskData) =>
    callApi({
        path: '/tasks/update',
        method: 'PUT',
        query: {
            ...data,
            id: taskId,
            start: formatDate(data.start),
            end: formatDate(data.end),
        },
    })
export const createTask = (projectId: number, data: TaskData) =>
    callApi({
        path: '/tasks/add',
        method: 'POST',
        query: {
            ...data,
            id: projectId,
            start: formatDate(data.start),
            end: formatDate(data.end),
        },
    })
export const deleteTask = (taskId: number) =>
    callApi({
        path: '/tasks/delete',
        method: 'DELETE',
        query: { id: taskId },
    })
