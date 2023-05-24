import { Project } from 'api/project'
import { TASK_QUERY_KEY } from 'api/task'
import { callApi, formatPath } from 'lib/api'
import { getGoogleOauthRedirectPath } from 'lib/google'
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
                window.location.href = getGoogleOauthRedirectPath()
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
