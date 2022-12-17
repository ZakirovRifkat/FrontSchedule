import { deleteTask, Task, TASK_QUERY_KEY } from 'api/task'
import { toHumanDate } from 'lib/time'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router'
import styles from './TaskItem.module.css'

const TaskItem = ({ task }: { task: Task }) => {
    const isPeriod = toHumanDate(task.start) !== toHumanDate(task.end)
    const navigate = useNavigate()

    const queryClient = useQueryClient()
    const handleDelete = async () => {
        // eslint-disable-next-line no-restricted-globals
        const sure = confirm('Вы уверены, что хотите удалить задачу?')
        if (!sure) {
            return
        }

        try {
            await deleteTask(task.id)
            await queryClient.invalidateQueries(TASK_QUERY_KEY)
        } catch {
            alert('Не удалось удалить задачу')
        }
    }

    return (
        <div className={styles.taskMargin}>
            <div className={styles.task}>
                <div>
                    <input className={styles.check} type={'checkbox'} />
                    <span>{task.name}</span>
                </div>
                <div>
                    <button
                        className={styles.button}
                        onClick={() =>
                            navigate(
                                `/project/${task.project.id}/task/${task.id}/edit`
                            )
                        }
                    >
                        Изменить
                    </button>
                    <button className={styles.button} onClick={handleDelete}>
                        Удалить
                    </button>
                </div>
            </div>
            <div className={styles.subtask}>
                {!task.description.trim()
                    ? 'Без описания'
                    : task.description
                          .split('\n')
                          .map((paragraph) => (
                              <p className={styles.paragraph}>{paragraph}</p>
                          ))}
            </div>
            <div className={styles.date}>
                Приоритет:{' '}
                {task.priority === 2
                    ? `Срочно`
                    : task.priority === 1
                    ? `похер`
                    : `Похер абсолютно`}
            </div>
            <div className={styles.date}>
                {isPeriod
                    ? `${toHumanDate(task.start)} - ${toHumanDate(task.end)}`
                    : toHumanDate(task.start)}
            </div>
        </div>
    )
}
export default TaskItem
