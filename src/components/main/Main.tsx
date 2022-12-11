import { Project, ProjectList } from 'api/project'
import Alert from 'components/alert/Alert'
import ErrorMessage from 'components/error-message/ErrorMessage'
import ProjectPage from 'components/project-page/ProjectPage'
import Spinner from 'components/spinner/Spinner'
import { useQuery } from 'lib/api'
import { Route, Routes, useNavigate } from 'react-router'
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
            <Menu isMenuOpen={isMenuOpen} />
            <div className={styles.mainContent}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            !data.length ? (
                                <Alert
                                    text="У вас нет ни одного проекта"
                                    buttonText="Создать"
                                    onButtonClick={() => navigate('/project')}
                                />
                            ) : (
                                <Content />
                            )
                        }
                    />
                    <Route
                        path="/project"
                        element={
                            <ProjectPage projects={data} onSaved={refetch} />
                        }
                    />
                    <Route
                        path="/project/:id"
                        element={
                            <ProjectPage projects={data} onSaved={refetch} />
                        }
                    />
                    <Route path="/task" element={null} />
                </Routes>
            </div>
        </div>
    )
}
export default Main
