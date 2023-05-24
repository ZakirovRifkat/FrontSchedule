import { useQuery } from 'lib/api'
import { Infer, number, object, string } from 'superstruct'

export type User = Infer<typeof User>
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const User = object({
    id: number(),
    name: string(),
})

export const CURRENT_USER_QUERY_KEY = 'me'
export const useUser = ({ enabled }: { enabled?: boolean } = {}) =>
    useQuery(
        CURRENT_USER_QUERY_KEY,
        {
            path: '/me',
            parser: User,
        },
        { enabled }
    )
