import { Task, TaskList } from 'api/task'
import ErrorMessage from 'components/error-message/ErrorMessage'
import Spinner from 'components/spinner/Spinner'
import { useQuery } from 'lib/api'
import style from './Content.module.css'
import { Filter, useContentType } from './use-content-type'

const pathsForFilters: Record<Filter, string> = {
    [Filter.today]: '/tasks/today',
    [Filter.oncoming]: '/tasks/planed',
    [Filter.overdue]: '/tasks/notdone',
}

const Content = () => {
    const [contentType] = useContentType()
    const { isLoading, error, data, refetch } = useQuery(
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

    if (isLoading) {
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

    return (
        <div className={style.form}>
            <div className={style.title}>Проект 1</div>

            {data.map((task) => (
                <TaskItem task={task} />
            ))}
        </div>
    )
}
export default Content

const TaskItem = ({ task }: { task: Task }) => {
    return (
        <div className={style.taskMargin}>
            <div className={style.task}>
                <div>
                    <input className={style.check} type={'checkbox'} />
                    <span>{task.name}</span>
                </div>
                <div>
                    <button className={style.button}>Изменить</button>
                    <button className={style.button}>Удалить</button>
                </div>
            </div>
            <div className={style.subtask}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Provident illo, numquam quia, saepe mollitia modi excepturi
                sint, fugiat facilis omnis laboriosam?
            </div>
            <div className={style.date}>09.12.2022</div>
        </div>
    )
}
