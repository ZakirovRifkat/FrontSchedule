import { array, boolean, Infer, number, object, string } from 'superstruct'

export type Task = Infer<typeof Task>
export const Task = object({
    id: number(),
    name: string(),
    description: string(),
    start: string(),
    end: string(),
    status: boolean(),
    priority: number(),
})

export const TaskList = array(Task)
