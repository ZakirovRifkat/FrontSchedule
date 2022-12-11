import { ReactNode, useState } from 'react'
import styles from './Menu.module.css'
import clsx from 'clsx'
import { Filter, useContentType } from 'components/content/use-content-type'

const Menu = ({ isMenuOpen }: { isMenuOpen: boolean }) => {
    const [isProjectsExpanded, setIsProjectsExpanded] = useState(false)
    const toggleProjects = () => {
        setIsProjectsExpanded(!isProjectsExpanded)
    }

    const [contentType, setContentType] = useContentType()

    return (
        <div
            className={clsx(
                styles.menu,
                isMenuOpen ? styles.open : styles.closed
            )}
        >
            <MenuItem
                href="#"
                amount={8}
                isActive={contentType === Filter.today}
                onClick={() => setContentType(Filter.today)}
            >
                Сегодня
            </MenuItem>
            <MenuItem
                href="#"
                amount={8}
                isActive={contentType === Filter.oncoming}
                onClick={() => setContentType(Filter.oncoming)}
            >
                Предстоящие
            </MenuItem>
            <MenuItem
                href="#"
                amount={8}
                isActive={contentType === Filter.overdue}
                onClick={() => setContentType(Filter.overdue)}
            >
                Просроченные
            </MenuItem>

            <span className={styles.line}></span>

            <div className={styles.button}>
                <div className={styles.buttonText}>
                    <div className={styles.project}>Проекты</div>
                    <button className={styles.addProjectButton}>+</button>
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
                <div className={styles.projectList}>
                    <div className={styles.circle}></div>
                    <a>Проект 1</a>
                </div>
                <div className={styles.projectList}>
                    <div className={styles.circle}></div>
                    <a>Проект 2</a>
                </div>
                <div className={styles.projectList}>
                    <div className={styles.circle}></div>
                    <a>Проект 3</a>
                </div>
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
    amount: number
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
