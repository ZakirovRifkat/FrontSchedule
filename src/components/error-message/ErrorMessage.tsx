import Alert from 'components/alert/Alert'
import { ReactNode } from 'react'

const ErrorMessage = ({
    text = 'Не удалось загрузить данные',
    retry,
}: {
    text?: ReactNode
    retry?: () => void
}) => (
    <Alert text={text} buttonText="Попробовать ещё раз" onButtonClick={retry} />
)
export default ErrorMessage
