import { ReactNode, useState } from 'react'
import styles from './Menu.module.css'
import clsx from 'clsx'
import { Filter, useContentType } from 'components/content/use-content-type'
import { Project } from 'api/project'
import { useNavigate } from 'react-router'

const Menu = ({
    isMenuOpen,
    projects,
}: {
    isMenuOpen: boolean
    projects: Project[]
}) => {
    const [isProjectsExpanded, setIsProjectsExpanded] = useState(false)
    const toggleProjects = () => {
        setIsProjectsExpanded(!isProjectsExpanded)
    }

    const [contentType, setContentType] = useContentType()
    const navigate = useNavigate()

    return (
        <div
            className={clsx(
                styles.menu,
                isMenuOpen ? styles.open : styles.closed
            )}
        >
            <MenuItem
                href="#"
                isActive={contentType === Filter.today}
                onClick={() => setContentType(Filter.today)}
            >
                Сегодня
            </MenuItem>
            <MenuItem
                href="#"
                isActive={contentType === Filter.oncoming}
                onClick={() => setContentType(Filter.oncoming)}
            >
                Предстоящие
            </MenuItem>
            <MenuItem
                href="#"
                isActive={contentType === Filter.overdue}
                onClick={() => setContentType(Filter.overdue)}
            >
                Просроченные
            </MenuItem>

            <span className={styles.line}></span>

            <div className={styles.button}>
                <div className={styles.buttonText}>
                    <div className={styles.project}>Проекты</div>
                    <button
                        className={styles.addProjectButton}
                        onClick={() => navigate('/project/create')}
                    >
                        +
                    </button>
                    <button
                        onClick={toggleProjects}
                        className={styles.projectButton}
                    >
                        <div
                            className={
                                isProjectsExpanded
                                    ? styles.triangleOn
                                    : styles.triangleOff
                            }
                        >
                            ◀
                        </div>
                    </button>
                </div>
            </div>

            <div
                className={
                    isProjectsExpanded
                        ? styles.projectContainer
                        : styles.projectContainerOff
                }
            >
                {!projects.length ? (
                    <div className={styles.noProject}>Нет проектов</div>
                ) : (
                    projects.map((project) => (
                        <div
                            key={project.id}
                            className={styles.projectList}
                            onClick={() => setContentType(project.id)}
                        >
                            <div className={styles.circle}></div>
                            <a>{project.name}</a>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
export default Menu

const MenuItem = ({
    amount,
    href,
    children,
    isActive,
    onClick,
}: {
    href: string
    amount?: number
    isActive: boolean
    children?: ReactNode
    onClick?: () => void
}) => (
    <div
        className={clsx(styles.button, { [styles.active]: isActive })}
        onClick={onClick}
    >
        <a href={href}>
            <div className={styles.buttonText}>
                <div>{children}</div>
                <div className={styles.text}>{amount}</div>
            </div>
        </a>
    </div>
)
