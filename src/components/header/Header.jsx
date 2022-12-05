import React from "react";
import style from "./Header.module.css";
import image1 from "../../assets/menu.png";
import image2 from "../../assets/home.png";
import image3 from "../../assets/search.png";




const Header = () => {
  return (
    <div className={style.header}>
      <div className={style.header_icons}>
            <div>
                <a href=""><img src={image1} className={style.icon}></img></a>
            </div>
            <div>
                <a href=""><img src={image2} className={style.icon}></img></a>
            </div>
            <div className={style.search}>
                <img src={image3} className={style.icon}></img>
                <input className={style.search_input}type="text" placeholder="Поиск"></input>
            </div>
        </div>
        <div className={style.logo}> 
            Планировщик личных дел
        </div>
    </div>
  );
};
export default Header;
