import * as React from 'react';
import {ButtonHTMLAttributes, DetailedHTMLProps, FC} from "react";
import styles from './ButtonStyles.module.sass';
interface Props extends Partial<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>>{
    children: React.ReactNode
}

export const Button: FC<Props> = (props) => {
    return (
        <button {...props} className={`${styles.baseButton} ${props.className}`}>
            {props.children}
        </button>
    )
}