import { Project } from 'api/project'
import { callApi } from 'lib/api'
import { FormEvent, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import styles from './ProjectPage.module.css'

const ProjectPage = ({
    projects,
    onSaved,
}: {
    projects: Project[]
    onSaved?: () => void
}) => {
    const { projectId } = useParams()
    const project = useMemo(
        () => projects.find((p) => String(p.id) === projectId),
        [projectId, projects]
    )
    const navigate = useNavigate()

    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState<null | string>(null)

    const [name, setName] = useState(project?.name ?? '')

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!name.trim()) {
            setError('Введите название проекта')
            return
        }

        try {
            setIsSaving(true)
            setError(null)

            await callApi({
                path: project ? '/projects/update' : '/projects/add',
                method: project ? 'PUT' : 'POST',
                query: { name },
            })

            navigate('/', { replace: true })
            onSaved?.()
        } catch {
            alert('Не удалось сохранить проект')
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2>{project ? 'Изменение проекта' : 'Новый проект'}</h2>

            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Название"
            />

            {error ? <div>{error}</div> : null}

            <button type="submit" disabled={isSaving}>
                {project ? 'Сохранить' : 'Создать'}
            </button>
        </form>
    )
}
export default ProjectPage
