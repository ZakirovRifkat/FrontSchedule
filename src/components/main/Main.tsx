import Content from "../content/Content"
import Menu from "../menu/Menu"
import style from "./Main.module.css"

const Main = ({ isMenuOpen }: { isMenuOpen: boolean }) => {
    return (
        <div className={style.mainContainer}>
            <Menu isMenuOpen={isMenuOpen} />
            <Content />
        </div>
    )
}
export default Main
