import * as React from 'react';
import {FC} from "react";
import styles from './IslandStyles.module.sass';
interface Props{
    children: React.ReactNode,
    className?: string
}

export const Island: FC<Props> = (props) => {
    return (
        <div className={`${styles.island} ${props.className}`}>
            {props.children}
        </div>
    )
}