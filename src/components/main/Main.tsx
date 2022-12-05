import Content from "../content/Content"
import Menu from "../menu/Menu"
import style from "./Main.module.css"

const Main = () => (
    <div className={style.mainContainer}>
        <Menu />
        <Content />
    </div>
)
export default Main
