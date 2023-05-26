import { Project } from 'api/project'
import { TASK_QUERY_KEY } from 'api/task'
import { callApi } from 'lib/api'
import { useQueryClient } from 'react-query'

export const useGoogleIntegration = (project: Project | undefined) => {
    const queryClient = useQueryClient()

    const handleUploadToGoogle = async () => {
        if (!project) {
            return
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
