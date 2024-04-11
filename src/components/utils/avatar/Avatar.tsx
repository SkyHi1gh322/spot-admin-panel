import * as React from 'react';
import {FC} from "react";
import styles from './AvatarStyles.module.sass';
interface Props{
    className?: string,
    url: string,
    username: string
}


export const Avatar: FC<Props> = (props) => {
    return (
        <div className={`${styles.user} ${props.className}`}>
            <div className={styles.user__avatar}>
                {props.url}
            </div>
            <strong className={styles.user__username}>{props.username}</strong>
        </div>
    )

}