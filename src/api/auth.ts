import { callApi, useQuery } from 'lib/api'
import { nullable, number, object } from 'superstruct'

export const CURRENT_USER_QUERY_KEY = 'me'
export const useUser = ({ enabled }: { enabled?: boolean } = {}) =>
    useQuery(
        CURRENT_USER_QUERY_KEY,
        {
            path: '/user/me',
            parser: object({ userId: nullable(number()) }),
        },
        { enabled }
    )

export const logout = () =>
    callApi({
        path: '/user/logout',
        method: 'POST',
    })
