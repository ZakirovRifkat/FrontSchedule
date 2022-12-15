import { useProjects } from 'api/project'
import ErrorMessage from 'components/error-message/ErrorMessage'
import ProjectPage from 'components/project-page/ProjectPage'
import Spinner from 'components/spinner/Spinner'
import { Navigate, Route, Routes } from 'react-router'
import TaskList from '../task-list/TaskList'
import Menu from '../menu/Menu'
import styles from './Router.module.css'
import Header from 'components/header/Header'
import { useState } from 'react'
import {
    toDefaultPageUrl,
    toEditProjectUrl,
    toEditTaskUrl,
    toGroupPageUrl,
    toNewProjectUrl,
    toNewTaskUrl,
    toProjectPageUrl,
} from 'lib/url'
import TaskPage from 'components/task-page/TaskPage'

const Router = () => {
    const [search, setSearch] = useState('')
    const [isMenuOpen, setIsMenuOpen] = useState(true)
    const toggleMenu = () => setIsMenuOpen((open) => !open)

    const {
        isLoading,
        error,
        refetch: refetchProjects,
        data: projects,
    } = useProjects()

    if (isLoading) {
        return (
            <div className={styles.mainContainer}>
                <Spinner />
            </div>
        )
    }

    if (error || !projects) {
        return (
            <div className={styles.mainContainer}>
                <ErrorMessage
                    text="Не удалось загрузить список проектов"
                    retry={refetchProjects}
                />
            </div>
        )
    }

    return (
        <div className={styles.mainContainer}>
            <Header
                search={search}
                setSearch={setSearch}
                toggleMenu={toggleMenu}
            />
            <Menu isMenuOpen={isMenuOpen} projects={projects} />

            <div className={styles.mainContent}>
                <Routes>
                    <Route path="*" element={null} />
                    {/* Проекты */}
                    <Route
                        path={toProjectPageUrl(':projectId')}
                        element={<TaskList search={search} />}
                    />
                    <Route
                        path={toGroupPageUrl(':projectId')}
                        element={<TaskList search={search} />}
                    />
                    <Route
                        path={toEditProjectUrl(':projectId')}
                        element={<ProjectPage />}
                    />
                    <Route path={toNewProjectUrl()} element={<ProjectPage />} />

                    {/* Задачи */}
                    <Route
                        path={toNewTaskUrl(':projectId')}
                        element={<TaskPage />}
                    />
                    <Route
                        path={toEditTaskUrl(':projectId', ':taskId')}
                        element={<TaskPage />}
                    />

                    <Route
                        path="*"
                        element={
                            <Navigate to={toDefaultPageUrl()} replace={true} />
                        }
                    />
                </Routes>
            </div>
        </div>
    )
}
export default Router
