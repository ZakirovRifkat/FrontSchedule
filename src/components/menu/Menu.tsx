import { FC, ReactNode } from "react"
import style from "./Menu.module.css"

const Menu = () => {
    return (
        <div className={style.mainMenu}>
            <MenuLink href="#" amount={8}>
                Сегодня
            </MenuLink>
            <MenuLink href="#" amount={5}>
                Предстоящие
            </MenuLink>
            <MenuLink href="#" amount={10}>
                Просроченные
            </MenuLink>
            <span className={style.line}></span>

            <div className={style.button}>
                <div className={style.buttonText}>
                    <div className={style.project}>Проекты</div>
                    <button className={style.projectButton}>◀</button>
                </div>
            </div>
        </div>
    )
}
export default Menu

const MenuLink: FC<{
    href: string
    amount: number
    children?: ReactNode
}> = ({ amount, href, children }) => (
    <div className={style.button}>
        <a href={href}>
            <div className={style.buttonText}>
                <div>{children}</div>
                <div className={style.text}>{amount}</div>
            </div>
        </a>
    </div>
)
