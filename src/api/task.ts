import { array, Infer, number, object, string } from 'superstruct'

export type Task = Infer<typeof Task>
export const Task = object({
    id: number(),
    name: string(),
    start: number(),
    end: number(),
})

export const TaskList = array(Task)
