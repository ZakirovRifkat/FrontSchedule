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
import { useUser } from 'api/auth'
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

    if (!user || !user.userId) {
        return (
            <div className={styles.mainContainer}>
                <div className={styles.auth}>
                    Войдите с помощью Google, чтобы пользоваться списком дел
                    <Button
                        className={styles.authButton}
                        onClick={() =>
                            (window.location.href =
                                getGoogleOauthRedirectPath())
                        }
                    >
                        Войти
                    </Button>
                </div>
            </div>
        )
    }

    return <Router userId={user.userId} />
}

const Router: FC<{ userId: number }> = ({ userId }) => {
    const [search, setSearch] = useState('')
    const [isMenuOpen, setIsMenuOpen] = useState(true)
    const toggleMenu = () => setIsMenuOpen((open) => !open)

    const {
        isLoading,
        error,
        refetch: refetchProjects,
        data: projects,
    } = useProjects(userId)

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
                        element={<TaskList userId={userId} search={search} />}
                    />
                    <Route
                        path={toGroupPageUrl(':projectId')}
                        element={<TaskList userId={userId} search={search} />}
                    />
                    <Route
                        path={toEditProjectUrl(':projectId')}
                        element={<ProjectPage userId={userId} />}
                    />
                    <Route
                        path={toNewProjectUrl()}
                        element={<ProjectPage userId={userId} />}
                    />

                    {/* Задачи */}
                    <Route
                        path={toNewTaskUrl(':projectId')}
                        element={<TaskPage userId={userId} />}
                    />
                    <Route
                        path={toEditTaskUrl(':projectId', ':taskId')}
                        element={<TaskPage userId={userId} />}
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
