import style from './Header.module.css'
import image1 from '../../assets/menu.png'
import image2 from '../../assets/home.png'
import image3 from '../../assets/search.png'
import { useNavigate } from 'react-router'
import { toDefaultPageUrl } from 'lib/url'

const Header = ({
    toggleMenu,
    search,
    setSearch,
}: {
    toggleMenu: () => void
    search: string
    setSearch: (search: string) => void
}) => {
    const navigate = useNavigate()

    return (
        <div className={style.header}>
            <div className={style.headerIcons}>
                <div>
                    <div onClick={toggleMenu} className={style.button}>
                        <img src={image1} className={style.icon}></img>
                    </div>
                </div>
                <div>
                    <div className={style.home}>
                        <img
                            src={image2}
                            className={style.icon}
                            onClick={() => navigate(toDefaultPageUrl())}
                        />
                    </div>
                </div>
                <div className={style.search}>
                    <img src={image3} className={style.icon}></img>
                    <input
                        className={style.searchInput}
                        type="text"
                        placeholder="Поиск"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>
            <div className={style.logo}>Планировщик личных дел</div>
        </div>
    )
}
export default Header
