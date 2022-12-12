import { includes, valuesOf } from 'lib/util'
import { useCallback } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export enum Filter {
    today = 'today',
    overdue = 'overdue',
    oncoming = 'oncoming',
}
export type ContentType = Filter | number

export const useContentType = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const contentType = getContentType(location.pathname)
    const setContentType = useCallback(
        (nextContentType: ContentType) => {
            navigate(`/project/${nextContentType}`)
        },
        [navigate]
    )

    return [contentType, setContentType] as const
}

const getContentType = (path: string): ContentType => {
    const match = path.match(/^\/project\/([^/]+)/)
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
