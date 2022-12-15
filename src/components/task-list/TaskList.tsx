import { Project, useProjects } from 'api/project'
import { useTasks } from 'api/task'
import Alert from 'components/alert/Alert'
import ErrorMessage from 'components/error-message/ErrorMessage'
import Spinner from 'components/spinner/Spinner'
import { toDefaultPageUrl, toNewProjectUrl, toNewTaskUrl } from 'lib/url'
import { useMemo } from 'react'
import { Navigate, useNavigate } from 'react-router'
import TaskItem from './task-item/TaskItem'
import style from './TaskList.module.css'
import { useGoogleIntegration } from './use-google-integration'
import { Filter, useListType } from './use-list-type'

const filterTitles: Record<Filter, string> = {
    [Filter.today]: 'Сегодня',
    [Filter.oncoming]: 'Предстоящие',
    [Filter.overdue]: 'Просроченные',
}
const TaskList = ({ search }: { search: string }) => {
    const [listType] = useListType()
    const navigate = useNavigate()

    const { data: projects } = useProjects()
    const { isFetching, error, refetch, data: rawTasks } = useTasks(listType)
    const filteredTasks = useMemo(
        () => rawTasks?.filter((task) => task.name.includes(search.trim())),
        [rawTasks, search]
    )

    const isProjectPage = typeof listType === 'number'
    const project = projects?.find((p) => p.id === listType)

    const { handleDownloadFromGoogle, handleUploadToGoogle } =
        useGoogleIntegration(project)

    if (!projects) {
        return null
    }

    if (!projects.length) {
        return (
            <Alert
                text="У вас нет ни одного проекта"
                buttonText="Создать"
                onButtonClick={() => navigate(toNewProjectUrl())}
            />
        )
    }

    if (isFetching) {
        return <Spinner />
    }

    if (error || !filteredTasks) {
        return (
            <ErrorMessage
                text="Не удалось загрузить список задач"
                retry={refetch}
            />
        )
    }

    if (isProjectPage && !project) {
        return <Navigate to={toDefaultPageUrl()} />
    }

    return (
        <div className={style.form}>
            <div className={style.title}>
                {typeof listType !== 'number'
                    ? filterTitles[listType]
                    : project?.name}
            </div>

            {project ? (
                <>
                    <button onClick={handleUploadToGoogle}>
                        Выгрузить задачи в гугл календарь
                    </button>
                    <button onClick={handleDownloadFromGoogle}>
                        Скачать задачи из гугл календаря
                    </button>
                </>
            ) : null}
            {!filteredTasks.length ? (
                <NoTasks project={project} hasSearch={!!search.trim()} />
            ) : (
                <>
                    {filteredTasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                    {project ? (
                        <button
                            className={style.buttonCreateTask}
                            onClick={() => navigate(toNewTaskUrl(project.id))}
                        >
                            Создать задачу
                        </button>
                    ) : null}
                </>
            )}
        </div>
    )
}
export default TaskList

const NoTasks = ({
    project,
    hasSearch,
}: {
    project: Project | undefined
    hasSearch: boolean
}) => {
    const navigate = useNavigate()
    const text = hasSearch
        ? 'По этому поисковому запросу нет задач'
        : 'Ни одной задачи, как неожиданно и приятно'
    const handleClick = () => {
        if (!project) {
            return
        }

        navigate(toNewTaskUrl(project.id))
    }

    return (
        <Alert
            text={text}
            buttonText={project && !hasSearch ? 'Создать' : undefined}
            onButtonClick={handleClick}
        />
    )
}
