import { Project } from 'api/project'
import { TASK_QUERY_KEY } from 'api/task'
import { callApi, formatPath } from 'lib/api'
import { useQueryClient } from 'react-query'
import { boolean, object } from 'superstruct'

export const useGoogleIntegration = (project: Project | undefined) => {
    const queryClient = useQueryClient()

    const authorizeGoogle = async () => {
        try {
            const { authorized } = await callApi({
                path: '/google/is-authorized',
                method: 'GET',
                parser: object({ authorized: boolean() }),
            })

            if (!authorized) {
                window.location.href = formatPath({
                    path: 'https://accounts.google.com/o/oauth2/v2/auth',
                    query: {
                        scope: 'https://www.googleapis.com/auth/calendar.events',
                        access_type: 'offline',
                        include_granted_scopes: true,
                        response_type: 'code',
                        redirect_uri: formatPath({ path: '/google/callback' }),
                        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                        state: window.location.href,
                    },
                })
                return false
            }
            return true
        } catch (e) {
            console.error(e)
            return false
        }
    }

    const handleUploadToGoogle = async () => {
        if (!project) {
            return
        }

        const authorized = await authorizeGoogle()
        if (!authorized) {
            return null
        }

        try {
            await callApi({
                path: '/google/upload',
                method: 'POST',
                query: { projectId: project.id },
            })
            alert('Задачи выгружены')
        } catch (e) {
            console.error(e)
            alert('Не удалось выгрузить задачи')
        }
    }

    const handleDownloadFromGoogle = async () => {
        if (!project) {
            return
        }

        const authorized = await authorizeGoogle()
        if (!authorized) {
            return null
        }

        try {
            await callApi({
                path: '/google/download',
                method: 'POST',
                query: { projectId: project.id },
            })

            alert('Задачи выгружены')
            await queryClient.invalidateQueries(TASK_QUERY_KEY)
        } catch (e) {
            console.error(e)
            alert('Не удалось выгрузить задачи')
        }
    }

    return { handleUploadToGoogle, handleDownloadFromGoogle }
}
