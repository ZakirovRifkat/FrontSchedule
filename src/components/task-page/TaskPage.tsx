import { Project } from 'api/project'
import { Task } from 'api/task'
import { callApi } from 'lib/api'
import { formatDate, fromInputDate, toInputDate } from 'lib/time'
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
        task ? toInputDate(task.start) : ''
    )
    const [endTime, setEndTime] = useState(() =>
        task ? toInputDate(task.end) : ''
    )

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!name.trim()) {
            setError('Введите название проекта')
            return
        }

        try {
            fromInputDate(startTime)
        } catch {
            return
        }
        try {
            fromInputDate(endTime)
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
                    start: formatDate(fromInputDate(startTime)),
                    end: formatDate(fromInputDate(endTime)),
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
            <h2 className={styles.title}>
                {task ? 'Изменить задачу' : 'Новая задача'}
            </h2>

            <input
                value={name}
                className={styles.taskName}
                placeholder="Название"
                onChange={(e) => setName(e.target.value)}
            />
            <textarea
                value={description}
                className={styles.taskDescription}
                placeholder="Описание"
                onChange={(e) => setDescription(e.target.value)}
            />
            <div>
                <input
                    value={startTime}
                    className={styles.taskDate}
                    type="date"
                    onChange={(e) => setStartTime(e.target.value)}
                />
                <input
                    value={endTime}
                    className={styles.taskDate}
                    type="date"
                    onChange={(e) => setEndTime(e.target.value)}
                />
            </div>

            {error ? <div>{error}</div> : null}

            <div className={styles.buttons}>
                <button
                    className={styles.buttonCreateTask}
                    type="submit"
                    disabled={isSaving}
                >
                    {task ? 'Сохранить' : 'Создать'}
                </button>
            </div>
        </form>
    )
}
export default TaskPage
