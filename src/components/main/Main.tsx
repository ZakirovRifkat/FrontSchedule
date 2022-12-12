import { Project, ProjectList } from 'api/project'
import Alert from 'components/alert/Alert'
import ErrorMessage from 'components/error-message/ErrorMessage'
import ProjectPage from 'components/project-page/ProjectPage'
import Spinner from 'components/spinner/Spinner'
import TaskPage from 'components/task-page/TaskPage'
import { useQuery } from 'lib/api'
import { Navigate, Route, Routes, useNavigate } from 'react-router'
import Content from '../content/Content'
import Menu from '../menu/Menu'
import styles from './Main.module.css'

const Main = ({ isMenuOpen }: { isMenuOpen: boolean }) => {
    const navigate = useNavigate()
    const { isLoading, error, data, refetch } = useQuery('projects', {
        path: '/projects/all',
        parser: ProjectList,
    })

    if (isLoading) {
        return (
            <div className={styles.mainContainer}>
                <Spinner />
            </div>
        )
    }

    if (error || !data) {
        return (
            <div className={styles.mainContainer}>
                <ErrorMessage
                    text="Не удалось загрузить список проектов"
                    retry={refetch}
                />
            </div>
        )
    }

    return (
        <div className={styles.mainContainer}>
            <Menu isMenuOpen={isMenuOpen} projects={data} />
            <div className={styles.mainContent}>
                {!data.length ? (
                    <Routes>
                        <Route
                            path="/project/create"
                            element={
                                <ProjectPage
                                    projects={data}
                                    onSaved={refetch}
                                />
                            }
                        />
                        <Route
                            path="*"
                            element={
                                <Alert
                                    text="У вас нет ни одного проекта"
                                    buttonText="Создать"
                                    onButtonClick={() =>
                                        navigate('/project/create')
                                    }
                                />
                            }
                        />
                    </Routes>
                ) : (
                    <Routes>
                        <Route
                            path="/project/create"
                            element={
                                <ProjectPage
                                    projects={data}
                                    onSaved={refetch}
                                />
                            }
                        />
                        <Route
                            path="/project/:projectId/edit"
                            element={
                                <ProjectPage
                                    projects={data}
                                    onSaved={refetch}
                                />
                            }
                        />
                        <Route
                            path="/project/:projectId/*"
                            element={<Content projects={data} />}
                        />
                        <Route
                            path="*"
                            element={<Navigate to="/project/today" />}
                        />
                    </Routes>
                )}
            </div>
        </div>
    )
}
export default Main
