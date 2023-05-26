import styles from './Header.module.css'
import menuIcon from '../../assets/menu.png'
import homeIcon from '../../assets/home.png'
import searchIcon from '../../assets/search.png'
import logoutIcon from '../../assets/logout.png'
import { useNavigate } from 'react-router'
import { toDefaultPageUrl } from 'lib/url'
import { callApi } from 'lib/api'
import { logout } from 'api/auth'

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
                        <img src={menuIcon} className={styles.icon}></img>
                    </div>
                </div>
                <div>
                    <div className={styles.home}>
                        <img
                            src={homeIcon}
                            className={styles.icon}
                            onClick={() => navigate(toDefaultPageUrl())}
                        />
                    </div>
                </div>
                <div className={styles.search}>
                    <img src={searchIcon} className={styles.icon}></img>
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
            <div className={styles.logout}>
                <div className={styles.button}>
                    <img
                        src={logoutIcon}
                        className={styles.icon}
                        onClick={() =>
                            logout().then(() => window.location.reload())
                        }
                    />
                </div>
            </div>
        </div>
    )
}
export default Header
