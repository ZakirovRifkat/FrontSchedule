import { useQuery as useQueryLib } from 'react-query'
import { mask, Struct } from 'superstruct'
import { keysOf } from './util'

type Options<T extends unknown> = {
    path: string
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    query?: Record<string, string | number | boolean | undefined>
    body?: unknown
    parser?: Struct<T>
}

export const useQuery = <T extends unknown>(
    name: string,
    options: Options<T>
) => useQueryLib(name, () => callApi(options))

export const callApi = async <T extends unknown>({
    path,
    method,
    query,
    body,
    parser,
}: Options<T>): Promise<T> => {
    const url = [
        process.env.REACT_APP_API_HOST,
        path,
        query ? '?' + toQueryString(query) : undefined,
    ]
        .filter(Boolean)
        .join('')
    const response = await fetch(url, {
        method,
        headers: body ? { 'Content-Type': 'application/json' } : undefined,
        body: body ? JSON.stringify(body) : undefined,
        credentials: 'include',
    })

    if (!response.ok) {
        throw new HttpError(response.status)
    }

    const data = await response.json().catch(() => {
        throw new ApiError()
    })

    if (parser) {
        return mask(data, parser)
    }
    return data
}

const toQueryString = (
    query: Record<string, string | boolean | number | undefined>
): string => {
    const searchParams = new URLSearchParams()
    for (const key of keysOf(query)) {
        if (query[key] !== undefined) {
            searchParams.append(key, String(query[key]))
        }
    }
    return searchParams.toString()
}

export class ApiError extends Error {}
export class HttpError extends Error {
    constructor(public statusCode: number) {
        super('HTTP Error')
    }
}
