import * as React from 'react';
import {ButtonHTMLAttributes, DetailedHTMLProps, FC} from "react";
import styles from './ButtonStyles.module.sass';
import {clsx} from 'clsx';
interface Props extends Partial<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>>{
    children: React.ReactNode,
    color: 'red' | 'main',
    variant: 'primary' | 'secondary'
}

export const Button: FC<Props> = (props) => {

    const className = clsx(styles.baseButton,
        props.className,
        (props.color === 'red' && props.variant === 'primary') && styles.primaryRed,
        (props.color === 'red' && props.variant === 'secondary') && styles.secondaryRed,
        (props.color === 'main' && props.variant === 'primary') && styles.primaryMain,
        (props.color === 'main' && props.variant === 'secondary') && styles.secondaryMain,
    )

    return (
        <button {...props} className={className}>
            {props.children}
        </button>
    )
}