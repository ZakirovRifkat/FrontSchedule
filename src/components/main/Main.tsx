import Content from "../content/Content"
import Menu from "../menu/Menu"
import style from "./Main.module.css"

const Main = (props) => {
    return (
        <div className={style.mainContainer}>
            <Menu menuMode={props.menuMode} />
            <Content />
        </div>
    )
}
export default Main
