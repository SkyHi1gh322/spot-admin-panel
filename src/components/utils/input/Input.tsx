import {ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes} from "react";
import styles from './InputStyles.module.sass';
interface Props extends Omit<Partial<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>, 'onChange'> {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
}


export const Input: FC<Props> = (props) => {
    return (
        <input
               {...props} className={`${styles.input} ${props.className}`} onChange={props.onChange}/>
    )
}