import { mask, Struct } from "superstruct"
import { keysOf } from "./object"

export const callApi = async <T extends unknown>(
    path: string,
    {
        method,
        query,
        body,
        parser,
    }: {
        method: "GET" | "POST" | "PUT" | "DELETE"
        query?: Record<string, string | number | undefined>
        body?: unknown
        parser?: Struct<T>
    }
): Promise<T> => {
    const url = [
        process.env.REACT_APP_API_HOST,
        path,
        query ? toQueryString(query) : undefined,
    ]
        .filter(Boolean)
        .join("")
    const response = await fetch(url, {
        method,
        headers: body ? { "Content-Type": "application/json" } : undefined,
        body: body ? JSON.stringify(body) : undefined,
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
    query: Record<string, string | number | undefined>
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
        super("HTTP Error")
    }
}
