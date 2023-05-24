import clsx from 'clsx'
import { ButtonHTMLAttributes, FC } from 'react'
import styles from './Button.module.css'

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
    className,
    ...props
}) => <button className={clsx(className, styles.button)} {...props} />
