import { Project } from 'api/project'
import { Task, TaskList } from 'api/task'
import Alert from 'components/alert/Alert'
import ErrorMessage from 'components/error-message/ErrorMessage'
import Spinner from 'components/spinner/Spinner'
import TaskPage from 'components/task-page/TaskPage'
import { callApi, useQuery } from 'lib/api'
import { toHumanDate, toInputDate } from 'lib/time'
import { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router'
import style from './Content.module.css'
import { Filter, useContentType } from './use-content-type'

const pathsForFilters: Record<Filter, string> = {
    [Filter.today]: '/tasks/today',
    [Filter.oncoming]: '/tasks/planed',
    [Filter.overdue]: '/tasks/notdone',
}

const Content = ({ projects }: { projects: Project[] }) => {
    const [contentType] = useContentType()
    const navigate = useNavigate()

    const { isFetching, error, data, refetch } = useQuery(
        'tasks',
        typeof contentType === 'number'
            ? {
                  path: '/tasks/all',
                  query: { id: contentType },
                  parser: TaskList,
              }
            : {
                  path: pathsForFilters[contentType],
                  parser: TaskList,
              }
    )

    useEffect(() => {
        refetch()
    }, [contentType, refetch])

    if (isFetching) {
        return <Spinner />
    }

    if (error || !data) {
        return (
            <ErrorMessage
                text="Не удалось загрузить список задач"
                retry={refetch}
            />
        )
    }

    const project = projects.find((p) => p.id === contentType)
    const projectName =
        contentType === Filter.today
            ? 'Сегодня'
            : contentType === Filter.oncoming
            ? 'Предстоящие'
            : contentType === Filter.overdue
            ? 'Просроченные'
            : project?.name

    if (!projectName) {
        return <Navigate to="/" />
    }

    return (
        <div className={style.form}>
            <div className={style.title}>{projectName}</div>

            <Routes>
                <Route
                    index
                    element={
                        !data.length ? (
                            <Alert
                                text="Ни одной задачи, как неожиданно и приятно"
                                buttonText={project ? 'Создать' : undefined}
                                onButtonClick={
                                    project
                                        ? () =>
                                              navigate(
                                                  `/project/${project.id}/task/create`
                                              )
                                        : undefined
                                }
                            />
                        ) : (
                            <>
                                {data.map((task) => (
                                    <TaskItem
                                        key={task.id}
                                        task={task}
                                        project={project}
                                        onDeleted={refetch}
                                    />
                                ))}
                                {project ? (
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/project/${project.id}/task/create`
                                            )
                                        }
                                    >
                                        Создать задачу
                                    </button>
                                ) : null}
                            </>
                        )
                    }
                />
                {!project ? null : (
                    <Route
                        path="/task/create"
                        element={
                            <TaskPage
                                tasks={data}
                                project={project}
                                onSaved={refetch}
                            />
                        }
                    />
                )}
                <Route
                    path="/task/:taskId/edit"
                    element={
                        <TaskPage
                            tasks={data}
                            project={project}
                            onSaved={refetch}
                        />
                    }
                />
            </Routes>
        </div>
    )
}
export default Content

const TaskItem = ({
    project,
    task,
    onDeleted,
}: {
    project: Project | undefined
    task: Task
    onDeleted?: () => void
}) => {
    const isPeriod = toInputDate(task.start) !== toInputDate(task.end)
    const navigate = useNavigate()

    const handleDelete = async () => {
        try {
            await callApi({
                path: '/tasks/delete',
                method: 'DELETE',
                query: { id: task.id },
            })

            onDeleted?.()
        } catch {
            alert('Не удалось удалить задачу')
        }
    }

    return (
        <div className={style.taskMargin}>
            <div className={style.task}>
                <div>
                    <input className={style.check} type={'checkbox'} />
                    <span>{task.name}</span>
                </div>
                <div>
                    <button
                        className={style.button}
                        onClick={() =>
                            navigate(
                                `/project/${project?.id ?? 'today'}/task/${
                                    task.id
                                }/edit`
                            )
                        }
                    >
                        Изменить
                    </button>
                    <button className={style.button} onClick={handleDelete}>
                        Удалить
                    </button>
                </div>
            </div>
            <div className={style.subtask}>
                {task.description || 'Без описания'}
            </div>
            <div className={style.date}>
                {isPeriod
                    ? `${toHumanDate(task.start)} - ${toHumanDate(task.end)}`
                    : toHumanDate(task.start)}
            </div>
        </div>
    )
}
