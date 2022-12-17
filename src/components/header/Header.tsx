import styles from './Header.module.css'
import image1 from '../../assets/menu.png'
import image2 from '../../assets/home.png'
import image3 from '../../assets/search.png'
import { useNavigate } from 'react-router'
import { toDefaultPageUrl } from 'lib/url'

const Header = ({
    toggleMenu,
    search,
    onSearchChange,
}: {
    toggleMenu: () => void
    search: string
    onSearchChange: (search: string) => void
}) => {
    const navigate = useNavigate()

    return (
        <div className={styles.header}>
            <div className={styles.headerIcons}>
                <div>
                    <div onClick={toggleMenu} className={styles.button}>
                        <img src={image1} className={styles.icon}></img>
                    </div>
                </div>
                <div>
                    <div className={styles.home}>
                        <img
                            src={image2}
                            className={styles.icon}
                            onClick={() => navigate(toDefaultPageUrl())}
                        />
                    </div>
                </div>
                <div className={styles.search}>
                    <img src={image3} className={styles.icon}></img>
                    <input
                        className={styles.searchInput}
                        type="text"
                        placeholder="Поиск"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </div>
            <div className={styles.logo}>Планировщик личных дел</div>
        </div>
    )
}
export default Header
