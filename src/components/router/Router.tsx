import { useProjects } from 'api/project'
import ErrorMessage from 'components/error-message/ErrorMessage'
import ProjectPage from 'components/project-page/ProjectPage'
import Spinner from 'components/spinner/Spinner'
import { Navigate, Route, Routes } from 'react-router'
import TaskList from '../task-list/TaskList'
import Menu from '../menu/Menu'
import styles from './Router.module.css'
import Header from 'components/header/Header'
import { FC, useState } from 'react'
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
import { User, useUser } from 'api/auth'
import { Button } from 'components/button/Button'
import { getGoogleOauthRedirectPath } from 'lib/google'

export const Auth = () => {
    const { isLoading, error, refetch: refetchUser, data: user } = useUser()

    if (isLoading) {
        return (
            <div className={styles.mainContainer}>
                <Spinner />
            </div>
        )
    }

    if (error) {
        return (
            <div className={styles.mainContainer}>
                <ErrorMessage
                    text="Не удалось загрузить данные пользователя"
                    retry={refetchUser}
                />
            </div>
        )
    }

    if (!user) {
        return (
            <div className={styles.mainContainer}>
                Войдите с помощью Google, чтобы пользоваться списком дел
                <br />
                <br />
                <Button
                    onClick={() =>
                        (window.location.href = getGoogleOauthRedirectPath())
                    }
                >
                    Войти
                </Button>
            </div>
        )
    }

    return <Router user={user} />
}

const Router: FC<{ user: User }> = () => {
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
                onSearchChange={setSearch}
                toggleMenu={toggleMenu}
            />
            <Menu isMenuOpen={isMenuOpen} projects={projects} />

            <div className={styles.mainContent}>
                <Routes>
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
