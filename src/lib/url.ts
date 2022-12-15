import { Filter } from 'components/task-list/use-list-type'
import { includes, valuesOf } from './util'

export const toDefaultPageUrl = () => toGroupPageUrl(Filter.today)
export const toProjectPageUrl = (listType: number | string) =>
    `/project/${listType}`
export const toGroupPageUrl = (listType: number | string) =>
    `/group/${listType}`
export const toTasksListUrl = (listType: string | number) =>
    includes(valuesOf(Filter), listType)
        ? toGroupPageUrl(listType)
        : toProjectPageUrl(listType)

export const toEditProjectUrl = (projectId: string | number) =>
    `/project/${projectId}/edit`
export const toNewProjectUrl = () => `/project/new`

export const toEditTaskUrl = (
    projectId: string | number,
    taskId: number | string
) => `/project/${projectId}/task/${taskId}/edit`
export const toNewTaskUrl = (projectId: string | number) =>
    `/project/${projectId}/task/new`
