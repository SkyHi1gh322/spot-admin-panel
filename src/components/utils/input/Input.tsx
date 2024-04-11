import {ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes} from "react";
import styles from './InputStyles.module.sass';
import {clsx} from 'clsx';
interface Props extends Omit<Partial<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>, 'onChange'> {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    error?: boolean
}


export const Input: FC<Props> = (props) => {
    const classNames = clsx(styles.input, props.error && styles.inputError, props.className)
    return (
        <input
               {...props} className={classNames} value={props.value || ''} onChange={props.onChange}/>
    )
}