import {
    createProject,
    PROJECTS_QUERY_KEY,
    updateProject,
    useProjects,
} from 'api/project'
import { toDefaultPageUrl, toTasksListUrl } from 'lib/url'
import { FormEvent, useMemo, useState } from 'react'
import { useQueryClient } from 'react-query'
import { Navigate, useNavigate, useParams } from 'react-router'
import styles from './ProjectPage.module.css'

const ProjectPage = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { projectId } = useParams()
    const isUpdating = projectId !== undefined

    const { data: projects } = useProjects({ enabled: isUpdating })
    const project = useMemo(
        () => projects?.find((p) => String(p.id) === projectId),
        [projectId, projects]
    )

    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState<null | string>(null)

    const [name, setName] = useState(project?.name ?? '')

    if (isUpdating) {
        if (!projects) {
            return null
        }
        if (!project) {
            return <Navigate to={toDefaultPageUrl()} />
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!name.trim()) {
            setError('Введите название проекта')
            return
        }

        try {
            setIsSaving(true)
            setError(null)

            const updatedProject = await (project
                ? updateProject(project.id, { name })
                : createProject({ name }))

            await queryClient.invalidateQueries(PROJECTS_QUERY_KEY)
            navigate(toTasksListUrl(updatedProject.id), { replace: true })
        } catch (e) {
            console.log(e)
            alert('Не удалось сохранить проект')
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.title}>
                {isUpdating ? 'Изменение проекта' : 'Новый проект'}
            </h2>

            <input
                value={name}
                className={styles.name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Название"
            />

            {error ? <div>{error}</div> : null}

            <button
                className={styles.buttonCreate}
                type="submit"
                disabled={isSaving}
            >
                {isUpdating ? 'Сохранить' : 'Создать'}
            </button>
        </form>
    )
}
export default ProjectPage
