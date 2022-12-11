import { ReactNode } from 'react'
import styles from './Alert.module.css'

const Alert = ({
    onButtonClick,
    text,
    buttonText,
}: {
    onButtonClick?: () => void
    text?: ReactNode
    buttonText?: ReactNode
}) => (
    <div className={styles.container}>
        <p className={styles.text}>{text}</p>
        {buttonText ? (
            <button className={styles.retry} onClick={onButtonClick}>
                {buttonText}
            </button>
        ) : null}
    </div>
)
export default Alert
