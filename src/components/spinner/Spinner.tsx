import clsx from 'clsx'
import styles from './Spinner.module.css'

const Spinner = ({ isVisible = true }: { isVisible?: boolean }) => (
    <div className={clsx(styles.container, { [styles.visible]: isVisible })}>
        <div className={styles.spinner} />
    </div>
)
export default Spinner
