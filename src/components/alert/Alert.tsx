import { ReactNode } from 'react'
import styles from './Alert.module.css'
import { Button } from 'components/button/Button'

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
            <Button onClick={onButtonClick}>{buttonText}</Button>
        ) : null}
    </div>
)
export default Alert
