import { FC, ReactNode, useState } from "react"
import style from "./Menu.module.css"

const Menu = (props) => {
    let [listMode, setListMode] = useState(false);
    const editListMode= ()=>{
        setListMode(!listMode)
    }
    return (
        <div className={props.menuMode ? style.mainMenu : style.mainMenuOff}>
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
                    <button onClick={editListMode} className={style.projectButton}><div className={listMode? style.triangleOn: style.triangleOff}>◀</div></button>
                </div>
            </div>

            <div className={listMode? style.projectContainer : style.projectContainerOff}>
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
