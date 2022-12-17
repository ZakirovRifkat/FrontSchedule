import {
    deleteProject,
    Project,
    PROJECTS_QUERY_KEY,
    useProjects,
} from 'api/project'
import { useTasks } from 'api/task'
import Alert from 'components/alert/Alert'
import ErrorMessage from 'components/error-message/ErrorMessage'
import Spinner from 'components/spinner/Spinner'
import { toDefaultPageUrl, toNewProjectUrl, toNewTaskUrl } from 'lib/url'
import { useMemo } from 'react'
import { useQueryClient } from 'react-query'
import { Navigate, useNavigate } from 'react-router'
import TaskItem from './task-item/TaskItem'
import styles from './TaskList.module.css'
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
    const queryClient = useQueryClient()

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

    const handleDeleteProject = async () => {
        const sure = window.confirm(`Вы уверены, что хотите удалить проект?`)
        if (!sure) {
            return
        }
        if (!project) {
            return
        }
        try {
            await deleteProject(project.id)
            queryClient.invalidateQueries(PROJECTS_QUERY_KEY)
        } catch (e) {
            console.error(e)
            alert('Не удалось удалить проект')
        }
    }

    return (
        <div className={styles.form}>
            <div className={styles.titleContainer}>
                <h2 className={styles.title}>
                    {typeof listType !== 'number'
                        ? filterTitles[listType]
                        : project?.name}
                </h2>

                {project ? (
                    <div>
                        <button
                            className={styles.button}
                            onClick={handleDeleteProject}
                        >
                            Удалить проект
                        </button>
                        <button
                            className={styles.button}
                            onClick={handleUploadToGoogle}
                        >
                            Выгрузить задачи в гугл календарь
                        </button>
                        <button
                            className={styles.button}
                            onClick={handleDownloadFromGoogle}
                        >
                            Скачать задачи из гугл календаря
                        </button>
                    </div>
                ) : null}
            </div>
            <hr className={styles.horizontalLine} />
            {!filteredTasks.length ? (
                <NoTasks project={project} hasSearch={!!search.trim()} />
            ) : (
                <>
                    {filteredTasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                    {project ? (
                        <button
                            className={styles.buttonCreateTask}
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
