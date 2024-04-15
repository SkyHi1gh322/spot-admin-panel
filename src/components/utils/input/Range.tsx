import * as React from 'react';
import {ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes} from "react";
import styles from './RangeStyles.module.sass';
interface Props extends Omit<Partial<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>, 'onChange' | 'type'> {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    error?: boolean
}

export const Range: FC<Props> = (props) => {
     return (
         <input type={"range"} {...props} className={`${props.className} ${styles.range}`}/>
     )
}