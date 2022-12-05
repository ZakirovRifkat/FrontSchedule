import React from "react";
import Content from "../content/Content";
import Menu from "../menu/Menu";
import style from "./Main.module.css";

const Main = ()=>{
return (
    <div className={style.main_container}>
        <Menu/>
        <Content/>
    </div>
)
}
export default Main;