import { array, boolean, Infer, number, object, string } from 'superstruct'
import { Project } from './project'

export type Task = Infer<typeof Task>
export const Task = object({
    id: number(),
    name: string(),
    description: string(),
    start: string(),
    end: string(),
    status: boolean(),
    priority: number(),
    project: Project,
})

export const TaskList = array(Task)
