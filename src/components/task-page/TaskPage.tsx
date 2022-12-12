import { Project } from 'api/project'
import { Task } from 'api/task'
import { callApi } from 'lib/api'
import { formatDate, fromHumanDate, toHumanDate } from 'lib/time'
import { FormEvent, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import styles from './TaskPage.module.css'

const TaskPage = ({
    project,
    onSaved,
    tasks,
}: {
    project: Project | undefined
    tasks: Task[]
    onSaved?: () => void
}) => {
    const { taskId } = useParams()
    const task = useMemo(
        () => tasks.find((p) => String(p.id) === taskId),
        [taskId, tasks]
    )
    const navigate = useNavigate()

    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState<null | string>(null)

    const [name, setName] = useState(task?.name ?? '')
    const [description, setDescription] = useState(task?.description ?? '')
    const [startTime, setStartTime] = useState(() =>
        task ? toHumanDate(task.start) : ''
    )
    const [endTime, setEndTime] = useState(() =>
        task ? toHumanDate(task.end) : ''
    )

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!name.trim()) {
            setError('Введите название проекта')
            return
        }

        try {
            fromHumanDate(startTime)
        } catch {
            return
        }
        try {
            fromHumanDate(endTime)
        } catch {
            return
        }

        try {
            setIsSaving(true)
            setError(null)

            await callApi({
                path: task ? '/tasks/update' : '/tasks/add',
                method: task ? 'PUT' : 'POST',
                query: {
                    id: task ? task.id : project?.id,
                    name,
                    description,
                    start: formatDate(fromHumanDate(startTime)),
                    end: formatDate(fromHumanDate(endTime)),
                    status: task?.status ?? false,
                    priority: task?.priority ?? 0,
                },
            })

            navigate(-1)
            onSaved?.()
        } catch (e) {
            console.log(e)
            alert('Не удалось сохранить проект')
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2>{task ? 'Изменить задачу' : 'Новая задача'}</h2>

            <input
                value={name}
                placeholder="Название"
                onChange={(e) => setName(e.target.value)}
            />
            <input
                value={description}
                placeholder="Описание"
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                value={startTime}
                type="date"
                onChange={(e) => setStartTime(e.target.value)}
            />
            <input
                value={endTime}
                type="date"
                onChange={(e) => setEndTime(e.target.value)}
            />

            {error ? <div>{error}</div> : null}

            <button type="submit" disabled={isSaving}>
                {task ? 'Сохранить' : 'Создать'}
            </button>
        </form>
    )
}
export default TaskPage
