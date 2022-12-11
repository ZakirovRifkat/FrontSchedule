import { array, Infer, number, object, string } from 'superstruct'

export type Project = Infer<typeof Project>
export const Project = object({
    id: number(),
    name: string(),
})

export const ProjectList = array(Project)
