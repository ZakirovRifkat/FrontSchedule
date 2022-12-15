import {
    createTask,
    Task,
    TASK_QUERY_KEY,
    updateTask,
    useTasks,
} from 'api/task'
import { FormEvent, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router'
import styles from './TaskPage.module.css'
import DatePicker from 'react-datepicker'
import { useListType } from 'components/task-list/use-list-type'
import { toDefaultPageUrl, toTasksListUrl } from 'lib/url'
import { useQueryClient } from 'react-query'
import { Project, useProjects } from 'api/project'

const TaskPage = () => {
    const [listType] = useListType()

    const { data: projects } = useProjects()
    const { projectId } = useParams()
    const project = useMemo(
        () => projects?.find((p) => String(p.id) === projectId),
        [projectId, projects]
    )

    const { taskId } = useParams()
    const isUpdating = taskId !== undefined

    const { data: tasks } = useTasks(isUpdating ? listType : null)
    const task = useMemo(
        () => tasks?.find((t) => String(t.id) === taskId),
        [taskId, tasks]
    )

    if (!projects) {
        return null
    }
    if (!project) {
        return <Navigate to={toDefaultPageUrl()} />
    }

    if (isUpdating) {
        if (!tasks) {
            return null
        }
        if (!task) {
            return <Navigate to={toDefaultPageUrl()} replace />
        }
    }

    return <TaskEditor project={project} task={task} />
}
export default TaskPage

const TaskEditor = ({
    project,
    task,
}: {
    project: Project
    task: Task | undefined
}) => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState<null | string>(null)

    const [name, setName] = useState(task?.name ?? '')
    const [description, setDescription] = useState(task?.description ?? '')
    const [startDate, setStartDate] = useState(() =>
        task ? new Date(Date.parse(task.start)) : null
    )
    const [endDate, setEndDate] = useState(() =>
        task ? new Date(Date.parse(task.end)) : null
    )

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!name.trim()) {
            setError('Введите название проекта')
            return
        }

        if (!startDate || !endDate) {
            setError('Введите даты начала и конца')
            return
        }

        try {
            setIsSaving(true)
            setError(null)

            const data = {
                name,
                description,
                start: startDate,
                end: endDate,
                status: task?.status ?? false,
                priority: task?.priority ?? 0,
            }
            if (task) {
                await updateTask(task.id, data)
            } else {
                await createTask(project.id, data)
            }

            await queryClient.invalidateQueries(TASK_QUERY_KEY)
            navigate(toTasksListUrl(project.id))
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
            <div className={styles.dateBlock}>
                <DatePicker
                    className={styles.taskDate}
                    selectsRange={true}
                    selected={startDate}
                    allowSameDay={true}
                    maxDate={null}
                    dateFormat="dd.MM.yyyy"
                    startDate={startDate}
                    endDate={endDate}
                    onChange={([start, end]) => {
                        setStartDate(start)
                        setEndDate(end)
                    }}
                    placeholderText="Даты"
                    withPortal
                />
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
            </div>
        </form>
    )
}
