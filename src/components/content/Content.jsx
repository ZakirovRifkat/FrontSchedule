import React from "react";
import style from "./Content.module.css"

const Content = () =>{
    return (
        <div className={style.main_content}>
            <div className={style.tasks}>
               Вот тут будет вся форма
            </div>
        </div>
    )
}
export default Content;