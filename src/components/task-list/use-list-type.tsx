import { toTasksListUrl } from 'lib/url'
import { includes, valuesOf } from 'lib/util'
import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export enum Filter {
    today = 'today',
    overdue = 'overdue',
    oncoming = 'oncoming',
}
export type ListType = Filter | number

export const useListType = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const listType = getListType(location.pathname)
    const setListType = useCallback(
        (nextListType: ListType) => {
            navigate(toTasksListUrl(nextListType))
        },
        [navigate]
    )

    return [listType, setListType] as const
}

const getListType = (path: string): ListType => {
    const match = path.match(/^\/(?:project|group)\/([^/]+)/)
    if (!match) {
        return Filter.today
    }

    const [, projectId] = match

    if (includes(valuesOf(Filter), projectId)) {
        return projectId
    }

    if (projectId && isFinite(+projectId)) {
        return +projectId
    }

    return Filter.today
}
