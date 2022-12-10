import { useState } from "react"
import style from "./Menu.module.css"
import clsx from "clsx"

const Menu = ({ isMenuOpen }: { isMenuOpen: boolean }) => {
    const [isProjectsExpanded, setIsProjectsExpanded] = useState(false)
    const toggleProjects = () => {
        setIsProjectsExpanded(!isProjectsExpanded)
    }

    return (
        <div
            className={clsx(style.menu, isMenuOpen ? style.open : style.closed)}
        >
            <div className={style.button}>
                <a href="">
                    <div className={style.buttonText}>
                        <div>Сегодня</div>
                        <div className={style.text}>8</div>
                    </div>
                </a>
            </div>
            <div className={style.button}>
                <a href="">
                    <div className={style.buttonText}>
                        <div>Предстоящие</div>
                        <div className={style.text}>5</div>
                    </div>
                </a>
            </div>
            <div className={style.button}>
                <a href="">
                    <div className={style.buttonText}>
                        <div>Просроченнные</div>
                        <div className={style.text}>10</div>
                    </div>
                </a>
            </div>
            <span className={style.line}></span>

            <div className={style.button}>
                <div className={style.buttonText}>
                    <div className={style.project}>Проекты</div>
                    <button className={style.addProjectButton}>+</button>
                    <button
                        onClick={toggleProjects}
                        className={style.projectButton}
                    >
                        <div
                            className={
                                isProjectsExpanded
                                    ? style.triangleOn
                                    : style.triangleOff
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
                        ? style.projectContainer
                        : style.projectContainerOff
                }
            >
                <div className={style.projectList}>
                    <div className={style.circle}></div>
                    <a>Проект 1</a>
                </div>
                <div className={style.projectList}>
                    <div className={style.circle}></div>
                    <a>Проект 2</a>
                </div>
                <div className={style.projectList}>
                    <div className={style.circle}></div>
                    <a>Проект 3</a>
                </div>
            </div>
        </div>
    )
}
export default Menu

// const MenuLink: FC<{
//     href: string
//     amount: number
//     children?: ReactNode
// }> = ({ amount, href, children }) => (
//     <div className={style.button}>
//         <a href={href}>
//             <div className={style.buttonText}>
//                 <div>{children}</div>
//                 <div className={style.text}>{amount}</div>
//             </div>
//         </a>
//     </div>
// )
