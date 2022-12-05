import React from "react";
import style from "./Menu.module.css";

const Menu = () => {
  return (
    <div className={style.main_menu}>
      <div className={style.button}>
        <a href="">
          <div className={style.button_text}>
            <div>Сегодня</div>
            <div className={style.text}>8</div>
          </div>
        </a>
      </div>
      <div className={style.button}>
        <a href="">
          <div className={style.button_text}>
            <div>Предстоящие</div>
            <div className={style.text}>5</div>
          </div>
        </a>
      </div>
      <div className={style.button}>
        <a href="">
          <div className={style.button_text}>
            <div>Просроченнные</div>
            <div className={style.text}>10</div>
          </div>
        </a>
      </div>
      <span className={style.line}></span>

      <div className={style.button}>
        <div className={style.button_text}>
          <div className={style.project}>Проекты</div>
          <button className={style.project_button}>◀</button>
        </div>
      </div>
    </div>
  );
};
export default Menu;
