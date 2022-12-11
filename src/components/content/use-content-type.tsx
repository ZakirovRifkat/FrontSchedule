import { includes, valuesOf } from 'lib/util'
import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

export enum Filter {
    today = 'today',
    overdue = 'overdue',
    oncoming = 'oncoming',
}
export type ContentType = Filter | number

export const useContentType = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const contentType = getContentType(searchParams)
    const setContentType = useCallback(
        (nextContentType: ContentType) => {
            const nextSearchParams = new URLSearchParams({
                contentType: String(nextContentType),
            })
            setSearchParams(nextSearchParams)
        },
        [setSearchParams]
    )

    return [contentType, setContentType] as const
}

const getContentType = (search: URLSearchParams): ContentType => {
    const searchContentType = search.get('contentType')

    if (includes(valuesOf(Filter), searchContentType)) {
        return searchContentType
    }

    if (searchContentType && isFinite(+searchContentType)) {
        return +searchContentType
    }

    return Filter.today
}
